import { createFileRoute } from "@tanstack/react-router"

import { shareCardResponse } from "@/server/aperture/share-card.server"

export const Route = createFileRoute("/api/og/u/$username")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const username = decodeURIComponent(
          new URL(request.url).pathname.split("/").pop() ?? ""
        )
        return shareCardResponse(username)
      },
    },
  },
})
