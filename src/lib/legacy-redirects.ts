/** Retired URLs that search still cites, and the live page that replaces each. */
export const LEGACY_REDIRECTS = {
  "/events": "/eventos",
  "/links": "/enlaces",
  "/work-with-us": "/consultoria-de-ia",
  "/partners": "/consultoria-de-ia",
  "/showcase": "/",
  "/blog": "/",
} as const

export type LegacyPath = keyof typeof LEGACY_REDIRECTS
