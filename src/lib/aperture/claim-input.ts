import { isLocale, type Locale } from "@/content"
import {
  parseProfileInput,
  type ProfileDraft,
  type ProfileFieldErrors,
} from "@/lib/aperture/profile-input"

export type ClaimFormResult =
  | {
      ok: true
      profile: ProfileDraft
      marketing: boolean
      locale: Locale
    }
  | { ok: false; status: "consent_required" }
  | { ok: false; status: "invalid"; fieldErrors: ProfileFieldErrors }

function recordOf(input: unknown): Record<string, unknown> {
  return typeof input === "object" && input !== null
    ? (input as Record<string, unknown>)
    : {}
}

function localeOf(value: unknown): Locale {
  return typeof value === "string" && isLocale(value) ? value : "en"
}

/** Profile first so empty required fields surface before the consent check. */
export function parseClaimForm(input: unknown): ClaimFormResult {
  const record = recordOf(input)
  const parsed = parseProfileInput(record)
  if (!parsed.ok) {
    return { ok: false, status: "invalid", fieldErrors: parsed.fieldErrors }
  }
  if (record.acceptLegal !== true || record.acceptAge !== true) {
    return { ok: false, status: "consent_required" }
  }
  return {
    ok: true,
    profile: parsed.draft,
    marketing: record.marketing === true,
    locale: localeOf(record.locale),
  }
}
