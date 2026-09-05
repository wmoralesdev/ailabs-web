import type { ContactInterestId, Locale } from "@/content"

export type ContactInput = {
  submissionId: string
  name: string
  email: string
  company: string
  interest: ContactInterestId
  message: string
  locale: Locale
  website: string
}

export type SubmitContactResult =
  { status: "received" } | { status: "invalid" | "rate_limited" | "error" }

const interests = new Set([
  "discovery",
  "enablement",
  "implementation",
  "partnership",
])
export const CONTACT_EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/
export const CONTACT_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function text(value: unknown, max: number, required = true, multiline = false) {
  if (typeof value !== "string" || value.length > max)
    throw new Error("Invalid contact input")
  const result = value.trim()
  const hasControlCharacter = Array.from(result).some((character) => {
    const code = character.charCodeAt(0)
    return (
      (code < 32 && code !== 9 && code !== 10 && code !== 13) || code === 127
    )
  })
  if ((required && !result) || hasControlCharacter) {
    throw new Error("Invalid contact input")
  }
  if (!multiline && /[\r\n]/.test(result))
    throw new Error("Invalid contact input")
  return result
}

export function parseContactInput(value: unknown): ContactInput {
  if (!value || typeof value !== "object")
    throw new Error("Invalid contact input")
  const input = value as Record<string, unknown>
  const submissionId = text(input.submissionId, 36)
  const email = text(input.email, 254).toLowerCase()
  const interest = text(input.interest, 32)
  if (
    !CONTACT_ID_PATTERN.test(submissionId) ||
    !CONTACT_EMAIL_PATTERN.test(email)
  ) {
    throw new Error("Invalid contact input")
  }
  if (
    !interests.has(interest) ||
    (input.locale !== "en" && input.locale !== "es")
  ) {
    throw new Error("Invalid contact input")
  }
  return {
    submissionId,
    name: text(input.name, 120),
    email,
    company: text(input.company ?? "", 160, false),
    interest: interest as ContactInterestId,
    message: text(input.message, 5000, true, true),
    locale: input.locale,
    website: text(input.website ?? "", 200, false),
  }
}
