import { parseProjectImageKey } from "@/lib/aperture/project-image"
import { isHttpUrl } from "@/lib/http-url"

export const PROJECT_LIMITS = {
  title: 60,
  summary: 280,
  url: 200,
  toolName: 40,
  maxProjects: 12,
  minParts: 1,
  maxParts: 8,
} as const

export type BuiltWithPart = {
  name: string
  percent: number
}

export type ProjectDraft = {
  title: string
  summary: string
  url: string | null
  repoUrl: string | null
  imageKey: string | null
  published: boolean
  builtWith: BuiltWithPart[]
}

export type ProjectField = keyof ProjectDraft

export type ProjectFieldError = "required" | "too_long" | "invalid" | "sum"

export type ProjectFieldErrors = Partial<
  Record<ProjectField, ProjectFieldError>
>

export type ProjectInputResult =
  | { ok: true; draft: ProjectDraft }
  | { ok: false; fieldErrors: ProjectFieldErrors }

const SLUG_MAX = 40

export function slugFromTitle(title: string): string {
  const slug = title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, SLUG_MAX)
    .replace(/-+$/g, "")
  return slug.length >= 2 ? slug : "project"
}

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

function optionalUrl(
  value: unknown,
  key: "url" | "repoUrl",
  errors: ProjectFieldErrors
): string | null {
  if (value == null) {
    return null
  }
  if (typeof value !== "string") {
    errors[key] = "invalid"
    return null
  }
  const trimmed = value.trim()
  if (!trimmed) {
    return null
  }
  if (trimmed.length > PROJECT_LIMITS.url) {
    errors[key] = "too_long"
    return null
  }
  if (!isHttpUrl(trimmed)) {
    errors[key] = "invalid"
    return null
  }
  return trimmed
}

function parseBuiltWith(
  value: unknown,
  errors: ProjectFieldErrors
): BuiltWithPart[] {
  if (!Array.isArray(value)) {
    errors.builtWith = "invalid"
    return []
  }
  if (
    value.length < PROJECT_LIMITS.minParts ||
    value.length > PROJECT_LIMITS.maxParts
  ) {
    errors.builtWith = "invalid"
    return []
  }
  const parts: BuiltWithPart[] = []
  for (const row of value) {
    if (typeof row !== "object" || row === null) {
      errors.builtWith = "invalid"
      return []
    }
    const name = "name" in row ? readString(row.name) : ""
    const percentRaw = "percent" in row ? row.percent : null
    const percent =
      typeof percentRaw === "number"
        ? percentRaw
        : typeof percentRaw === "string"
          ? Number(percentRaw)
          : Number.NaN
    if (!name) {
      errors.builtWith = "required"
      return []
    }
    if (name.length > PROJECT_LIMITS.toolName) {
      errors.builtWith = "too_long"
      return []
    }
    if (!Number.isInteger(percent) || percent < 1 || percent > 100) {
      errors.builtWith = "invalid"
      return []
    }
    parts.push({ name, percent })
  }
  const sum = parts.reduce((total, part) => total + part.percent, 0)
  if (sum !== 100) {
    errors.builtWith = "sum"
    return parts
  }
  return parts
}

export function parseProjectInput(input: unknown): ProjectInputResult {
  if (typeof input !== "object" || input === null) {
    return {
      ok: false,
      fieldErrors: { title: "required", summary: "required" },
    }
  }
  const data = input as Record<string, unknown>
  const errors: ProjectFieldErrors = {}
  const title = readString(data.title)
  const summary = readString(data.summary)
  if (!title) {
    errors.title = "required"
  } else if (title.length > PROJECT_LIMITS.title) {
    errors.title = "too_long"
  }
  if (!summary) {
    errors.summary = "required"
  } else if (summary.length > PROJECT_LIMITS.summary) {
    errors.summary = "too_long"
  }
  const url = optionalUrl(data.url, "url", errors)
  const repoUrl = optionalUrl(data.repoUrl, "repoUrl", errors)
  const imageKey = optionalImageKey(data.imageKey, errors)
  const published = typeof data.published === "boolean" ? data.published : true
  const builtWith = parseBuiltWith(data.builtWith, errors)
  if (Object.keys(errors).length > 0) {
    return { ok: false, fieldErrors: errors }
  }
  return {
    ok: true,
    draft: { title, summary, url, repoUrl, imageKey, published, builtWith },
  }
}

function optionalImageKey(
  value: unknown,
  errors: ProjectFieldErrors
): string | null {
  if (value == null || value === "") {
    return null
  }
  if (typeof value !== "string" || !parseProjectImageKey(value)) {
    errors.imageKey = "invalid"
    return null
  }
  return value
}
