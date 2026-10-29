import { describe, expect, it } from "vitest"

import {
  alternatePath,
  isEnglishPath,
  localeFromPathname,
  localizedPath,
  stripLocalePrefix,
} from "@/lib/locale-path"

describe("locale paths", () => {
  it("treats only /en as English", () => {
    expect(localeFromPathname("/")).toBe("es")
    expect(localeFromPathname("/community")).toBe("es")
    expect(localeFromPathname("/consultoria-de-ia-el-salvador")).toBe("es")
    expect(localeFromPathname("/en")).toBe("en")
    expect(localeFromPathname("/en/")).toBe("en")
    expect(localeFromPathname("/en/community")).toBe("en")
    expect(isEnglishPath("/enterprise")).toBe(false)
  })

  it("prefixes English pages and leaves Spanish unprefixed", () => {
    expect(localizedPath("es", "/")).toBe("/")
    expect(localizedPath("es", "/community")).toBe("/community")
    expect(localizedPath("en", "/")).toBe("/en")
    expect(localizedPath("en", "/community")).toBe("/en/community")
    expect(localizedPath("en", "events")).toBe("/en/events")
  })

  it("strips the English prefix and builds the reciprocal path", () => {
    expect(stripLocalePrefix("/en")).toBe("/")
    expect(stripLocalePrefix("/en/community")).toBe("/community")
    expect(stripLocalePrefix("/community")).toBe("/community")
    expect(alternatePath("/community")).toEqual({
      locale: "en",
      path: "/en/community",
    })
    expect(alternatePath("/en/events")).toEqual({
      locale: "es",
      path: "/events",
    })
    expect(alternatePath("/")).toEqual({ locale: "en", path: "/en" })
    expect(alternatePath("/en")).toEqual({ locale: "es", path: "/" })
  })
})
