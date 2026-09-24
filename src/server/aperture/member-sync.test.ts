import { describe, expect, it } from "vitest"

import type { PrismaClient } from "../../generated/prisma/client"
import type { WebhookEvent } from "@clerk/tanstack-react-start/webhooks"
import { userEventPayload } from "../../../scripts/lib/clerk-webhook-fixture"
import {
  handleClerkEvent,
  snapshotFromUserJSON,
  verifiedEmailsOf,
} from "./member-sync"

const unusedDb = {} as PrismaClient

describe("verifiedEmailsOf", () => {
  it("keeps unique verified addresses and drops the rest", () => {
    expect(
      verifiedEmailsOf([
        { emailAddress: "A@example.com", verification: { status: "verified" } },
        {
          emailAddress: "b@example.com",
          verification: { status: "unverified" },
        },
        { emailAddress: "a@example.com", verification: { status: "verified" } },
        { emailAddress: "c@example.com", verification: null },
      ])
    ).toEqual(["a@example.com"])
  })
})

describe("snapshotFromUserJSON", () => {
  it("reads the clerk id, verified emails, and image when present", () => {
    const payload = userEventPayload("user.updated", {
      id: "user_a",
      emails: [
        { address: "a@example.com", verified: true },
        { address: "b@example.com", verified: false },
      ],
      imageUrl: "https://img.clerk.com/new",
    })
    expect(snapshotFromUserJSON(payload.data)).toEqual({
      clerkUserId: "user_a",
      verifiedEmails: ["a@example.com"],
      avatarUrl: "https://img.clerk.com/new",
    })
  })

  it("clears the avatar when Clerk has no image", () => {
    const payload = userEventPayload("user.updated", {
      id: "user_a",
      emails: [{ address: "a@example.com", verified: true }],
    })
    expect(snapshotFromUserJSON(payload.data).avatarUrl).toBeNull()
  })
})

describe("handleClerkEvent", () => {
  it("ignores user.created and non-user events", async () => {
    expect(
      await handleClerkEvent(
        unusedDb,
        userEventPayload("user.created", {
          id: "user_a",
        }) as unknown as WebhookEvent
      )
    ).toEqual({ status: "ignored", type: "user.created" })
    expect(
      await handleClerkEvent(unusedDb, {
        type: "session.created",
      } as WebhookEvent)
    ).toEqual({ status: "ignored", type: "session.created" })
  })
})
