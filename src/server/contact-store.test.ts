import { describe, expect, it, vi } from "vitest"
import type { PrismaClient } from "../generated/prisma/client"
import { saveContact } from "./contact-store"
import type { ContactInput } from "./contact-input"

const input: ContactInput = {
  submissionId: "2163e247-b71d-4bad-a2d7-873f4613ed16",
  name: "Walter",
  email: "walter@example.com",
  company: "",
  interest: "discovery",
  message: "Help our team.",
  locale: "es",
  website: "",
}

function store(existing: object | null = null, counts = [0, 0]) {
  const calls: string[] = []
  const tx = {
    $executeRaw: vi.fn(async () => {
      calls.push("lock")
    }),
    contactInquiry: {
      findUnique: vi.fn(async () => {
        calls.push("lookup")
        return existing
      }),
      count: vi.fn(async () => {
        calls.push("count")
        return counts.shift() ?? 0
      }),
      create: vi.fn(async () => {
        calls.push("insert")
        return { id: input.submissionId }
      }),
    },
  }
  const db = {
    $transaction: async (callback: (value: typeof tx) => unknown) =>
      callback(tx),
  } as unknown as PrismaClient
  return { db, tx, calls }
}

describe("durable contact admission", () => {
  it("takes a database lock before checking rate counts and inserting", async () => {
    const { db, calls } = store()
    expect(await saveContact(db, input)).toMatchObject({ status: "saved" })
    expect(calls).toEqual(["lock", "lookup", "count", "count", "insert"])
  })

  it.each([
    [5, 5],
    [0, 200],
  ])("limits per-email and global hourly admissions: %j", async (a, b) => {
    const { db, tx } = store(null, [a, b])
    expect(await saveContact(db, input)).toEqual({ status: "rate_limited" })
    expect(tx.contactInquiry.create).not.toHaveBeenCalled()
  })

  it("returns the same inquiry without consuming another admission", async () => {
    const { db, tx } = store({
      ...input,
      id: input.submissionId,
    })
    expect(await saveContact(db, input)).toMatchObject({
      status: "saved",
      id: input.submissionId,
    })
    expect(tx.contactInquiry.count).not.toHaveBeenCalled()
    expect(tx.contactInquiry.create).not.toHaveBeenCalled()
  })

  it("rejects reuse of a submission ID for different content", async () => {
    const { db, tx } = store({
      ...input,
      name: "Someone else",
      id: input.submissionId,
    })
    expect(await saveContact(db, input)).toEqual({ status: "invalid" })
    expect(tx.contactInquiry.create).not.toHaveBeenCalled()
  })
})
