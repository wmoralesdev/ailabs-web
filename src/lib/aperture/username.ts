const USERNAME_PATTERN = /^[a-z0-9_]{3,20}$/

/** Route segments and team handles a member cannot claim. */
export const RESERVED_USERNAMES: ReadonlySet<string> = new Set([
  "admin",
  "administrator",
  "ailabs",
  "ai_labs",
  "aperture",
  "api",
  "about",
  "campus_leader",
  "community",
  "events",
  "help",
  "join",
  "lab",
  "labs",
  "login",
  "moderator",
  "null",
  "privacy",
  "redeem",
  "root",
  "settings",
  "signin",
  "signup",
  "staff",
  "support",
  "team",
  "terms",
  "undefined",
])

export type UsernameResult =
  { ok: true; value: string } | { ok: false; reason: "invalid" | "reserved" }

export function parseUsername(raw: string): UsernameResult {
  const value = raw.trim().replace(/^@/, "").toLowerCase()
  if (!USERNAME_PATTERN.test(value)) {
    return { ok: false, reason: "invalid" }
  }
  if (RESERVED_USERNAMES.has(value)) {
    return { ok: false, reason: "reserved" }
  }
  return { ok: true, value }
}

export const USERNAME_CHANGE_COOLDOWN_DAYS = 30

/** The first moment a member may change their username again, or null when they can now. */
export function nextUsernameChange(
  changedAt: Date | null,
  now: Date
): Date | null {
  if (!changedAt) {
    return null
  }
  const next = new Date(
    changedAt.getTime() + USERNAME_CHANGE_COOLDOWN_DAYS * 24 * 60 * 60 * 1000
  )
  return next > now ? next : null
}
