import { afterAll, beforeEach, describe, expect, it } from "vitest"

import type { ProfileDraft } from "@/lib/aperture/profile-input"
import { createTestPrisma, resetMembers } from "@/test/db"
import { claimMembership } from "./member-store"
import {
  handleClerkEvent,
  retireMember,
  snapshotFromUserJSON,
  syncMemberFromClerk,
} from "./member-sync"
import { userEventPayload } from "../../../scripts/lib/clerk-webhook-fixture"
import type { WebhookEvent } from "@clerk/tanstack-react-start/webhooks"

const prisma = createTestPrisma()

function draft(username: string): ProfileDraft {
  return {
    username,
    displayName: username,
    headline: "Building with AI",
    bio: null,
    countryCode: "SV",
    city: null,
    role: "DEVELOPER",
    upFor: [],
    showEvents: false,
    linkedinUrl: null,
    xUrl: null,
    githubUrl: null,
    websiteUrl: null,
    instagramUrl: null,
  }
}

async function claim(clerkUserId: string, username: string, marketing = true) {
  return claimMembership(prisma, {
    clerkUserId,
    profile: draft(username),
    verifiedEmails: [`${username}@example.com`],
    avatarUrl: "https://img.clerk.com/old",
    consent: { version: "2026-10-draft", locale: "en", marketing },
  })
}

beforeEach(async () => {
  await resetMembers(prisma)
})

afterAll(async () => {
  await prisma.$disconnect()
})

describe("retireMember", () => {
  it("leaves one MARKETING revocation when run twice", async () => {
    await claim("user_a", "walter", true)
    expect(await retireMember(prisma, "user_a")).toEqual({
      status: "retired",
      number: 5,
    })
    expect(await retireMember(prisma, "user_a")).toEqual({
      status: "already_retired",
      number: 5,
    })

    const member = await prisma.member.findUnique({
      where: { clerkUserId: "user_a" },
    })
    expect(member?.retiredAt).toBeTruthy()
    expect(await prisma.profile.count({ where: { memberNumber: 5 } })).toBe(0)
    expect(await prisma.memberEmail.count({ where: { memberNumber: 5 } })).toBe(
      0
    )
    expect(
      await prisma.consent.findMany({
        where: { memberNumber: 5, kind: "MARKETING" },
        orderBy: { createdAt: "asc" },
        select: { granted: true, version: true },
      })
    ).toEqual([
      { granted: true, version: "2026-10-draft" },
      { granted: false, version: "2026-10-draft" },
    ])
  })

  it("returns no_member when the clerk user was never claimed", async () => {
    expect(await retireMember(prisma, "user_missing")).toEqual({
      status: "no_member",
    })
  })
})

describe("syncMemberFromClerk", () => {
  it("stores only verified emails from the payload", async () => {
    await claim("user_a", "walter")
    const snapshot = snapshotFromUserJSON(
      userEventPayload("user.updated", {
        id: "user_a",
        emails: [
          { address: "A@example.com", verified: true },
          { address: "b@example.com", verified: false },
        ],
        imageUrl: "https://img.clerk.com/new",
      }).data
    )

    expect(await syncMemberFromClerk(prisma, snapshot)).toEqual({
      status: "synced",
    })
    expect(
      await prisma.memberEmail.findMany({
        where: { memberNumber: 5 },
        select: { email: true },
      })
    ).toEqual([{ email: "a@example.com" }])
    expect(
      await prisma.profile.findUnique({
        where: { memberNumber: 5 },
        select: { avatarUrl: true },
      })
    ).toEqual({ avatarUrl: "https://img.clerk.com/new" })
  })

  it("does nothing for a clerk user without a member", async () => {
    expect(
      await syncMemberFromClerk(prisma, {
        clerkUserId: "user_missing",
        verifiedEmails: ["a@example.com"],
        avatarUrl: null,
      })
    ).toEqual({ status: "no_member" })
    expect(await prisma.member.count()).toBe(0)
  })

  it("does not revive a retired member", async () => {
    await claim("user_a", "walter")
    await retireMember(prisma, "user_a")
    expect(
      await handleClerkEvent(
        prisma,
        userEventPayload("user.updated", {
          id: "user_a",
          emails: [{ address: "a@example.com", verified: true }],
          imageUrl: "https://img.clerk.com/new",
        }) as unknown as WebhookEvent
      )
    ).toEqual({ status: "no_member" })
    expect(await prisma.profile.count()).toBe(0)
    expect(await prisma.memberEmail.count()).toBe(0)
  })
})
