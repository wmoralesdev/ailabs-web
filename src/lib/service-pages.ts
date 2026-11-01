/**
 * Indexable service pages. Slugs are the Spanish search term; Spanish is
 * served at these paths and English under `/en` + the same slug. The three
 * pages share `src/components/marketing/service-page.tsx`.
 */
export const SERVICE_PAGE_PATHS = {
  consulting: "/consultoria-de-ia-el-salvador",
  automation: "/automatizacion-ia-el-salvador",
  training: "/capacitacion-ia-el-salvador",
} as const

export type ServicePageId = keyof typeof SERVICE_PAGE_PATHS

export const SERVICE_PAGE_IDS = Object.keys(
  SERVICE_PAGE_PATHS
) as ReadonlyArray<ServicePageId>

export const CONSULTING_PAGE_PATH = SERVICE_PAGE_PATHS.consulting
