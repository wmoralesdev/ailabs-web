import { createFileRoute, redirect } from "@tanstack/react-router"

import { isLocale } from "@/content"
import { rememberLocaleFromPrefix } from "@/lib/locale-preference"

/** `/es/community` → `/community`. `/en/…` is a real page. */
export const Route = createFileRoute("/$locale/$")({
  beforeLoad: async ({ params, location }) => {
    if (params.locale !== "es" || !isLocale(params.locale)) {
      return
    }

    await rememberLocaleFromPrefix({ data: { locale: params.locale } })

    const rest = params._splat?.replace(/^\/+|\/+$/g, "") ?? ""
    const href = rest.length > 0 ? `/${rest}` : "/"

    throw redirect({
      href: `${href}${location.searchStr}${location.hash ? `#${location.hash}` : ""}`,
      statusCode: 301,
    })
  },
})
