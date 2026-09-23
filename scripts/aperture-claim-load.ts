import "dotenv/config"
import { randomUUID } from "node:crypto"
import { pathToFileURL } from "node:url"

import { claimMembership } from "../src/server/aperture/member-store"
import { assertSeedTarget } from "./dev-seed"
import { createScriptPrisma } from "./lib/script-prisma"

/** Summarizes a batch of claimed numbers: the range, gaps inside it, and duplicates. */
export function summarizeNumbers(numbers: ReadonlyArray<number>) {
  const sorted = [...numbers].sort((a, b) => a - b)
  const first = sorted[0] ?? 0
  const last = sorted.at(-1) ?? 0
  const duplicates = sorted.length - new Set(sorted).size
  const gaps = sorted.length ? last - first + 1 - new Set(sorted).size : 0
  return { first, last, gaps, duplicates }
}

async function main() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error("DATABASE_URL is not set")
  assertSeedTarget(url)
  const raw = process.argv.find((value) => value.startsWith("--count="))
  const count = raw ? Number(raw.slice("--count=".length)) : 20

  const prisma = createScriptPrisma(url)
  try {
    // A running server keeps its pool open, so connection setup stays out of the timing.
    await Promise.all(
      Array.from({ length: 10 }, () => prisma.$queryRaw`SELECT 1`)
    )
    const started = performance.now()
    const timings: Array<number> = []
    const results = await Promise.all(
      Array.from({ length: count }, async () => {
        const id = randomUUID().slice(0, 8)
        const t0 = performance.now()
        const result = await claimMembership(prisma, {
          clerkUserId: `load_${id}`,
          profile: {
            username: `load_${id}`,
            displayName: `Load ${id}`,
            headline: "Synthetic load member",
            bio: null,
            countryCode: "SV",
            city: null,
            role: "DEVELOPER",
            upFor: [],
            showEvents: false,
            linkedinUrl: null,
            xUrl: null,
            githubUrl: null,
            websiteUrl: null,
            instagramUrl: null,
          },
          verifiedEmails: [`load_${id}@example.com`],
          avatarUrl: null,
          consent: { version: "load", locale: "en", marketing: false },
        })
        timings.push(performance.now() - t0)
        return result
      })
    )
    const numbers = results.flatMap((result) =>
      result.status === "claimed" ? [result.number] : []
    )
    const { first, last, gaps, duplicates } = summarizeNumbers(numbers)
    const p95 = [...timings].sort((a, b) => a - b)[
      Math.min(timings.length - 1, Math.ceil(timings.length * 0.95) - 1)
    ]
    console.log(
      `claimed ${numbers.length}, numbers ${first}..${last}, gaps ${gaps}, duplicates ${duplicates}`
    )
    console.log(
      `per-claim p95 ${Math.round(p95)} ms, total ${Math.round(performance.now() - started)} ms`
    )
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
