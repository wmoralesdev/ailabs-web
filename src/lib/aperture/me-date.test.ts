import { describe, expect, it } from "vitest"

import { formatMeDate, toIso } from "./me-date"

describe("formatMeDate", () => {
  it("formats the same UTC calendar day in both locales", () => {
    expect(formatMeDate("2026-10-01T00:00:00.000Z", "en")).toBe("Oct 1, 2026")
    expect(formatMeDate("2026-10-01T00:00:00.000Z", "es")).toMatch(/2026/)
  })
})

describe("toIso", () => {
  it("serializes dates and leaves null empty", () => {
    expect(toIso(null)).toBeNull()
    expect(toIso(new Date("2026-10-01T00:00:00.000Z"))).toBe(
      "2026-10-01T00:00:00.000Z"
    )
  })
})
