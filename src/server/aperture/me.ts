import { auth } from "@clerk/tanstack-react-start/server"
import { createServerFn } from "@tanstack/react-start"

import { isLocale } from "@/content"
import { prisma } from "@/lib/prisma"
import {
  loadMemberDashboard,
  saveMemberProfile,
  saveNewsletterChoice,
} from "@/server/aperture/member-dashboard"
import type {
  LoadMeResult,
  SaveNewsletterResult,
  SaveProfileResult,
} from "@/server/aperture/member-dashboard"

export type { LoadMeResult, SaveNewsletterResult, SaveProfileResult }
export type {
  MeCredit,
  MeDashboard,
  MeEvent,
} from "@/server/aperture/member-dashboard"

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
