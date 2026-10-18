/**
 * One indexable page per consulting route. Slugs are the Spanish search term
 * because crawlers without a language receive Spanish. Language stays in the
 * cookie, so English readers get English copy at the same URL.
 */
export const SERVICE_PAGE_PATHS = {
  consulting: "/consultoria-ia-el-salvador",
  training: "/capacitacion-ia-el-salvador",
  automation: "/automatizacion-ia-el-salvador",
} as const

export type ServicePageId = keyof typeof SERVICE_PAGE_PATHS

export const SERVICE_PAGE_IDS = Object.keys(
  SERVICE_PAGE_PATHS
) as ReadonlyArray<ServicePageId>
