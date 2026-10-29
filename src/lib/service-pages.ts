/**
 * Indexable pages per delivery route. Slugs are the Spanish search term.
 * Spanish is served at these paths; English is served under `/en` + the same slug.
 */
export const SERVICE_PAGE_PATHS = {
  training: "/capacitacion-ia-el-salvador",
  automation: "/automatizacion-ia-el-salvador",
} as const

export type ServicePageId = keyof typeof SERVICE_PAGE_PATHS

export const SERVICE_PAGE_IDS = Object.keys(
  SERVICE_PAGE_PATHS
) as ReadonlyArray<ServicePageId>

/** The consulting page lives in `src/components/consulting`. */
export const CONSULTING_PAGE_PATH = "/consultoria-de-ia-el-salvador"
