import { describe, expect, it } from "vitest"

import { localeFromAcceptLanguage } from "@/content"

describe("localeFromAcceptLanguage", () => {
  it("serves Spanish when the request has no language header", () => {
    expect(localeFromAcceptLanguage(null)).toBe("es")
    expect(localeFromAcceptLanguage(undefined)).toBe("es")
    expect(localeFromAcceptLanguage("")).toBe("es")
    expect(localeFromAcceptLanguage("   ")).toBe("es")
  })

  it("serves Spanish for a wildcard or an unrecognized language", () => {
    expect(localeFromAcceptLanguage("*")).toBe("es")
    expect(localeFromAcceptLanguage("fr-FR,fr;q=0.9")).toBe("es")
  })

  it("keeps an explicit English preference", () => {
    expect(localeFromAcceptLanguage("en-US,en;q=0.9")).toBe("en")
    expect(localeFromAcceptLanguage("en;q=0.9,es;q=0.4")).toBe("en")
  })

  it("prefers Spanish when the header ranks it first", () => {
    expect(localeFromAcceptLanguage("es-SV,es;q=0.9,en;q=0.5")).toBe("es")
  })
})
