import { Prisma } from "../../generated/prisma/client"
import type { Pool, PrismaClient } from "../../generated/prisma/client"
import { en } from "@/content/en"
import { toIso } from "@/lib/aperture/me-date"
import { parseProfileInput } from "@/lib/aperture/profile-input"
import type {
  ProfileDraft,
  ProfileFieldErrors,
} from "@/lib/aperture/profile-input"
import { nextUsernameChange } from "@/lib/aperture/username"
import { lookupUsername } from "@/server/aperture/username-lookup"

export type MeEvent = {
  id: string
  name: string
  slug: string
  startsAt: string | null
  venue: string | null
}

export type MeCredit = {
  pool: Pool
  code: string
  expiresAt: string | null
  eventName: string
  eventSlug: string
}

export type MeDashboard = {
  number: number
  username: string
  profile: ProfileDraft
  newsletter: boolean
  usernameAvailableAt: string | null
  events: MeEvent[]
  credits: MeCredit[]
}

export type LoadMeResult =
  | { status: "no_member" }
  | { status: "retired" }
  | { status: "ok"; dashboard: MeDashboard }

export type SaveProfileResult =
  | { status: "ok"; dashboard: MeDashboard }
  | { status: "no_member" }
  | { status: "retired" }
  | { status: "invalid"; fieldErrors: ProfileFieldErrors }
  | { status: "username_taken" }
  | { status: "username_cooldown"; availableAt: string }

export type SaveNewsletterResult =
  | { status: "ok"; newsletter: boolean }
  | { status: "no_member" }
  | { status: "retired" }

function draftFromProfile(profile: {
  username: string
  displayName: string
  headline: string
  bio: string | null
  countryCode: string
  city: string | null
  role: ProfileDraft["role"]
  upFor: ProfileDraft["upFor"]
  showEvents: boolean
  linkedinUrl: string | null
  xUrl: string | null
  githubUrl: string | null
  websiteUrl: string | null
  instagramUrl: string | null
}): ProfileDraft {
  return {
    username: profile.username,
    displayName: profile.displayName,
    headline: profile.headline,
    bio: profile.bio,
    countryCode: profile.countryCode as ProfileDraft["countryCode"],
    city: profile.city,
    role: profile.role,
    upFor: profile.upFor,
    showEvents: profile.showEvents,
    linkedinUrl: profile.linkedinUrl,
    xUrl: profile.xUrl,
    githubUrl: profile.githubUrl,
    websiteUrl: profile.websiteUrl,
    instagramUrl: profile.instagramUrl,
  }
}

async function latestMarketing(
  db: PrismaClient,
  memberNumber: number
): Promise<boolean> {
  const row = await db.consent.findFirst({
    where: { memberNumber, kind: "MARKETING" },
    orderBy: { createdAt: "desc" },
    select: { granted: true },
  })
  return row?.granted === true
}

export async function eventsForEmails(
  db: PrismaClient,
  emails: ReadonlyArray<string>
): Promise<MeEvent[]> {
  if (emails.length === 0) {
    return []
  }
  const rows = await db.eligibleEmail.findMany({
    where: { email: { in: [...emails] }, event: { deletedAt: null } },
    select: {
      event: {
        select: {
          id: true,
          name: true,
          slug: true,
          startsAt: true,
          venue: true,
        },
      },
    },
  })
  const unique = new Map<string, MeEvent>()
  for (const row of rows) {
    if (unique.has(row.event.id)) {
      continue
    }
    unique.set(row.event.id, {
      id: row.event.id,
      name: row.event.name,
      slug: row.event.slug,
      startsAt: toIso(row.event.startsAt),
      venue: row.event.venue,
    })
  }
  return [...unique.values()].sort((left, right) => {
    if (left.startsAt && right.startsAt) {
      return right.startsAt.localeCompare(left.startsAt)
    }
    if (left.startsAt) {
      return -1
    }
    if (right.startsAt) {
      return 1
    }
    return left.name.localeCompare(right.name)
  })
}

