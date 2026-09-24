import type {
  UserWebhookEvent,
  WebhookEvent,
} from "@clerk/tanstack-react-start/webhooks"

import type { PrismaClient } from "../../generated/prisma/client"
import { normalizeEmail } from "@/lib/redeem-products"
import { replaceMemberEmails } from "./member-store"

/** The Clerk fields Aperture reads. Full UserJSON satisfies this. */
export type ClerkUserPayload = {
  id: string
  email_addresses: ReadonlyArray<{
    email_address: string
    verification: { status: string } | null
  }>
  has_image: boolean
  image_url: string
}

/** The Clerk facts Aperture keeps, parsed once at the webhook or API boundary. */
export type ClerkUserSnapshot = {
  clerkUserId: string
  verifiedEmails: ReadonlyArray<string>
  avatarUrl: string | null
}

type ClerkEmail = {
  emailAddress: string
  verification: { status: string } | null
}

export function verifiedEmailsOf(
  emails: ReadonlyArray<ClerkEmail>
): Array<string> {
  return [
    ...new Set(
      emails
        .filter((email) => email.verification?.status === "verified")
        .map((email) => normalizeEmail(email.emailAddress))
    ),
  ]
}

export function snapshotFromUserJSON(
  user: ClerkUserPayload
): ClerkUserSnapshot {
  return {
    clerkUserId: user.id,
    verifiedEmails: verifiedEmailsOf(
      user.email_addresses.map((email) => ({
        emailAddress: email.email_address,
        verification: email.verification,
      }))
    ),
    avatarUrl: user.has_image ? user.image_url : null,
  }
}

export type SyncResult = { status: "synced" } | { status: "no_member" }

export async function syncMemberFromClerk(
  db: PrismaClient,
  snapshot: ClerkUserSnapshot
): Promise<SyncResult> {
  return db.$transaction(async (tx) => {
    const member = await tx.member.findUnique({
      where: { clerkUserId: snapshot.clerkUserId },
      select: { number: true, retiredAt: true },
    })
    if (!member || member.retiredAt) {
      return { status: "no_member" }
    }
    await replaceMemberEmails(tx, member.number, snapshot.verifiedEmails)
    await tx.profile.updateMany({
      where: { memberNumber: member.number },
      data: { avatarUrl: snapshot.avatarUrl },
    })
    return { status: "synced" }
  })
}

export type RetireResult =
  | { status: "retired"; number: number }
  | { status: "already_retired"; number: number }
  | { status: "no_member" }

/**
 * Deletes the profile and emails and keeps the number and consent history.
 * Safe to run again: a retired member converges to the same rows.
 */
export async function retireMember(
  db: PrismaClient,
  clerkUserId: string,
  now = new Date()
): Promise<RetireResult> {
  return db.$transaction(async (tx) => {
    const member = await tx.member.findUnique({ where: { clerkUserId } })
    if (!member) {
      return { status: "no_member" }
    }
    await tx.profile.deleteMany({ where: { memberNumber: member.number } })
    await tx.memberEmail.deleteMany({ where: { memberNumber: member.number } })
    if (member.retiredAt) {
      return { status: "already_retired", number: member.number }
    }
    const marketing = await tx.consent.findFirst({
      where: { memberNumber: member.number, kind: "MARKETING" },
      orderBy: { createdAt: "desc" },
    })
    await tx.consent.create({
      data: {
        memberNumber: member.number,
        kind: "MARKETING",
        granted: false,
        version: marketing?.version ?? "retired",
        locale: marketing?.locale ?? "en",
      },
    })
    await tx.member.update({
      where: { number: member.number },
      data: { retiredAt: now },
    })
    return { status: "retired", number: member.number }
  })
}

function isUserEvent(event: WebhookEvent): event is UserWebhookEvent {
  return (
    event.type === "user.created" ||
    event.type === "user.updated" ||
    event.type === "user.deleted"
  )
}

export type ClerkEventResult =
  SyncResult | RetireResult | { status: "ignored"; type: string }

export async function handleClerkEvent(
  db: PrismaClient,
  event: WebhookEvent
): Promise<ClerkEventResult> {
  if (!isUserEvent(event)) {
    return { status: "ignored", type: event.type }
  }
  switch (event.type) {
    case "user.created":
      return { status: "ignored", type: event.type }
    case "user.updated":
      return syncMemberFromClerk(db, snapshotFromUserJSON(event.data))
    case "user.deleted":
      return event.data.id
        ? retireMember(db, event.data.id)
        : { status: "ignored", type: event.type }
    default: {
      const unhandled: never = event
      throw new Error(`Unhandled Clerk event ${JSON.stringify(unhandled)}`)
    }
  }
}
