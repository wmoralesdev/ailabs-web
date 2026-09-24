import { afterAll, beforeEach, describe, expect, it } from "vitest"

import type { ProfileDraft } from "@/lib/aperture/profile-input"
import { createTestPrisma, resetMembers } from "@/test/db"
import { claimMembership } from "./member-store"
import { createProject } from "./project-store"
import { retireMember } from "./member-sync"
import { listDirectoryMembers, loadPublicProfile } from "./public-profile"

const prisma = createTestPrisma()

function draft(username: string, showEvents = false): ProfileDraft {
  return {
    username,
    displayName: "Walter Morales",
    headline: "Building with AI",
    bio: "Short bio",
    countryCode: "SV",
    city: "San Salvador",
    role: "FOUNDER",
    upFor: ["MENTORING"],
    showEvents,
    linkedinUrl: "https://linkedin.com/in/walter",
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

describe("loadPublicProfile", () => {
  it("returns a public profile without emails and hides events by default", async () => {
    await claimMembership(prisma, {
      clerkUserId: "user_a",
      profile: draft("walter"),
      verifiedEmails: ["walter@example.com"],
      avatarUrl: "https://img.example/a.png",
      consent: { version: "2026-10-draft", locale: "en", marketing: false },
    })

    const profile = await loadPublicProfile(prisma, "Walter")
    expect(profile).toMatchObject({
      number: 5,
      username: "walter",
      displayName: "Walter Morales",
      city: "San Salvador",
      events: [],
    })
    expect(profile?.links).toEqual([
      { field: "linkedinUrl", href: "https://linkedin.com/in/walter" },
    ])
    expect(profile?.projects).toEqual([])
    expect(JSON.stringify(profile)).not.toContain("walter@example.com")
    expect(await loadPublicProfile(prisma, "missing")).toBeNull()
  })

  it("includes events only when the member turns showEvents on", async () => {
    await claimMembership(prisma, {
      clerkUserId: "user_a",
      profile: draft("walter", true),
      verifiedEmails: ["walter@example.com"],
      avatarUrl: null,
      consent: { version: "2026-10-draft", locale: "en", marketing: false },
    })
    await prisma.event.create({
      data: {
        name: "Builders Night",
        slug: "builders-night",
        product: "CURSOR",
        startsAt: new Date("2026-08-01T00:00:00.000Z"),
        venue: "San Salvador",
        eligibleEmails: { create: { email: "walter@example.com" } },
      },
    })

    const shown = await loadPublicProfile(prisma, "walter")
    expect(shown?.events.map((event) => event.slug)).toEqual(["builders-night"])

    await prisma.profile.update({
      where: { username: "walter" },
      data: { showEvents: false },
    })
    const hidden = await loadPublicProfile(prisma, "walter")
    expect(hidden?.events).toEqual([])
  })

  it("shows published projects and hides drafts", async () => {
    await claimMembership(prisma, {
      clerkUserId: "user_a",
      profile: draft("walter"),
      verifiedEmails: ["walter@example.com"],
      avatarUrl: null,
      consent: { version: "2026-10-draft", locale: "en", marketing: false },
    })
    await createProject(prisma, "user_a", {
      title: "Lane notes",
      summary: "A notes app for builders.",
      url: "https://example.com",
      repoUrl: null,
      imageKey: null,
      published: true,
      builtWith: [{ name: "Cursor", percent: 100 }],
    })
    await createProject(prisma, "user_a", {
      title: "Draft",
      summary: "Not public yet.",
      url: null,
      repoUrl: null,
      imageKey: null,
      published: false,
      builtWith: [{ name: "Claude", percent: 100 }],
    })

    const profile = await loadPublicProfile(prisma, "walter")
    expect(profile?.projects.map((project) => project.title)).toEqual([
      "Lane notes",
    ])
  })

  it("hides retired members", async () => {
    await claimMembership(prisma, {
      clerkUserId: "user_a",
      profile: draft("walter"),
      verifiedEmails: ["walter@example.com"],
      avatarUrl: null,
      consent: { version: "2026-10-draft", locale: "en", marketing: false },
    })
    await retireMember(prisma, "user_a")

    expect(await loadPublicProfile(prisma, "walter")).toBeNull()
    expect(await listDirectoryMembers(prisma)).toEqual([])
  })
})

describe("listDirectoryMembers", () => {
  it("lists claimed profiles in number order", async () => {
    await claimMembership(prisma, {
      clerkUserId: "user_a",
      profile: draft("walter"),
      verifiedEmails: ["a@example.com"],
      avatarUrl: null,
      consent: { version: "2026-10-draft", locale: "en", marketing: false },
    })
    await claimMembership(prisma, {
      clerkUserId: "user_b",
      profile: { ...draft("ana"), displayName: "Ana" },
      verifiedEmails: ["b@example.com"],
      avatarUrl: null,
      consent: { version: "2026-10-draft", locale: "en", marketing: false },
    })

    const members = await listDirectoryMembers(prisma)
    expect(members.map((member) => member.username)).toEqual(["walter", "ana"])
    expect(members[0]?.number).toBe(5)
  })
})
