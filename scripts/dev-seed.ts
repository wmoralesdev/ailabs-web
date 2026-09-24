import "dotenv/config"
import { pathToFileURL } from "node:url"

import type { PrismaClient } from "../src/generated/prisma/client"
import { claimMembership } from "../src/server/aperture/member-store"
import { createProject } from "../src/server/aperture/project-store"
import { createScriptPrisma, databaseName } from "./lib/script-prisma"
import { SEED_MEMBERS } from "./lib/seed-members"

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
  startsAt?: string
  venue?: string
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

/** Past events for member profiles; the lane address is not eligible. */
const PROFILE_EVENTS: ReadonlyArray<SeedEvent> = [
  {
    slug: "lane-agents-workshop",
    name: "Lane Agents Workshop",
    codes: [],
    startsAt: "2026-05-14T23:00:00Z",
    venue: "Lane Hub, San Salvador",
  },
  {
    slug: "lane-demo-day",
    name: "Lane Demo Day",
    codes: [],
    startsAt: "2026-06-20T22:00:00Z",
    venue: "Lane Hub, San Salvador",
  },
  {
    slug: "lane-ops-clinic",
    name: "Lane Operations Clinic",
    codes: [],
    startsAt: "2026-07-09T00:00:00Z",
  },
  {
    slug: "lane-founders-dinner",
    name: "Lane Founders Dinner",
    codes: [],
    startsAt: "2026-08-27T01:00:00Z",
    venue: "Antiguo Cuscatlán",
  },
]

async function upsertSeedEvent(prisma: PrismaClient, seed: SeedEvent) {
  const schedule = {
    startsAt: seed.startsAt ? new Date(seed.startsAt) : null,
    venue: seed.venue ?? null,
  }
  return prisma.event.upsert({
    where: { slug: seed.slug },
    update: seed.startsAt ? schedule : {},
    create: {
      slug: seed.slug,
      name: seed.name,
      product: "CURSOR",
      ...schedule,
    },
  })
}

async function seedEvents(prisma: PrismaClient, emails: ReadonlyArray<string>) {
  for (const seed of PROFILE_EVENTS) {
    await upsertSeedEvent(prisma, seed)
  }
  for (const seed of SEED_EVENTS) {
    const event = await upsertSeedEvent(prisma, seed)
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

export function seedMemberEmail(index: number): string {
  return `seed${index}@example.com`
}

function seedClerkUserId(index: number): string {
  return `seed_user_${index}`
}

/** Profiles with photos, long and empty fields, projects, and event history. */
async function seedMembers(prisma: PrismaClient) {
  const events = await prisma.event.findMany({
    where: {
      slug: { in: [...SEED_EVENTS, ...PROFILE_EVENTS].map((e) => e.slug) },
    },
    select: { id: true, slug: true },
  })
  const eventIds = new Map(events.map((event) => [event.slug, event.id]))
  for (const [index, member] of SEED_MEMBERS.entries()) {
    const clerkUserId = seedClerkUserId(index)
    const email = seedMemberEmail(index)
    const claim = await claimMembership(prisma, {
      clerkUserId,
      profile: member.profile,
      verifiedEmails: [email],
      avatarUrl: member.avatarUrl,
      consent: { version: "seed", locale: "en", marketing: false },
    })
    for (const slug of member.events) {
      const eventId = eventIds.get(slug)
      if (!eventId) {
        continue
      }
      await prisma.eligibleEmail.upsert({
        where: { eventId_email: { eventId, email } },
        update: {},
        create: { eventId, email },
      })
    }
    if (claim.status !== "claimed") {
      continue
    }
    for (const project of member.projects) {
      const result = await createProject(prisma, clerkUserId, {
        ...project,
        imageKey: null,
        published: true,
      })
      if (result.status !== "ok") {
        throw new Error(
          `Seed project "${project.title}" was rejected: ${result.status}`
        )
      }
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
      projects: await prisma.project.count(),
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
