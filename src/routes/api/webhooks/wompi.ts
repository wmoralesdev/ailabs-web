import { createFileRoute } from "@tanstack/react-router"

import { applyWompiWebhook } from "@/server/wompi-webhook.server"

export const Route = createFileRoute("/api/webhooks/wompi")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const rawBody = await request.text()
        const headerHash =
          request.headers.get("wompi_hash") ?? request.headers.get("Wompi_Hash")

        const result = await applyWompiWebhook(rawBody, headerHash)

        return new Response(result.ok ? "ok" : "rejected", {
          status: result.status,
          headers: { "content-type": "text/plain; charset=utf-8" },
        })
      },
    },
  },
})
