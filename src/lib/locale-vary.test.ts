import { readFileSync } from "node:fs"

import { describe, expect, it } from "vitest"

import { LOCALE_VARY } from "@/lib/locale-vary"

describe("locale Vary header", () => {
  it("sets Accept-Language on document responses", () => {
    const start = readFileSync("src/start.ts", "utf8")
    expect(LOCALE_VARY).toBe("Accept-Language")
    expect(start).toContain('setResponseHeader("Vary", LOCALE_VARY)')
    expect(start).toContain("localeVaryMiddleware")
  })
})
