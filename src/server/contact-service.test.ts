import { afterEach, describe, expect, it, vi } from "vitest"
import { parseContactInput } from "./contact-input"
import { receiveContact } from "./contact-service"

const input = {
  submissionId: "2163e247-b71d-4bad-a2d7-873f4613ed16",
  name: " Walter Morales ",
  email: "WALTER@example.com",
  company: "",
  interest: "enablement",
  message: "I want to learn.",
  locale: "en",
  website: "",
}

describe("contact validation and receipt", () => {
  afterEach(() => vi.restoreAllMocks())

  it("normalizes input and supports professionals without a company", () => {
    expect(parseContactInput(input)).toMatchObject({
      name: "Walter Morales",
      email: "walter@example.com",
      company: "",
    })
  })

  it.each([
    { email: "no-address" },
    { email: "a@example.com\r\nBcc:another@example.com" },
    { name: " " },
    { message: "a".repeat(5001) },
    { interest: "other" },
    { locale: "fr" },
    { submissionId: "not-a-uuid" },
    { website: "https://spam.test" },
  ])(
    "rejects invalid or honeypot input before any write: %j",
    async (override) => {
      const save = vi.fn()
      expect(await receiveContact({ ...input, ...override }, { save })).toEqual(
        { status: "invalid" }
      )
      expect(save).not.toHaveBeenCalled()
    }
  )

  it("confirms receipt only after persistence resolves", async () => {
    let finishSave:
      ((value: { status: "saved"; id: string }) => void) | undefined
    const save = vi.fn(
      () =>
        new Promise<{ status: "saved"; id: string }>((resolve) => {
          finishSave = resolve
        })
    )
    let received = false
    const result = receiveContact(input, { save }).then((value) => {
      received = true
      return value
    })
    await Promise.resolve()
    expect(received).toBe(false)
    expect(save).toHaveBeenCalledOnce()
    finishSave?.({ status: "saved", id: input.submissionId })
    expect(await result).toEqual({ status: "received" })
  })

  it("returns a recoverable error when persistence fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {})
    expect(
      await receiveContact(input, {
        save: async () => {
          throw new Error("database down")
        },
      })
    ).toEqual({ status: "error" })
  })

  it("returns the admission limit without confirming receipt", async () => {
    expect(
      await receiveContact(input, {
        save: async () => ({ status: "rate_limited" }),
      })
    ).toEqual({ status: "rate_limited" })
  })
})
