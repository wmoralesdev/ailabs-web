import { randomUUID } from "node:crypto"
import { Webhook } from "standardwebhooks"

export const TEST_WEBHOOK_SECRET = "whsec_YXBlcnR1cmUtdGVzdC1zZWNyZXQ="

export type FixtureUser = {
  id: string
  emails?: ReadonlyArray<{ address: string; verified: boolean }>
  imageUrl?: string | null
}

export type DeletedUserPayload = {
  type: "user.deleted"
  object: "event"
  data: { id: string; object: "user"; deleted: true }
}

export type UserEventPayload = {
  type: "user.created" | "user.updated"
  object: "event"
  data: {
    id: string
    object: "user"
    email_addresses: Array<{
      id: string
      object: "email_address"
      email_address: string
      verification: { status: string; strategy: string } | null
      linked_to: Array<never>
    }>
    primary_email_address_id: string | null
    image_url: string
    has_image: boolean
  }
}

export function userEventPayload(
  type: "user.deleted",
  user: FixtureUser
): DeletedUserPayload
export function userEventPayload(
  type: "user.created" | "user.updated",
  user: FixtureUser
): UserEventPayload
export function userEventPayload(
  type: "user.created" | "user.updated" | "user.deleted",
  user: FixtureUser
): UserEventPayload | DeletedUserPayload {
  if (type === "user.deleted") {
    return {
      type,
      object: "event",
      data: { id: user.id, object: "user", deleted: true },
    }
  }
  const emails = (user.emails ?? []).map((email, index) => ({
    id: `idn_${index}`,
    object: "email_address" as const,
    email_address: email.address,
    verification: email.verified
      ? { status: "verified", strategy: "email_code" }
      : { status: "unverified", strategy: "email_code" },
    linked_to: [],
  }))
  return {
    type,
    object: "event",
    data: {
      id: user.id,
      object: "user",
      email_addresses: emails,
      primary_email_address_id: emails[0]?.id ?? null,
      image_url: user.imageUrl ?? "https://img.clerk.com/default",
      has_image: Boolean(user.imageUrl),
    },
  }
}

/** Standard Webhooks headers Clerk sends, signed with a whsec_ secret. */
export function signedHeaders(
  secret: string,
  body: string,
  timestamp = new Date()
): Record<string, string> {
  const id = `msg_${randomUUID()}`
  const signature = new Webhook(secret).sign(id, timestamp, body)
  return {
    "content-type": "application/json",
    "svix-id": id,
    "svix-timestamp": String(Math.floor(timestamp.getTime() / 1000)),
    "svix-signature": signature,
  }
}

export function signedRequest(
  secret: string,
  payload: unknown,
  options?: { url?: string; timestamp?: Date }
): Request {
  const body = typeof payload === "string" ? payload : JSON.stringify(payload)
  return new Request(options?.url ?? "http://localhost/api/webhooks/clerk", {
    method: "POST",
    headers: signedHeaders(secret, body, options?.timestamp),
    body,
  })
}
