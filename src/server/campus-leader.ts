import { createServerFn } from "@tanstack/react-start"

import { toHttpUrl } from "@/lib/http-url"
import { prisma } from "@/lib/prisma"

export type SubmitCampusLeaderResult =
  | { status: "ok" }
  | { status: "closed" }
  | { status: "invalid"; message: string }
  | { status: "error" }

const SESSION_PREF_VALUES = [
  "cursor-labs",
  "codex",
  "elevencreative",
  "surprise",
] as const

const CAREER_VALUES = [
  "sistemas",
  "diseno",
  "marketing",
  "negocios",
  "sociales",
  "otra",
] as const

type SessionPref = (typeof SESSION_PREF_VALUES)[number]
type Career = (typeof CAREER_VALUES)[number]

export type CampusLeaderApplicationInput = {
  cohort: string
  name: string
  email: string
  whatsapp: string
  linkedin?: string
  /** Required in the form unless the applicant skips with “no Instagram”. */
  instagram?: string
  x?: string
  campus: string
  career: Career
  year: string
  bio: string
  reach: string
  aiToday: string
  whyLeader: string
  quietRoom: string
  inviteMessage: string
  roomPlan: string
  sessionPrefs: SessionPref[]
  notes?: string
  applicationsOpen: boolean
}

function requireTrimmedString(
  value: unknown,
  field: string,
  max: number
): string {
  if (typeof value !== "string") {
    throw new Error(`Invalid ${field}`)
  }
  const trimmed = value.trim()
  if (!trimmed) {
    throw new Error(`Invalid ${field}`)
  }
  if (trimmed.length > max) {
    throw new Error(`Invalid ${field}`)
  }
  return trimmed
}

function optionalTrimmedString(
  value: unknown,
  field: string,
  max: number
): string | undefined {
  if (value === undefined || value === null || value === "") {
    return undefined
  }
  if (typeof value !== "string") {
    throw new Error(`Invalid ${field}`)
  }
  const trimmed = value.trim()
  if (!trimmed) {
    return undefined
  }
  if (trimmed.length > max) {
    throw new Error(`Invalid ${field}`)
  }
  return trimmed
}

function optionalHttpUrl(
  value: unknown,
  field: string,
  max: number,
  options?: { host?: string }
): string | undefined {
  const trimmed = optionalTrimmedString(value, field, max)
  if (trimmed === undefined) {
    return undefined
  }
  const href = toHttpUrl(trimmed, options)
  if (href === undefined || href.length > max) {
    throw new Error(`Invalid ${field}`)
  }
  return href
}

function isCareer(value: string): value is Career {
  return (CAREER_VALUES as ReadonlyArray<string>).includes(value)
}

function isSessionPref(value: string): value is SessionPref {
  return (SESSION_PREF_VALUES as ReadonlyArray<string>).includes(value)
}

function parseApplicationInput(data: unknown): CampusLeaderApplicationInput {
  if (typeof data !== "object" || data === null) {
    throw new Error("Invalid payload")
  }

  const record = data as Record<string, unknown>
  const applicationsOpen = record.applicationsOpen === true

  const careerRaw = requireTrimmedString(record.career, "career", 64)
  if (!isCareer(careerRaw)) {
    throw new Error("Invalid career")
  }

  const sessionPrefsRaw = record.sessionPrefs
  const sessionPrefs: SessionPref[] = []
  if (Array.isArray(sessionPrefsRaw)) {
    for (const entry of sessionPrefsRaw) {
      if (typeof entry !== "string" || !isSessionPref(entry)) {
        throw new Error("Invalid sessionPrefs")
      }
      if (!sessionPrefs.includes(entry)) {
        sessionPrefs.push(entry)
      }
    }
  } else if (sessionPrefsRaw !== undefined) {
    throw new Error("Invalid sessionPrefs")
  }

  const email = requireTrimmedString(record.email, "email", 254).toLowerCase()
  if (!email.includes("@")) {
    throw new Error("Invalid email")
  }

  return {
    cohort: requireTrimmedString(record.cohort, "cohort", 32),
    name: requireTrimmedString(record.name, "name", 120),
    email,
    whatsapp: requireTrimmedString(record.whatsapp, "whatsapp", 40),
    linkedin: optionalHttpUrl(record.linkedin, "linkedin", 300, {
      host: "linkedin.com/in",
    }),
    instagram: optionalHttpUrl(record.instagram, "instagram", 300, {
      host: "instagram.com",
    }),
    x: optionalHttpUrl(record.x, "x", 300, { host: "x.com" }),
    campus: requireTrimmedString(record.campus, "campus", 160),
    career: careerRaw,
    year: requireTrimmedString(record.year, "year", 40),
    bio: requireTrimmedString(record.bio, "bio", 400),
    reach: requireTrimmedString(record.reach, "reach", 1200),
    aiToday: requireTrimmedString(record.aiToday, "aiToday", 2000),
    whyLeader: requireTrimmedString(record.whyLeader, "whyLeader", 2000),
    quietRoom: requireTrimmedString(record.quietRoom, "quietRoom", 2000),
    inviteMessage: requireTrimmedString(
      record.inviteMessage,
      "inviteMessage",
      2000
    ),
    roomPlan: requireTrimmedString(record.roomPlan, "roomPlan", 2000),
    sessionPrefs,
    notes: optionalTrimmedString(record.notes, "notes", 2000),
    applicationsOpen,
  }
}

export const submitCampusLeaderApplication = createServerFn({ method: "POST" })
  .validator(parseApplicationInput)
  .handler(async ({ data }): Promise<SubmitCampusLeaderResult> => {
    if (!data.applicationsOpen) {
      return { status: "closed" }
    }

    try {
      await prisma.campusLeaderApplication.create({
        data: {
          cohort: data.cohort,
          name: data.name,
          email: data.email,
          whatsapp: data.whatsapp,
          linkedin: data.linkedin,
          instagram: data.instagram,
          x: data.x,
          campus: data.campus,
          career: data.career,
          year: data.year,
          bio: data.bio,
          reach: data.reach,
          aiToday: data.aiToday,
          whyLeader: data.whyLeader,
          quietRoom: data.quietRoom,
          inviteMessage: data.inviteMessage,
          roomPlan: data.roomPlan,
          sessionPrefs: data.sessionPrefs,
          notes: data.notes,
        },
      })
      return { status: "ok" }
    } catch (error) {
      console.error("campus-leader submit failed", error)
      return { status: "error" }
    }
  })
