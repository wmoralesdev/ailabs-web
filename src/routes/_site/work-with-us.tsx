import { createFileRoute, redirect } from "@tanstack/react-router"

import { LEGACY_REDIRECTS } from "@/lib/legacy-redirects"

export const Route = createFileRoute("/_site/work-with-us")({
  beforeLoad: () => {
    throw redirect({
      href: LEGACY_REDIRECTS["/work-with-us"],
      statusCode: 301,
    })
  },
})
