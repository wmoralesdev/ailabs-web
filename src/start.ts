import { clerkMiddleware } from "@clerk/tanstack-react-start/server"
import {
  createCsrfMiddleware,
  createMiddleware,
  createStart,
} from "@tanstack/react-start"

import { aliasRedirectHref } from "@/lib/search-aliases"

const csrfMiddleware = createCsrfMiddleware({
  filter: (context) => context.handlerType === "serverFn",
})

/** Same 301 for every client. Aliases are not a second document. */
const searchAliasMiddleware = createMiddleware().server(
  ({ pathname, request, next, handlerType }) => {
    if (handlerType === "serverFn") {
      return next()
    }
    const href = aliasRedirectHref(pathname, new URL(request.url).search)
    if (!href) {
      return next()
    }
    return new Response(null, {
      status: 301,
      headers: { location: href },
    })
  }
)

export const startInstance = createStart(() => {
  return {
    // Browser server functions require same-origin requests. API routes such
    // as Wompi webhooks keep their own verification and are not intercepted.
    requestMiddleware: [
      searchAliasMiddleware,
      csrfMiddleware,
      clerkMiddleware(),
    ],
  }
})
