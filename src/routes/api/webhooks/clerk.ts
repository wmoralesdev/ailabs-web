import { createFileRoute } from "@tanstack/react-router"

import { receiveClerkWebhook } from "@/server/aperture/clerk-webhook.server"

export const Route = createFileRoute("/api/webhooks/clerk")({
  server: {
    handlers: {
      POST: ({ request }) => receiveClerkWebhook(request),
    },
  },
})
