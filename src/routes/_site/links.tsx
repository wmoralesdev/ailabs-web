import { createFileRoute, redirect } from "@tanstack/react-router"

import { LEGACY_REDIRECTS } from "@/lib/legacy-redirects"

export const Route = createFileRoute("/_site/links")({
  beforeLoad: () => {
    throw redirect({
      href: LEGACY_REDIRECTS["/links"],
      statusCode: 301,
    })
  },
})
