import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import {
  TEST_WEBHOOK_SECRET,
  signedRequest,
  userEventPayload,
} from "../../../scripts/lib/clerk-webhook-fixture"
import { respondToClerkWebhook } from "./clerk-webhook"

const OTHER_SECRET = "whsec_b3RoZXItc2VjcmV0LWludmFsaWQ="

function createdEvent() {
  return userEventPayload("user.created", {
    id: "user_test",
    emails: [{ address: "a@example.com", verified: true }],
  })
}

describe("respondToClerkWebhook", () => {
  const previous = process.env.CLERK_WEBHOOK_SIGNING_SECRET

  beforeEach(() => {
    process.env.CLERK_WEBHOOK_SIGNING_SECRET = TEST_WEBHOOK_SECRET
  })

  afterEach(() => {
    if (previous === undefined) {
      delete process.env.CLERK_WEBHOOK_SIGNING_SECRET
    } else {
      process.env.CLERK_WEBHOOK_SIGNING_SECRET = previous
    }
  })

  it("returns 400 for a bad signature", async () => {
    const handle = vi.fn()
    const response = await respondToClerkWebhook(
      signedRequest(OTHER_SECRET, createdEvent()),
      handle
    )
    expect(response.status).toBe(400)
    expect(await response.text()).toBe("invalid signature")
    expect(handle).not.toHaveBeenCalled()
  })

  it("returns 400 when the timestamp is ten minutes old", async () => {
    const response = await respondToClerkWebhook(
      signedRequest(TEST_WEBHOOK_SECRET, createdEvent(), {
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
      }),
      async () => ({ status: "ignored", type: "user.created" })
    )
    expect(response.status).toBe(400)
  })

  it("returns 200 for a signed user.created", async () => {
    const handle = vi.fn(async () => ({
      status: "ignored" as const,
      type: "user.created",
    }))
    const response = await respondToClerkWebhook(
      signedRequest(TEST_WEBHOOK_SECRET, createdEvent()),
      handle
    )
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({
      status: "ignored",
      type: "user.created",
    })
    expect(handle).toHaveBeenCalledOnce()
  })
})
