import { createFileRoute, notFound } from "@tanstack/react-router"

import { isLocale } from "@/content"

/**
 * Legacy locale prefix layout. Exact `/en`|/`es` and deeper paths are handled
 * by child routes that set the cookie and 301 to the unprefixed URL.
 */
export const Route = createFileRoute("/$locale")({
  beforeLoad: ({ params }) => {
    if (!isLocale(params.locale)) {
      throw notFound()
    }
  },
})
