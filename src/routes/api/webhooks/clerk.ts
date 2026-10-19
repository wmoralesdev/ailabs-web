import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/api/webhooks/clerk")({
  server: {
    handlers: {
      // Loaded per request so page requests do not boot Prisma or Svix.
      POST: async ({ request }) => {
        const { receiveClerkWebhook } =
          await import("@/server/aperture/clerk-webhook.server")
        return receiveClerkWebhook(request)
      },
    },
  },
})
