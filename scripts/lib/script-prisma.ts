import { PrismaNeon } from "@prisma/adapter-neon"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../../src/generated/prisma/client"

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"])

export function isLocalDatabase(url: string): boolean {
  return LOCAL_HOSTS.has(new URL(url).hostname)
}

export function databaseName(url: string): string {
  return decodeURIComponent(new URL(url).pathname.replace(/^\//, ""))
}

/** Neon's WebSocket adapter cannot reach a plain local Postgres, so local runs use TCP. */
export function createScriptPrisma(
  url = process.env.DATABASE_URL
): PrismaClient {
  if (!url) {
    throw new Error("DATABASE_URL is not set")
  }
  const adapter = isLocalDatabase(url)
    ? new PrismaPg({ connectionString: url })
    : new PrismaNeon({ connectionString: url })
  return new PrismaClient({ adapter })
}
