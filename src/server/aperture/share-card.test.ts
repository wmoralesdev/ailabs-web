import { describe, expect, it } from "vitest"

import { renderShareCardPng } from "./share-card"

describe("renderShareCardPng", () => {
  it("renders a PNG share card", async () => {
    const png = await renderShareCardPng({
      number: "005",
      displayName: "Walter Morales",
      headline: "Building with AI",
      username: "walter",
    })
    expect(png.byteLength).toBeGreaterThan(1000)
    expect(png[0]).toBe(0x89)
    expect(png[1]).toBe(0x50)
    expect(png[2]).toBe(0x4e)
    expect(png[3]).toBe(0x47)
  })
})
