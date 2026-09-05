import type { PrismaClient } from "../generated/prisma/client"
import type { ContactInput } from "./contact-input"
import type { SaveContactResult } from "./contact-service"

export const CONTACT_EMAIL_HOURLY_LIMIT = 5
export const CONTACT_GLOBAL_HOURLY_LIMIT = 200

export async function saveContact(
  db: PrismaClient,
  input: ContactInput,
  now = new Date()
): Promise<SaveContactResult> {
  return db.$transaction(
    async (tx) => {
      // One short transaction serializes admissions across every server instance.
      // Rate counts and insert cannot race; no process-local cache or trusted IP header.
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(719408, 1)`
      const existing = await tx.contactInquiry.findUnique({
        where: { id: input.submissionId },
      })
      if (existing) {
        const same =
          existing.name === input.name &&
          existing.email === input.email &&
          (existing.company ?? "") === input.company &&
          existing.interest === input.interest &&
          existing.message === input.message &&
          existing.locale === input.locale
        if (!same) return { status: "invalid" }
        return {
          status: "saved",
          id: existing.id,
        }
      }

      const since = new Date(now.getTime() - 60 * 60 * 1000)
      const byEmail = await tx.contactInquiry.count({
        where: { email: input.email, createdAt: { gte: since } },
      })
      const total = await tx.contactInquiry.count({
        where: { createdAt: { gte: since } },
      })
      if (
        byEmail >= CONTACT_EMAIL_HOURLY_LIMIT ||
        total >= CONTACT_GLOBAL_HOURLY_LIMIT
      ) {
        return { status: "rate_limited" }
      }
      const row = await tx.contactInquiry.create({
        data: {
          id: input.submissionId,
          name: input.name,
          email: input.email,
          company: input.company || null,
          interest: input.interest,
          message: input.message,
          locale: input.locale,
        },
      })
      return {
        status: "saved",
        id: row.id,
      }
    },
    { maxWait: 5000, timeout: 10000 }
  )
}
