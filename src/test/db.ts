import type { PrismaClient } from "@/generated/prisma/client"
import { assertSeedTarget } from "../../scripts/dev-seed"
import { createScriptPrisma } from "../../scripts/lib/script-prisma"

/** A client for the disposable, migrated database named by TEST_DATABASE_URL. */
export function createTestPrisma(): PrismaClient {
  const url = process.env.TEST_DATABASE_URL
  if (!url) {
    throw new Error(
      "Set TEST_DATABASE_URL to a migrated lane_* or dev* database"
    )
  }
  assertSeedTarget(url)
  return createScriptPrisma(url)
}

export async function resetMembers(prisma: PrismaClient) {
  await prisma.$executeRawUnsafe(
    'TRUNCATE "Consent", "MemberEmail", "Profile", "Member" CASCADE'
  )
}
