import type { LegalStatus } from "@/content/types"

export type JoinMode = "open" | "preview" | "closed"
export type JoinState = "open" | "closed"

export function parseJoinMode(
  env: string | undefined,
  vercelEnv: string | undefined,
  legalStatus: LegalStatus
): JoinState {
  if (env === "open" && legalStatus === "published") {
    return "open"
  }
  if (env === "preview" && vercelEnv !== "production") {
    return "open"
  }
  return "closed"
}

export function currentJoinState(legalStatus: LegalStatus): JoinState {
  return parseJoinMode(
    process.env.APERTURE_JOIN,
    process.env.VERCEL_ENV,
    legalStatus
  )
}
