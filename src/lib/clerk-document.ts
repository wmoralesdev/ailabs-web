import { redirect } from "@tanstack/react-router"
import type { ParsedLocation } from "@tanstack/react-router"

declare global {
  interface Window {
    __clerk_init_state?: unknown
  }
}

/**
 * Clerk mounts only on auth routes. Its initial state is written by the server
 * render of an auth route, so arriving from a public page by client navigation
 * reloads the document once to get it. Kept free of Clerk imports: route
 * `beforeLoad` code ships in the entry bundle, unlike route components.
 */
export function ensureClerkDocument({
  location,
}: {
  location: ParsedLocation
}): void {
  if (typeof window === "undefined" || "__clerk_init_state" in window) {
    return
  }
  throw redirect({ href: location.href, reloadDocument: true })
}
