import type { Locale } from "@/content"

/**
 * Indexable URLs that return one language with status 200.
 * Spanish slugs stay unprefixed. English twins use an English slug, not `/en`,
 * because `/en/*` still 301s to the unprefixed path.
 */
export const LANGUAGE_PAIRS = [
  { es: "/consultoria-de-ia", en: "/ai-consulting-el-salvador" },
  { es: "/capacitacion-ia", en: "/ai-training-el-salvador" },
  { es: "/automatizacion-con-ia", en: "/ai-automation-el-salvador" },
  { es: "/eventos", en: "/tech-events-el-salvador" },
  { es: "/comunidad-de-ia-el-salvador", en: "/ai-community-el-salvador" },
  {
    es: "/comunidad-de-ia-centroamerica",
    en: "/ai-community-central-america",
  },
  { es: "/eventos-tech-centroamerica", en: "/tech-events-central-america" },
  {
    es: "/consultoria-de-ia-centroamerica",
    en: "/ai-consulting-central-america",
  },
] as const

export type LanguagePair = (typeof LANGUAGE_PAIRS)[number]

function normalizePath(path: string): string {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1)
  }
  return path
}

export function alternatesFor(
  path: string
): { es: string; en: string } | undefined {
  const normalized = normalizePath(path)
  return LANGUAGE_PAIRS.find(
    (pair) => pair.es === normalized || pair.en === normalized
  )
}

/** The other language's URL when this path is one side of a pair. */
export function alternatePath(
  path: string,
  locale: Locale
): string | undefined {
  return alternatesFor(path)?.[locale]
}
