import type { PrismaClient } from "../../generated/prisma/client"
import { parseUsername } from "@/lib/aperture/username"

export type UsernameCheck = "available" | "taken" | "reserved" | "invalid"

export async function lookupUsername(
  db: PrismaClient,
  raw: string
): Promise<UsernameCheck> {
  const parsed = parseUsername(raw)
  if (!parsed.ok) {
    return parsed.reason
  }
  const existing = await db.profile.findUnique({
    where: { username: parsed.value },
    select: { username: true },
  })
  return existing ? "taken" : "available"
}
