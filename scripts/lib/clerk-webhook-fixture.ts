import { randomUUID } from "node:crypto"
import { Webhook } from "standardwebhooks"

export type FixtureUser = {
  id: string
  emails?: ReadonlyArray<{ address: string; verified: boolean }>
  imageUrl?: string | null
}

export function userEventPayload(
  type: "user.created" | "user.updated" | "user.deleted",
  user: FixtureUser
) {
  if (type === "user.deleted") {
    return { type, object: "event", data: { id: user.id, object: "user", deleted: true } }
  }
  const emails = (user.emails ?? []).map((email, index) => ({
    id: `idn_${index}`,
    object: "email_address",
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
