import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/api/og/u/$username")({
  server: {
    handlers: {
      // Loaded per request: satori, resvg, and Prisma must stay out of the
      // router chunk that every page request boots.
      GET: async ({ request }) => {
        const { shareCardResponse } =
          await import("@/server/aperture/share-card.server")
        const username = decodeURIComponent(
          new URL(request.url).pathname.split("/").pop() ?? ""
        )
        return shareCardResponse(username)
      },
    },
  },
})
