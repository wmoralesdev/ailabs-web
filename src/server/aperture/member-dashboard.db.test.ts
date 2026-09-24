import { afterAll, beforeEach, describe, expect, it } from "vitest"

import type { ProfileDraft } from "@/lib/aperture/profile-input"
import { createTestPrisma, resetMembers } from "@/test/db"
import { claimMembership } from "./member-store"
import {
  loadMemberDashboard,
  saveMemberProfile,
  saveNewsletterChoice,
} from "./member-dashboard"

const prisma = createTestPrisma()

function draft(username: string): ProfileDraft {
  return {
    username,
    displayName: "Walter Morales",
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

beforeEach(async () => {
  await resetMembers(prisma)
  await prisma.$executeRawUnsafe(
    'TRUNCATE "PromoCode", "Redemption", "EligibleEmail", "Event" CASCADE'
  )
})

afterAll(async () => {
  await prisma.$disconnect()
})

describe("loadMemberDashboard", () => {
  it("returns events and credits linked to the member emails", async () => {
    await claimMembership(prisma, {
      clerkUserId: "user_a",
      profile: draft("walter"),
      verifiedEmails: ["walter@example.com"],
      avatarUrl: null,
      consent: { version: "2026-10-draft", locale: "en", marketing: false },
    })

    const event = await prisma.event.create({
      data: {
        name: "Lane Builders Night",
        slug: "lane-builders",
        product: "CURSOR",
        startsAt: new Date("2026-08-01T00:00:00.000Z"),
        venue: "San Salvador",
        eligibleEmails: { create: { email: "walter@example.com" } },
      },
    })
    const redemption = await prisma.redemption.create({
      data: {
        eventId: event.id,
        email: "walter@example.com",
        clerkUserId: "user_a",
      },
    })
    await prisma.promoCode.create({
      data: {
        eventId: event.id,
        pool: "CURSOR",
        code: "LANE-CURSOR-1",
        redemptionId: redemption.id,
        claimedAt: new Date(),
        expiresAt: new Date("2026-12-31T00:00:00.000Z"),
      },
    })

    const loaded = await loadMemberDashboard(prisma, "user_a")
    expect(loaded.status).toBe("ok")
    if (loaded.status !== "ok") {
      return
    }
    expect(loaded.dashboard.number).toBe(5)
    expect(loaded.dashboard.events).toEqual([
      {
        id: event.id,
        name: "Lane Builders Night",
        slug: "lane-builders",
        startsAt: "2026-08-01T00:00:00.000Z",
        venue: "San Salvador",
      },
    ])
    expect(loaded.dashboard.credits).toEqual([
      {
        pool: "CURSOR",
        code: "LANE-CURSOR-1",
        expiresAt: "2026-12-31T00:00:00.000Z",
        eventName: "Lane Builders Night",
        eventSlug: "lane-builders",
      },
    ])
    expect(loaded.dashboard.newsletter).toBe(false)
  })
})

describe("saveMemberProfile", () => {
  it("updates the profile and enforces the username cooldown", async () => {
    await claimMembership(prisma, {
      clerkUserId: "user_a",
      profile: draft("walter"),
      verifiedEmails: ["walter@example.com"],
      avatarUrl: null,
      consent: { version: "2026-10-draft", locale: "en", marketing: false },
    })

    const first = await saveMemberProfile(
      prisma,
      "user_a",
      {
        ...draft("walter"),
        bio: "Building in San Salvador.",
        city: "San Salvador",
      },
      new Date("2026-09-24T00:00:00.000Z")
    )
    expect(first.status).toBe("ok")
    if (first.status !== "ok") {
      return
    }
    expect(first.dashboard.profile.bio).toBe("Building in San Salvador.")

    const renamed = await saveMemberProfile(
      prisma,
      "user_a",
      { ...draft("walter_2"), bio: "Building in San Salvador." },
      new Date("2026-09-24T00:00:00.000Z")
    )
    expect(renamed.status).toBe("ok")

    const blocked = await saveMemberProfile(
      prisma,
      "user_a",
      draft("walter_3"),
      new Date("2026-09-25T00:00:00.000Z")
    )
    expect(blocked).toMatchObject({ status: "username_cooldown" })
  })
})

describe("saveNewsletterChoice", () => {
  it("appends a marketing consent row", async () => {
    await claimMembership(prisma, {
      clerkUserId: "user_a",
      profile: draft("walter"),
      verifiedEmails: ["walter@example.com"],
      avatarUrl: null,
      consent: { version: "2026-10-draft", locale: "en", marketing: false },
    })
    expect(await saveNewsletterChoice(prisma, "user_a", true, "es")).toEqual({
      status: "ok",
      newsletter: true,
    })
    const loaded = await loadMemberDashboard(prisma, "user_a")
    expect(loaded.status === "ok" && loaded.dashboard.newsletter).toBe(true)
  })
})
