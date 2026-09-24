import { afterAll, beforeEach, describe, expect, it } from "vitest"

import type { ProfileDraft } from "@/lib/aperture/profile-input"
import { createTestPrisma, resetMembers } from "@/test/db"
import { claimMembership } from "./member-store"
import { retireMember } from "./member-sync"
import {
  createProject,
  deleteProject,
  listMemberProjects,
  updateProject,
} from "./project-store"

const prisma = createTestPrisma()

function draft(username: string): ProfileDraft {
  return {
    username,
    displayName: "Walter Morales",
    headline: "Building with AI",
    bio: null,
    countryCode: "SV",
    city: null,
    role: "FOUNDER",
    upFor: [],
    showEvents: false,
    linkedinUrl: null,
    xUrl: null,
    githubUrl: null,
    websiteUrl: null,
    instagramUrl: null,
  }
}

const projectInput = {
  title: "Lane notes",
  summary: "A notes app for builders.",
  url: "https://example.com",
  repoUrl: null,
  imageKey: null,
  published: true,
  builtWith: [
    { name: "Cursor", percent: 70 },
    { name: "Claude", percent: 30 },
  ],
}

beforeEach(async () => {
  await resetMembers(prisma)
})

afterAll(async () => {
  await prisma.$disconnect()
})

describe("project-store", () => {
  it("creates, lists, updates, and deletes a project", async () => {
    await claimMembership(prisma, {
      clerkUserId: "user_a",
      profile: draft("walter"),
      verifiedEmails: ["walter@example.com"],
      avatarUrl: null,
      consent: { version: "2026-10-draft", locale: "en", marketing: false },
    })

    const created = await createProject(prisma, "user_a", projectInput)
    expect(created.status).toBe("ok")
    if (created.status !== "ok") {
      return
    }
    expect(created.project.slug).toBe("lane-notes")
    expect(created.project.builtWith).toEqual(projectInput.builtWith)

    const listed = await listMemberProjects(prisma, 5)
    expect(listed).toHaveLength(1)

    const updated = await updateProject(prisma, "user_a", created.project.id, {
      ...projectInput,
      published: false,
      summary: "Updated summary.",
    })
    expect(updated.status).toBe("ok")
    if (updated.status !== "ok") {
      return
    }
    expect(updated.project.published).toBe(false)
    expect(await listMemberProjects(prisma, 5, true)).toEqual([])

    const removed = await deleteProject(prisma, "user_a", created.project.id)
    expect(removed.status).toBe("ok")
    expect(await listMemberProjects(prisma, 5)).toEqual([])
  })

  it("rejects a split that does not add up to 100 and hides retired work", async () => {
    await claimMembership(prisma, {
      clerkUserId: "user_a",
      profile: draft("walter"),
      verifiedEmails: ["walter@example.com"],
      avatarUrl: null,
      consent: { version: "2026-10-draft", locale: "en", marketing: false },
    })
    const invalid = await createProject(prisma, "user_a", {
      ...projectInput,
      builtWith: [{ name: "Cursor", percent: 40 }],
    })
    expect(invalid).toMatchObject({
      status: "invalid",
      fieldErrors: { builtWith: "sum" },
    })

    const created = await createProject(prisma, "user_a", projectInput)
    expect(created.status).toBe("ok")
    await retireMember(prisma, "user_a")
    expect(await listMemberProjects(prisma, 5)).toEqual([])
    expect(await createProject(prisma, "user_a", projectInput)).toMatchObject({
      status: "retired",
    })
  })
})
