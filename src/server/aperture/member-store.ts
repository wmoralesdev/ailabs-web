import { Prisma } from "../../generated/prisma/client"
import type { PrismaClient } from "../../generated/prisma/client"
import type { ConsentKind } from "../../generated/prisma/enums"
import type { Locale } from "@/content"
import {
  LAST_RESERVED_MEMBER_NUMBER,
  isReservedMemberNumber,
} from "@/lib/aperture/member-number"
import type { ProfileDraft } from "@/lib/aperture/profile-input"

type Tx = Prisma.TransactionClient

export type ConsentChoice = {
  version: string
  locale: Locale
  marketing: boolean
}

export type ClaimInput = {
  clerkUserId: string
  profile: ProfileDraft
  /** Verified addresses only, lowercased. */
  verifiedEmails: ReadonlyArray<string>
  avatarUrl: string | null
  consent: ConsentChoice
}

export type ClaimResult =
  | { status: "claimed"; number: number; username: string }
  | { status: "existing"; number: number; username: string }
  | { status: "retired" }
  | { status: "username_taken" }

export type ReserveResult =
  | { status: "reserved"; number: number }
  | { status: "already_reserved"; number: number }
  | { status: "number_taken"; number: number }
  | { status: "user_has_number"; number: number }
  | { status: "not_reserved_range" }

const TRANSACTION_OPTIONS = { maxWait: 5000, timeout: 10000 }

/**
 * Every write that assigns a number takes this transaction lock, so numbers are
 * allocated one at a time across server instances. It releases at commit or
 * rollback, which keeps it safe behind Neon's transaction pooler.
 */
async function lockMemberNumbers(tx: Tx) {
  await tx.$executeRaw`SELECT pg_advisory_xact_lock(719408, 2)`
}

async function nextPublicNumber(tx: Tx): Promise<number> {
  // An aggregate without GROUP BY always returns exactly one row.
  const [row] = await tx.$queryRaw<[{ next: number }]>`
    SELECT (GREATEST(COALESCE(MAX("number"), ${LAST_RESERVED_MEMBER_NUMBER}::int), ${LAST_RESERVED_MEMBER_NUMBER}::int) + 1)::int AS "next"
    FROM "Member"
  `
  return row.next
}

/** Clerk owns verification, so the latest verified owner of an address wins. */
export async function replaceMemberEmails(
  tx: Tx,
  memberNumber: number,
  emails: ReadonlyArray<string>
) {
  const unique = [...new Set(emails)]
  await tx.memberEmail.deleteMany({
    where: {
      OR: [
        { memberNumber, email: { notIn: unique } },
        { email: { in: unique }, memberNumber: { not: memberNumber } },
      ],
    },
  })
  await tx.memberEmail.createMany({
    data: unique.map((email) => ({ email, memberNumber })),
    skipDuplicates: true,
  })
}

function consentRows(consent: ConsentChoice) {
  const { version, locale, marketing } = consent
  const choices: ReadonlyArray<{ kind: ConsentKind; granted: boolean }> = [
    { kind: "TERMS", granted: true },
    { kind: "PRIVACY", granted: true },
    { kind: "AGE_DECLARATION", granted: true },
    { kind: "MARKETING", granted: marketing },
  ]
  return choices.map((choice) => ({ version, locale, ...choice }))
}

export async function claimMembership(
  db: PrismaClient,
  input: ClaimInput
): Promise<ClaimResult> {
  try {
    return await db.$transaction(async (tx) => {
      await lockMemberNumbers(tx)

      const member = await tx.member.findUnique({
        where: { clerkUserId: input.clerkUserId },
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

      const emails = [...new Set(input.verifiedEmails)]
      await tx.memberEmail.deleteMany({ where: { email: { in: emails } } })
      const profile = {
        create: { ...input.profile, avatarUrl: input.avatarUrl },
      }
      const memberRows = {
        emails: { createMany: { data: emails.map((email) => ({ email })) } },
        consents: { createMany: { data: consentRows(input.consent) } },
      }
      const number = member?.number ?? (await nextPublicNumber(tx))
      await (member
        ? tx.member.update({
            where: { number },
            data: { profile, ...memberRows },
          })
        : tx.member.create({
            data: {
              number,
              clerkUserId: input.clerkUserId,
              profile,
              ...memberRows,
            },
          }))
      return { status: "claimed", number, username: input.profile.username }
    }, TRANSACTION_OPTIONS)
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { status: "username_taken" }
    }
    throw error
  }
}

/** Assigns a team number from 0 to 4. The team member claims their profile later. */
export async function reserveMember(
  db: PrismaClient,
  number: number,
  clerkUserId: string
): Promise<ReserveResult> {
  if (!isReservedMemberNumber(number)) {
    return { status: "not_reserved_range" }
  }
  return db.$transaction(async (tx) => {
    await lockMemberNumbers(tx)
    const byNumber = await tx.member.findUnique({ where: { number } })
    if (byNumber) {
      return byNumber.clerkUserId === clerkUserId
        ? { status: "already_reserved", number }
        : { status: "number_taken", number }
    }
    const byUser = await tx.member.findUnique({ where: { clerkUserId } })
    if (byUser) {
      return { status: "user_has_number", number: byUser.number }
    }
    await tx.member.create({ data: { number, clerkUserId } })
    return { status: "reserved", number }
  }, TRANSACTION_OPTIONS)
}
