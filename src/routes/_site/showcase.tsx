import { createFileRoute, redirect } from "@tanstack/react-router"

import { LEGACY_REDIRECTS } from "@/lib/legacy-redirects"

export const Route = createFileRoute("/_site/showcase")({
  beforeLoad: () => {
    throw redirect({
      href: LEGACY_REDIRECTS["/showcase"],
      statusCode: 301,
    })
  },
})
