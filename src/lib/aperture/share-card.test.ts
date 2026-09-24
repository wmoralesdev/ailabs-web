import { describe, expect, it } from "vitest"

import { shareCardAlt, shareCardModel, shareCardPath } from "./share-card"

describe("share-card", () => {
  it("formats the member card model and path", () => {
    const model = shareCardModel({
      number: 5,
      displayName: "Walter Morales",
      headline: "Building with AI",
      username: "walter",
    })
    expect(model).toEqual({
      number: "005",
      displayName: "Walter Morales",
      headline: "Building with AI",
      username: "walter",
    })
    expect(shareCardPath(model.username)).toBe("/api/og/u/walter")
    expect(shareCardAlt("{name} · Aperture member #{number}", model)).toBe(
      "Walter Morales · Aperture member #005"
    )
  })
})
