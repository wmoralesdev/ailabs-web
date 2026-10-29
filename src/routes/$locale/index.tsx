import { createFileRoute, redirect } from "@tanstack/react-router"

import { isLocale } from "@/content"
import { rememberLocaleFromPrefix } from "@/lib/locale-preference"

/** `/es` → `/`. `/en` is a real page, handled by `/en/`. */
export const Route = createFileRoute("/$locale/")({
  beforeLoad: async ({ params, location }) => {
    if (params.locale !== "es" || !isLocale(params.locale)) {
      return
    }

    await rememberLocaleFromPrefix({ data: { locale: params.locale } })

    throw redirect({
      href: `/${location.searchStr}${location.hash ? `#${location.hash}` : ""}`,
      statusCode: 301,
    })
  },
})
