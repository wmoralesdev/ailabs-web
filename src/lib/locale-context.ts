import { useRouterState } from "@tanstack/react-router"

import { getContent } from "@/content"
import type { LocaleContext } from "@/lib/locale-preference"

const FALLBACK: LocaleContext = {
  locale: "es",
  content: getContent("es"),
}

function isLocaleContext(value: unknown): value is LocaleContext {
  if (!value || typeof value !== "object") {
    return false
  }
  return "locale" in value && "content" in value
}

/** Locale and copy from the matching route. Safe to use from any page. */
export function useLocaleContext(): LocaleContext {
  return useRouterState({
    select: (state) => {
      const match = state.matches.find((entry) =>
        isLocaleContext(entry.context)
      )
      return isLocaleContext(match?.context) ? match.context : FALLBACK
    },
  })
}
