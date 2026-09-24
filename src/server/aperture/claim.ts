import { auth, clerkClient } from "@clerk/tanstack-react-start/server"
import { createServerFn } from "@tanstack/react-start"

import { en } from "@/content/en"
import { parseClaimForm } from "@/lib/aperture/claim-input"
import { currentJoinState } from "@/lib/aperture/join-mode"
import { prisma } from "@/lib/prisma"
import { claimMembership } from "@/server/aperture/member-store"
import { verifiedEmailsOf } from "@/server/aperture/member-sync"
import {
  lookupUsername,
  type UsernameCheck,
} from "@/server/aperture/username-lookup"
import type { ProfileFieldErrors } from "@/lib/aperture/profile-input"

export type { UsernameCheck }

export type JoinPageState =
  | { status: "closed" }
  | { status: "unauthenticated" }
  | { status: "no_verified_email" }
  | { status: "retired" }
  | { status: "existing"; number: number; username: string }
  | { status: "ready"; displayName: string }

export type MembershipHint =
  | { status: "none" }
  | { status: "guest" }
  | { status: "member"; number: number; username: string }

export type ClaimMembershipResult =
  | { status: "closed" }
  | { status: "unauthenticated" }
  | { status: "no_verified_email" }
  | { status: "retired" }
  | { status: "existing"; number: number; username: string }
  | { status: "claimed"; number: number; username: string }
  | { status: "username_taken" }
  | { status: "consent_required" }
  | { status: "invalid"; fieldErrors: ProfileFieldErrors }

function usernameInput(data: unknown): { username: string } {
  if (
    typeof data !== "object" ||
    data === null ||
    !("username" in data) ||
    typeof (data as { username: unknown }).username !== "string"
  ) {
    throw new Error("Invalid username")
  }
  return { username: (data as { username: string }).username }
}

function clerkDisplayName(user: {
  firstName: string | null
  lastName: string | null
}): string {
  return [user.firstName, user.lastName].filter(Boolean).join(" ").trim()
}

export const checkUsername = createServerFn({ method: "GET" })
  .validator(usernameInput)
  .handler(async ({ data }): Promise<UsernameCheck> => {
    return lookupUsername(prisma, data.username)
  })

export const getJoinState = createServerFn({ method: "GET" }).handler(
  async (): Promise<JoinPageState> => {
    if (currentJoinState(en.legal.status) === "closed") {
      return { status: "closed" }
    }

    const { isAuthenticated, userId } = await auth()
    if (!isAuthenticated || !userId) {
      return { status: "unauthenticated" }
    }

    const member = await prisma.member.findUnique({
      where: { clerkUserId: userId },
      include: { profile: { select: { username: true } } },
    })
    if (member?.retiredAt) {
      return { status: "retired" }
    }
    if (member?.profile) {
      return {
        status: "existing",
        number: member.number,
        username: member.profile.username,
      }
    }

    const user = await clerkClient().users.getUser(userId)
    const emails = verifiedEmailsOf(user.emailAddresses)
    if (emails.length === 0) {
      return { status: "no_verified_email" }
    }

    return { status: "ready", displayName: clerkDisplayName(user) }
  }
)

export const getMembershipHint = createServerFn({ method: "GET" }).handler(
  async (): Promise<MembershipHint> => {
    const { isAuthenticated, userId } = await auth()
    if (!isAuthenticated || !userId) {
      return { status: "none" }
    }

    const member = await prisma.member.findUnique({
      where: { clerkUserId: userId },
      include: { profile: { select: { username: true } } },
    })
    if (!member) {
      return { status: "guest" }
    }
    if (member.retiredAt) {
      return { status: "none" }
    }
    if (!member.profile) {
      return { status: "guest" }
    }
    return {
      status: "member",
      number: member.number,
      username: member.profile.username,
    }
  }
)

export const claimApertureMembership = createServerFn({ method: "POST" })
  .validator((data: unknown) => data)
  .handler(async ({ data }): Promise<ClaimMembershipResult> => {
    if (currentJoinState(en.legal.status) === "closed") {
      return { status: "closed" }
    }

    const parsed = parseClaimForm(data)
    if (!parsed.ok) {
      return parsed
    }

    const { isAuthenticated, userId } = await auth()
    if (!isAuthenticated || !userId) {
      return { status: "unauthenticated" }
    }

    const user = await clerkClient().users.getUser(userId)
    const emails = verifiedEmailsOf(user.emailAddresses)
    if (emails.length === 0) {
      return { status: "no_verified_email" }
    }

    return claimMembership(prisma, {
      clerkUserId: userId,
      profile: parsed.profile,
      verifiedEmails: emails,
      avatarUrl: user.hasImage ? user.imageUrl : null,
      consent: {
        version: en.legal.version,
        locale: parsed.locale,
        marketing: parsed.marketing,
      },
    })
  })
