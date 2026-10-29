import { createFileRoute, notFound, redirect } from "@tanstack/react-router"

import { isLocale } from "@/content"
import { aliasRedirectHref } from "@/lib/search-aliases"

/**
 * `/es` still 301s to the unprefixed Spanish URL. `/en` is a real prefix
 * handled by `src/routes/en`. Search aliases (one segment in) 301 here when
 * they are not a locale. Unknown segments stay a 404.
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
