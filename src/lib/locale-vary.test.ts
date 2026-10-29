import { readFileSync } from "node:fs"

import { describe, expect, it } from "vitest"

describe("locale Vary header", () => {
  it("does not vary documents by Accept-Language", () => {
    const start = readFileSync("src/start.ts", "utf8")
    expect(start).not.toContain("localeVaryMiddleware")
    expect(start).not.toContain("Accept-Language")
    expect(start).not.toContain("setResponseHeader")
  })
})
