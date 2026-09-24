import { afterAll, beforeEach, describe, expect, it } from "vitest"

import { createTestPrisma, resetMembers } from "@/test/db"
import { claimMembership } from "./member-store"
import { lookupUsername } from "./username-lookup"
import type { ProfileDraft } from "@/lib/aperture/profile-input"

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

beforeEach(async () => {
  await resetMembers(prisma)
})

afterAll(async () => {
  await prisma.$disconnect()
})

describe("lookupUsername", () => {
  it("returns invalid, reserved, available, and taken", async () => {
    expect(await lookupUsername(prisma, "ab")).toBe("invalid")
    expect(await lookupUsername(prisma, "admin")).toBe("reserved")
    expect(await lookupUsername(prisma, "walter")).toBe("available")

    await claimMembership(prisma, {
      clerkUserId: "user_a",
      profile: draft("walter"),
      verifiedEmails: ["walter@example.com"],
      avatarUrl: null,
      consent: { version: "2026-10-draft", locale: "en", marketing: false },
    })

    expect(await lookupUsername(prisma, "Walter")).toBe("taken")
    expect(await lookupUsername(prisma, "walter_2")).toBe("available")
  })
})
