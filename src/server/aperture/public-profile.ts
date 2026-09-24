import type { PrismaClient } from "../../generated/prisma/client"
import type { CountryCode } from "@/lib/aperture/countries"
import { isCountryCode } from "@/lib/aperture/countries"
import type {
  ProfileDraft,
  ProfileLinkField,
} from "@/lib/aperture/profile-input"
import { PROFILE_LINK_FIELDS } from "@/lib/aperture/profile-input"
import { parseUsername } from "@/lib/aperture/username"
import type { MeEvent } from "@/server/aperture/member-dashboard"
import { eventsForEmails } from "@/server/aperture/member-dashboard"

export type PublicProfile = {
  number: number
  username: string
  displayName: string
  headline: string
  bio: string | null
  countryCode: CountryCode
  city: string | null
  role: ProfileDraft["role"]
  upFor: ProfileDraft["upFor"]
  avatarUrl: string | null
  links: ReadonlyArray<{ field: ProfileLinkField; href: string }>
  events: MeEvent[]
}

export type DirectoryMember = {
  number: number
  username: string
  displayName: string
  headline: string
  countryCode: CountryCode
  role: ProfileDraft["role"]
  avatarUrl: string | null
}

const LINK_FIELDS = PROFILE_LINK_FIELDS

function countryOf(value: string): CountryCode {
  return isCountryCode(value) ? value : "SV"
}

export async function loadPublicProfile(
  db: PrismaClient,
  rawUsername: string
): Promise<PublicProfile | null> {
  const parsed = parseUsername(rawUsername)
  if (!parsed.ok) {
    return null
  }
  const profile = await db.profile.findUnique({
    where: { username: parsed.value },
    include: {
      member: {
        select: {
          retiredAt: true,
          emails: { select: { email: true } },
        },
      },
    },
  })
  if (!profile || profile.member.retiredAt) {
    return null
  }
  const events = profile.showEvents
    ? await eventsForEmails(
        db,
        profile.member.emails.map((row) => row.email)
      )
    : []
  return {
    number: profile.memberNumber,
    username: profile.username,
    displayName: profile.displayName,
    headline: profile.headline,
    bio: profile.bio,
    countryCode: countryOf(profile.countryCode),
    city: profile.city,
    role: profile.role,
    upFor: profile.upFor,
    avatarUrl: profile.avatarUrl,
    links: LINK_FIELDS.flatMap((field) => {
      const href = profile[field]
      return href ? [{ field, href }] : []
    }),
    events,
  }
}

export async function listDirectoryMembers(
  db: PrismaClient
): Promise<DirectoryMember[]> {
  const rows = await db.profile.findMany({
    where: { member: { retiredAt: null } },
    orderBy: { memberNumber: "asc" },
    take: 200,
    select: {
      memberNumber: true,
      username: true,
      displayName: true,
      headline: true,
      countryCode: true,
      role: true,
      avatarUrl: true,
    },
  })
  return rows.map((row) => ({
    number: row.memberNumber,
    username: row.username,
    displayName: row.displayName,
    headline: row.headline,
    countryCode: countryOf(row.countryCode),
    role: row.role,
    avatarUrl: row.avatarUrl,
  }))
}
