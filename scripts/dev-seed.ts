import "dotenv/config"
import { pathToFileURL } from "node:url"

import type { PrismaClient } from "../src/generated/prisma/client"
import { claimMembership } from "../src/server/aperture/member-store"
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

const SEED_ROLES = [
  "FOUNDER",
  "DEVELOPER",
  "DESIGNER",
  "OPERATOR",
  "STUDENT",
] as const
const SEED_COUNTRIES = ["SV", "GT", "HN", "MX", "US", "CR"] as const
const SEED_UP_FOR = [
  [],
  ["COFOUNDING"],
  ["FREELANCE", "COLLABORATING"],
  ["HIRING"],
  ["MENTORING"],
] as const
export const SEED_MEMBER_COUNT = 30

export function seedMemberEmail(index: number): string {
  return `seed${index}@example.com`
}

/** Thirty members with varied roles, countries, and profiles for directory checks. */
async function seedMembers(prisma: PrismaClient) {
  const lane = await prisma.event.findUnique({ where: { slug: "lane-event" } })
  for (let i = 0; i < SEED_MEMBER_COUNT; i++) {
    const username = `seed_builder_${String(i).padStart(2, "0")}`
    const complete = i % 2 === 0
    await claimMembership(prisma, {
      clerkUserId: `seed_user_${i}`,
      profile: {
        username,
        displayName: `Seed Builder ${i}`,
        headline: `${SEED_ROLES[i % SEED_ROLES.length]} building with AI tools`,
        bio: complete
          ? "Synthetic member for verification. Builds internal tools and teaches teams to review AI output."
          : null,
        countryCode: SEED_COUNTRIES[i % SEED_COUNTRIES.length],
        city: complete ? "San Salvador" : null,
        role: SEED_ROLES[i % SEED_ROLES.length],
        upFor: [...SEED_UP_FOR[i % SEED_UP_FOR.length]],
        showEvents: i % 3 === 0,
        linkedinUrl: complete
          ? `https://www.linkedin.com/in/${username}`
          : null,
        xUrl: null,
        githubUrl: i % 4 === 0 ? `https://github.com/${username}` : null,
        websiteUrl: null,
        instagramUrl: null,
      },
      verifiedEmails: [seedMemberEmail(i)],
      avatarUrl: null,
      consent: { version: "seed", locale: "en", marketing: false },
    })
    if (lane && i % 3 === 0) {
      await prisma.eligibleEmail.upsert({
        where: {
          eventId_email: { eventId: lane.id, email: seedMemberEmail(i) },
        },
        update: {},
        create: { eventId: lane.id, email: seedMemberEmail(i) },
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
    await seedMembers(prisma)
    const counts = {
      events: await prisma.event.count(),
      eligibleEmails: await prisma.eligibleEmail.count(),
      promoCodes: await prisma.promoCode.count(),
      members: await prisma.member.count(),
      profiles: await prisma.profile.count(),
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
