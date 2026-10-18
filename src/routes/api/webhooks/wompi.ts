import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/api/webhooks/wompi")({
  server: {
    handlers: {
      // Loaded per request so page requests do not boot Prisma.
      POST: async ({ request }) => {
        const { applyWompiWebhook } =
          await import("@/server/wompi-webhook.server")
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
