import { afterAll, beforeEach, describe, expect, it } from "vitest"

import type { ProfileDraft } from "@/lib/aperture/profile-input"
import { createTestPrisma, resetMembers } from "@/test/db"
import { claimMembership, reserveMember } from "./member-store"
import type { ClaimInput } from "./member-store"

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

function claim(clerkUserId: string, username: string, marketing = false) {
  const input: ClaimInput = {
    clerkUserId,
    profile: draft(username),
    verifiedEmails: [`${username}@example.com`],
    avatarUrl: null,
    consent: { version: "2026-10-draft", locale: "en", marketing },
  }
  return claimMembership(prisma, input)
}

beforeEach(async () => {
  await resetMembers(prisma)
})

afterAll(async () => {
  await prisma.$disconnect()
})

describe("claimMembership", () => {
  it("allocates 5 through 24 to twenty parallel claims with no gaps", async () => {
    const results = await Promise.all(
      Array.from({ length: 20 }, (_, i) => claim(`user_${i}`, `builder_${i}`))
    )
    const numbers = results
      .map((result) => (result.status === "claimed" ? result.number : -1))
      .sort((a, b) => a - b)
    expect(numbers).toEqual(Array.from({ length: 20 }, (_, i) => i + 5))
  })

  it("returns the first number when the same user claims again", async () => {
    expect(await claim("user_a", "first_name")).toEqual({
      status: "claimed",
      number: 5,
      username: "first_name",
    })
    expect(await claim("user_a", "second_name")).toEqual({
      status: "existing",
      number: 5,
      username: "first_name",
    })
  })

  it("rejects a taken username without consuming a number", async () => {
    await claim("user_a", "walter")
    expect(await claim("user_b", "walter")).toEqual({
      status: "username_taken",
    })
    expect(await claim("user_b", "walter_2")).toMatchObject({ number: 6 })
  })

  it("records four consents with the version and the newsletter choice", async () => {
    await claim("user_a", "walter", false)
    const consents = await prisma.consent.findMany({
      where: { memberNumber: 5 },
      orderBy: { kind: "asc" },
      select: { kind: true, granted: true, version: true },
    })
    expect(consents).toEqual([
      { kind: "TERMS", granted: true, version: "2026-10-draft" },
      { kind: "PRIVACY", granted: true, version: "2026-10-draft" },
      { kind: "AGE_DECLARATION", granted: true, version: "2026-10-draft" },
      { kind: "MARKETING", granted: false, version: "2026-10-draft" },
    ])
  })

  it("gives a reserved team member their own number", async () => {
    expect(await reserveMember(prisma, 0, "user_team")).toEqual({
      status: "reserved",
      number: 0,
    })
    expect(await claim("user_team", "team_walter")).toMatchObject({
      status: "claimed",
      number: 0,
    })
    expect(await claim("user_public", "first_public")).toMatchObject({
      number: 5,
    })
  })
})

describe("reserveMember", () => {
  it("is idempotent and refuses numbers outside 0 to 4", async () => {
    await reserveMember(prisma, 0, "user_team")
    expect(await reserveMember(prisma, 0, "user_team")).toEqual({
      status: "already_reserved",
      number: 0,
    })
    expect(await reserveMember(prisma, 0, "user_other")).toEqual({
      status: "number_taken",
      number: 0,
    })
    expect(await reserveMember(prisma, 5, "user_other")).toEqual({
      status: "not_reserved_range",
    })
  })
})
