import "dotenv/config"
import { pathToFileURL } from "node:url"

import type { PrismaClient } from "../src/generated/prisma/client"
import { createScriptPrisma, databaseName } from "./lib/script-prisma"

const SEED_DATABASE_PREFIXES = ["lane_", "dev"]

/** Refuses every database that is not a disposable lane or dev database. */
export function assertSeedTarget(url: string): void {
  const name = databaseName(url)
  if (!SEED_DATABASE_PREFIXES.some((prefix) => name.startsWith(prefix))) {
    throw new Error(
      `Refusing to seed "${name}". Seed only databases named lane_* or dev*.`
    )
  }
}

export function laneEmail(lane: number): string {
  return `lane${lane}+clerk_test@example.com`
}

type SeedEvent = {
  slug: string
  name: string
  codes: ReadonlyArray<{ code: string; deleted?: boolean }>
}

const SEED_EVENTS: ReadonlyArray<SeedEvent> = [
  {
    slug: "lane-event",
    name: "Lane Builders Night",
    codes: [1, 2, 3, 4, 5].map((n) => ({ code: `LANE-CURSOR-${n}` })),
  },
  { slug: "lane-sold-out", name: "Lane Sold Out Session", codes: [] },
  {
    slug: "lane-tombstoned",
    name: "Lane Tombstoned Session",
    codes: [{ code: "LANE-CURSOR-TOMBSTONED", deleted: true }],
  },
]

async function seedEvents(prisma: PrismaClient, emails: ReadonlyArray<string>) {
  for (const seed of SEED_EVENTS) {
    const event = await prisma.event.upsert({
      where: { slug: seed.slug },
      update: {},
      create: { slug: seed.slug, name: seed.name, product: "CURSOR" },
    })
    for (const email of emails) {
      await prisma.eligibleEmail.upsert({
        where: { eventId_email: { eventId: event.id, email } },
        update: {},
        create: { eventId: event.id, email },
      })
    }
    for (const entry of seed.codes) {
      await prisma.promoCode.upsert({
        where: { pool_code: { pool: "CURSOR", code: entry.code } },
        update: {},
        create: {
          pool: "CURSOR",
          code: entry.code,
          eventId: event.id,
          allocatedAt: new Date(),
          deletedAt: entry.deleted ? new Date() : null,
        },
      })
    }
  }
}

export function parseLane(argv: ReadonlyArray<string>): number {
  const raw = argv.find((arg) => arg.startsWith("--lane="))
  const lane = raw ? Number(raw.slice("--lane=".length)) : 1
  if (!Number.isInteger(lane) || lane < 1) {
    throw new Error("--lane must be a positive integer")
  }
  return lane
}

async function main() {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error("DATABASE_URL is not set")
  }
  assertSeedTarget(url)
  const lane = parseLane(process.argv)
  const prisma = createScriptPrisma(url)
  try {
    await seedEvents(prisma, [laneEmail(lane)])
    const counts = {
      events: await prisma.event.count(),
      eligibleEmails: await prisma.eligibleEmail.count(),
      promoCodes: await prisma.promoCode.count(),
    }
    console.log(`Seeded ${databaseName(url)} for ${laneEmail(lane)}`)
    console.log(JSON.stringify(counts))
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
