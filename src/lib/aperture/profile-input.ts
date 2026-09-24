import { MemberRole, UpFor } from "@/generated/prisma/enums"
import { isHttpUrl } from "@/lib/http-url"
import { isCountryCode } from "@/lib/aperture/countries"
import type { CountryCode } from "@/lib/aperture/countries"
import { parseUsername } from "@/lib/aperture/username"

export const PROFILE_LIMITS = {
  displayName: 60,
  headline: 80,
  bio: 280,
  city: 60,
  link: 200,
} as const

export const MEMBER_ROLES = Object.values(MemberRole)
export const UP_FOR_OPTIONS = Object.values(UpFor)

export const PROFILE_LINK_FIELDS = [
  "linkedinUrl",
  "xUrl",
  "githubUrl",
  "websiteUrl",
  "instagramUrl",
] as const

export type ProfileLinkField = (typeof PROFILE_LINK_FIELDS)[number]

export type ProfileDraft = {
  username: string
  displayName: string
  headline: string
  bio: string | null
  countryCode: CountryCode
  city: string | null
  role: MemberRole
  upFor: UpFor[]
  showEvents: boolean
} & Record<ProfileLinkField, string | null>

export type ProfileField = keyof ProfileDraft

export type ProfileFieldError =
  "required" | "too_long" | "invalid" | "reserved" | "taken"

export type ProfileFieldErrors = Partial<
  Record<ProfileField, ProfileFieldError>
>

export type ProfileInputResult =
  | { ok: true; draft: ProfileDraft }
  | { ok: false; fieldErrors: ProfileFieldErrors }

/** What a form sends. Everything is untrusted until `parseProfileInput` accepts it. */
export type ProfileInput = Partial<
  Record<Exclude<ProfileField, "upFor" | "showEvents">, string>
> & {
  upFor?: ReadonlyArray<string>
  showEvents?: boolean
}

export function isMemberRole(value: string): value is MemberRole {
  return (MEMBER_ROLES as ReadonlyArray<string>).includes(value)
}

function field(input: unknown, key: string): unknown {
  return typeof input === "object" && input !== null
    ? (input as Record<string, unknown>)[key]
    : undefined
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

export function parseProfileInput(input: unknown): ProfileInputResult {
  const errors: ProfileFieldErrors = {}

  const username = parseUsername(text(field(input, "username")))
  if (!username.ok) {
    errors.username = text(field(input, "username"))
      ? username.reason
      : "required"
  }

  const required = (key: "displayName" | "headline", max: number): string => {
    const value = text(field(input, key))
    if (!value) errors[key] = "required"
    else if (value.length > max) errors[key] = "too_long"
    return value
  }
  const optional = (key: "bio" | "city", max: number): string | null => {
    const value = text(field(input, key))
    if (value.length > max) errors[key] = "too_long"
    return value || null
  }

  const displayName = required("displayName", PROFILE_LIMITS.displayName)
  const headline = required("headline", PROFILE_LIMITS.headline)
  const bio = optional("bio", PROFILE_LIMITS.bio)
  const city = optional("city", PROFILE_LIMITS.city)

  const countryCode = text(field(input, "countryCode")).toUpperCase()
  if (!countryCode) errors.countryCode = "required"
  else if (!isCountryCode(countryCode)) errors.countryCode = "invalid"

  const role = text(field(input, "role"))
  if (!role) errors.role = "required"
  else if (!isMemberRole(role)) errors.role = "invalid"

  const rawUpFor = field(input, "upFor") ?? []
  const upFor = Array.isArray(rawUpFor)
    ? [...new Set(rawUpFor)].filter((value): value is UpFor =>
        (UP_FOR_OPTIONS as ReadonlyArray<unknown>).includes(value)
      )
    : []
  if (!Array.isArray(rawUpFor) || upFor.length !== new Set(rawUpFor).size) {
    errors.upFor = "invalid"
  }

  const link = (key: ProfileLinkField): string | null => {
    const value = text(field(input, key))
    if (value.length > PROFILE_LIMITS.link) errors[key] = "too_long"
    else if (value && !isHttpUrl(value)) errors[key] = "invalid"
    return value || null
  }
  const links: Record<ProfileLinkField, string | null> = {
    linkedinUrl: link("linkedinUrl"),
    xUrl: link("xUrl"),
    githubUrl: link("githubUrl"),
    websiteUrl: link("websiteUrl"),
    instagramUrl: link("instagramUrl"),
  }

  const showEvents = field(input, "showEvents") === true

  if (
    Object.keys(errors).length > 0 ||
    !username.ok ||
    !isCountryCode(countryCode) ||
    !isMemberRole(role)
  ) {
    return { ok: false, fieldErrors: errors }
  }

  return {
    ok: true,
    draft: {
      username: username.value,
      displayName,
      headline,
      bio,
      countryCode,
      city,
      role,
      upFor,
      showEvents,
      ...links,
    },
  }
}
