import { verifyWebhook } from "@clerk/tanstack-react-start/webhooks"
import type { WebhookEvent } from "@clerk/tanstack-react-start/webhooks"

import type { ClerkEventResult } from "./member-sync"

/** Verifies the Standard Webhooks signature before any handler sees the payload. */
export async function respondToClerkWebhook(
  request: Request,
  handle: (event: WebhookEvent) => Promise<ClerkEventResult>
): Promise<Response> {
  let event: WebhookEvent
  try {
    event = await verifyWebhook(request)
  } catch {
    return new Response("invalid signature", { status: 400 })
  }
  return Response.json(await handle(event))
}