async function creditsForEmails(
  db: PrismaClient,
  emails: ReadonlyArray<string>
): Promise<MeCredit[]> {
  if (emails.length === 0) {
    return []
  }
  const rows = await db.redemption.findMany({
    where: { email: { in: [...emails] } },
    select: {
      event: { select: { name: true, slug: true } },
      promoCodes: {
        where: { deletedAt: null },
        select: { pool: true, code: true, expiresAt: true },
        orderBy: { pool: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  })
  return rows.flatMap((row) =>
    row.promoCodes.map((code) => ({
      pool: code.pool,
      code: code.code,
      expiresAt: toIso(code.expiresAt),
      eventName: row.event.name,
      eventSlug: row.event.slug,
    }))
  )
}

async function dashboardOf(
  db: PrismaClient,
  memberNumber: number,
  profile: Parameters<typeof draftFromProfile>[0] & {
    usernameChangedAt: Date | null
  },
  now: Date
): Promise<MeDashboard> {
  const emails = (
    await db.memberEmail.findMany({
      where: { memberNumber },
      select: { email: true },
    })
  ).map((row) => row.email)
  const [newsletter, events, credits] = await Promise.all([
    latestMarketing(db, memberNumber),
    eventsForEmails(db, emails),
    creditsForEmails(db, emails),
  ])
  return {
    number: memberNumber,
    username: profile.username,
    profile: draftFromProfile(profile),
    newsletter,
    usernameAvailableAt: toIso(
      nextUsernameChange(profile.usernameChangedAt, now)
    ),
    events,
    credits,
  }
}

export async function loadMemberDashboard(
  db: PrismaClient,
  clerkUserId: string,
  now = new Date()
): Promise<LoadMeResult> {
  const member = await db.member.findUnique({
    where: { clerkUserId },
    include: { profile: true },
  })
  if (!member) {
    return { status: "no_member" }
  }
  if (member.retiredAt || !member.profile) {
    return member.retiredAt ? { status: "retired" } : { status: "no_member" }
  }
  return {
    status: "ok",
    dashboard: await dashboardOf(db, member.number, member.profile, now),
  }
}

export async function saveMemberProfile(
  db: PrismaClient,
  clerkUserId: string,
  input: unknown,
  now = new Date()
): Promise<SaveProfileResult> {
  const parsed = parseProfileInput(input)
  if (!parsed.ok) {
    return { status: "invalid", fieldErrors: parsed.fieldErrors }
  }

  const member = await db.member.findUnique({
    where: { clerkUserId },
    include: { profile: true },
  })
  if (!member) {
    return { status: "no_member" }
  }
  if (member.retiredAt || !member.profile) {
    return member.retiredAt ? { status: "retired" } : { status: "no_member" }
  }

  const nextUsername = parsed.draft.username
  const usernameChanged = nextUsername !== member.profile.username
  if (usernameChanged) {
    const availableAt = nextUsernameChange(
      member.profile.usernameChangedAt,
      now
    )
    if (availableAt) {
      return {
        status: "username_cooldown",
        availableAt: availableAt.toISOString(),
      }
    }
    const check = await lookupUsername(db, nextUsername)
    if (check === "taken") {
      return { status: "username_taken" }
    }
    if (check !== "available") {
      return { status: "invalid", fieldErrors: { username: check } }
    }
  }

  try {
    const updated = await db.profile.update({
      where: { memberNumber: member.number },
      data: {
        ...parsed.draft,
        usernameChangedAt: usernameChanged
          ? now
          : member.profile.usernameChangedAt,
      },
    })
    return {
      status: "ok",
      dashboard: await dashboardOf(db, member.number, updated, now),
    }
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

export async function saveNewsletterChoice(
  db: PrismaClient,
  clerkUserId: string,
  granted: boolean,
  locale: "en" | "es"
): Promise<SaveNewsletterResult> {
  const member = await db.member.findUnique({
    where: { clerkUserId },
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
  await db.consent.create({
    data: {
      memberNumber: member.number,
      kind: "MARKETING",
      granted,
      version: en.legal.version,
      locale,
    },
  })
  return { status: "ok", newsletter: granted }
}
