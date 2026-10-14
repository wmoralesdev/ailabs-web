import { describe, expect, it } from "vitest"

import { alternatePath, alternatesFor, LANGUAGE_PAIRS } from "./language-pairs"

describe("language pairs", () => {
  it("points each side at the same pair and skips unknown paths", () => {
    for (const pair of LANGUAGE_PAIRS) {
      expect(alternatesFor(pair.es)).toEqual(pair)
      expect(alternatesFor(pair.en)).toEqual(pair)
      expect(alternatePath(pair.es, "en")).toBe(pair.en)
      expect(alternatePath(`${pair.en}/`, "es")).toBe(pair.es)
    }
    expect(alternatesFor("/")).toBeUndefined()
    expect(alternatesFor("/enlaces")).toBeUndefined()
    expect(alternatesFor("/community")).toBeUndefined()
  })
})
