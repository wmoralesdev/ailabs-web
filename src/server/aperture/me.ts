import { auth } from "@clerk/tanstack-react-start/server"
import { createServerFn } from "@tanstack/react-start"

import { isLocale } from "@/content"
import { prisma } from "@/lib/prisma"
import type {
  LoadMeResult,
  MeDashboard,
  SaveNewsletterResult,
  SaveProfileResult,
} from "@/server/aperture/member-dashboard"
import {
  loadMemberDashboard,
  saveMemberProfile,
  saveNewsletterChoice,
} from "@/server/aperture/member-dashboard"
import {
  createProject,
  deleteProject,
  updateProject,
} from "@/server/aperture/project-store"
import type { WriteProjectResult } from "@/server/aperture/project-store"
import { presignProjectImagePut } from "@/server/aperture/r2"

export type { LoadMeResult, SaveNewsletterResult, SaveProfileResult }
export type {
  MeCredit,
  MeDashboard,
  MeEvent,
} from "@/server/aperture/member-dashboard"
export type { MeProject } from "@/server/aperture/project-store"

export type SaveProjectResult =
  | { status: "ok"; dashboard: MeDashboard }
  | Exclude<WriteProjectResult, { status: "ok" }>
  | { status: "unauthenticated" }

function newsletterInput(data: unknown): {
  granted: boolean
  locale: "en" | "es"
} {
  if (typeof data !== "object" || data === null) {
    throw new Error("Invalid newsletter")
  }
  if (!("granted" in data) || typeof data.granted !== "boolean") {
    throw new Error("Invalid newsletter")
  }
  const locale =
    "locale" in data && typeof data.locale === "string" && isLocale(data.locale)
      ? data.locale
      : "en"
  return { granted: data.granted, locale }
}

async function requireUserId(): Promise<string | null> {
  const { isAuthenticated, userId } = await auth()
  if (!isAuthenticated || !userId) {
    return null
  }
  return userId
}

export const getMeDashboard = createServerFn({ method: "GET" }).handler(
  async (): Promise<LoadMeResult | { status: "unauthenticated" }> => {
    const userId = await requireUserId()
    if (!userId) {
      return { status: "unauthenticated" }
    }
    return loadMemberDashboard(prisma, userId)
  }
)

export const updateMeProfile = createServerFn({ method: "POST" })
  .validator((data: unknown) => data)
  .handler(
    async ({
      data,
    }): Promise<SaveProfileResult | { status: "unauthenticated" }> => {
      const userId = await requireUserId()
      if (!userId) {
        return { status: "unauthenticated" }
      }
      return saveMemberProfile(prisma, userId, data)
    }
  )

function projectIdInput(data: unknown): { id: string } {
  if (typeof data !== "object" || data === null || !("id" in data)) {
    throw new Error("Invalid project")
  }
  if (typeof data.id !== "string" || data.id.length === 0) {
    throw new Error("Invalid project")
  }
  return { id: data.id }
}

function updateProjectInput(data: unknown): { id: string; project: unknown } {
  const { id } = projectIdInput(data)
  if (typeof data !== "object" || data === null || !("project" in data)) {
    throw new Error("Invalid project")
  }
  return { id, project: data.project }
}

async function dashboardAfterWrite(
  userId: string,
  written: WriteProjectResult
): Promise<SaveProjectResult> {
  if (written.status !== "ok") {
    return written
  }
  const loaded = await loadMemberDashboard(prisma, userId)
  if (loaded.status !== "ok") {
    return loaded
  }
  return { status: "ok", dashboard: loaded.dashboard }
}

export const createMeProject = createServerFn({ method: "POST" })
  .validator((data: unknown) => data)
  .handler(async ({ data }): Promise<SaveProjectResult> => {
    const userId = await requireUserId()
    if (!userId) {
      return { status: "unauthenticated" }
    }
    return dashboardAfterWrite(
      userId,
      await createProject(prisma, userId, data)
    )
  })

export const updateMeProject = createServerFn({ method: "POST" })
  .validator(updateProjectInput)
  .handler(async ({ data }): Promise<SaveProjectResult> => {
    const userId = await requireUserId()
    if (!userId) {
      return { status: "unauthenticated" }
    }
    return dashboardAfterWrite(
      userId,
      await updateProject(prisma, userId, data.id, data.project)
    )
  })

function imageUploadInput(data: unknown): {
  contentType: string
  byteLength: number
} {
  if (typeof data !== "object" || data === null) {
    throw new Error("Invalid image")
  }
  if (!("contentType" in data) || typeof data.contentType !== "string") {
    throw new Error("Invalid image")
  }
  if (!("byteLength" in data) || typeof data.byteLength !== "number") {
    throw new Error("Invalid image")
  }
  return { contentType: data.contentType, byteLength: data.byteLength }
}

export type ProjectImageUploadResult =
  | { status: "ok"; uploadUrl: string; key: string; publicUrl: string }
  | { status: "unavailable" }
  | { status: "invalid" }
  | { status: "unauthenticated" }
  | { status: "no_member" }
  | { status: "retired" }

export const createMeProjectImageUpload = createServerFn({ method: "POST" })
  .validator(imageUploadInput)
  .handler(async ({ data }): Promise<ProjectImageUploadResult> => {
    const userId = await requireUserId()
    if (!userId) {
      return { status: "unauthenticated" }
    }
    const member = await prisma.member.findUnique({
      where: { clerkUserId: userId },
      select: {
        number: true,
        retiredAt: true,
        profile: { select: { username: true } },
      },
    })
    if (!member) {
      return { status: "no_member" }
    }
    if (member.retiredAt || !member.profile) {
      return member.retiredAt ? { status: "retired" } : { status: "no_member" }
    }
    return presignProjectImagePut(
      member.number,
      data.contentType,
      data.byteLength,
      crypto.randomUUID().replaceAll("-", "")
    )
  })

export const deleteMeProject = createServerFn({ method: "POST" })
  .validator(projectIdInput)
  .handler(async ({ data }): Promise<SaveProjectResult> => {
    const userId = await requireUserId()
    if (!userId) {
      return { status: "unauthenticated" }
    }
    return dashboardAfterWrite(
      userId,
      await deleteProject(prisma, userId, data.id)
    )
  })

export const updateMeNewsletter = createServerFn({ method: "POST" })
  .validator(newsletterInput)
  .handler(
    async ({
      data,
    }): Promise<SaveNewsletterResult | { status: "unauthenticated" }> => {
      const userId = await requireUserId()
      if (!userId) {
        return { status: "unauthenticated" }
      }
      return saveNewsletterChoice(prisma, userId, data.granted, data.locale)
    }
  )
