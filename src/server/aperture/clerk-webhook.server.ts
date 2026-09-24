import { prisma } from "@/lib/prisma"
import { respondToClerkWebhook } from "./clerk-webhook"
import { handleClerkEvent } from "./member-sync"

/** Server-only so Prisma never enters the client route graph. */
export function receiveClerkWebhook(request: Request): Promise<Response> {
  return respondToClerkWebhook(request, (event) =>
    handleClerkEvent(prisma, event)
  )
}
