import { stripLocalePrefix } from "@/lib/locale-path"

/**
 * Routes that render Clerk UI or read the session while server-rendering.
 * Public landing pages stay outside this list so they never authenticate the
 * request on the server or download Clerk in the browser.
 */
export const CLERK_ROUTE_PREFIXES = ["/redeem", "/sign-in", "/sign-up"] as const

export function isClerkPath(pathname: string): boolean {
  const path = stripLocalePrefix(pathname)
  return CLERK_ROUTE_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`)
  )
}

/** Server functions always get Clerk: the session is read inside handlers. */
export function needsClerkMiddleware(
  pathname: string,
  handlerType: string
): boolean {
  return handlerType === "serverFn" || isClerkPath(pathname)
}
