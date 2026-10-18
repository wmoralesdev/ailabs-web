import { createFileRoute, notFound, redirect } from "@tanstack/react-router"

import { isLocale } from "@/content"
import { aliasRedirectHref } from "@/lib/search-aliases"

/**
 * Legacy `/en` and `/es` prefixes 301 to the unprefixed URL.
 * Search aliases are the same kind of redirect: one segment in, the real page out.
 * Unknown segments stay a 404. This does not add a page.
 */
export const Route = createFileRoute("/$locale")({
  beforeLoad: ({ params, location }) => {
    if (isLocale(params.locale)) {
      return
    }

    const href = aliasRedirectHref(
      `/${params.locale}`,
      location.searchStr,
      location.hash
    )
    if (!href) {
      throw notFound()
    }

    throw redirect({
      href,
      statusCode: 301,
    })
  },
})
