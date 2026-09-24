import "dotenv/config"
import { pathToFileURL } from "node:url"

import { formatMemberNumber } from "../src/lib/aperture/member-number"
import { reserveMember } from "../src/server/aperture/member-store"
import type { ReserveResult } from "../src/server/aperture/member-store"
import { createScriptPrisma } from "./lib/script-prisma"

function arg(name: string): string | undefined {
  return process.argv
    .find((value) => value.startsWith(`--${name}=`))
    ?.slice(name.length + 3)
}

export function describeReserve(
  result: ReserveResult,
  clerkUserId: string
): { ok: boolean; message: string } {
  switch (result.status) {
    case "reserved":
      return {
        ok: true,
        message: `Reserved #${formatMemberNumber(result.number)} for ${clerkUserId}`,
      }
    case "already_reserved":
      return {
        ok: true,
        message: `Already reserved #${formatMemberNumber(result.number)} for ${clerkUserId}`,
      }
    case "number_taken":
      return {
        ok: false,
        message: `#${formatMemberNumber(result.number)} belongs to another user`,
      }
    case "user_has_number":
      return {
        ok: false,
        message: `${clerkUserId} already holds #${formatMemberNumber(result.number)}`,
      }
    case "not_reserved_range":
      return { ok: false, message: "Reserved numbers are 0 to 4" }
    default: {
      const unhandled: never = result
      throw new Error(`Unhandled result ${JSON.stringify(unhandled)}`)
    }
  }
}

async function main() {
  const number = Number(arg("number"))
  const clerkUserId = arg("clerk-user-id")
  if (!Number.isInteger(number) || !clerkUserId) {
    throw new Error(
      "Usage: pnpm aperture:reserve --number=<0..4> --clerk-user-id=<id>"
    )
  }
  const prisma = createScriptPrisma()
  try {
    const { ok, message } = describeReserve(
      await reserveMember(prisma, number, clerkUserId),
      clerkUserId
    )
    console.log(message)
    if (!ok) process.exitCode = 1
  } finally {
    await prisma.$disconnect()
  }
}

const entrypoint = process.argv[1]
if (entrypoint && import.meta.url === pathToFileURL(entrypoint).href) {
  main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  })
}
