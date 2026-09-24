import { describe, expect, it } from "vitest"

import { en } from "./en"
import { es } from "./es"

describe("aperture join copy", () => {
  it("keeps the Spanish Up For label", () => {
    expect(es.aperture.join.fields.upFor.label).toBe("Me apunto a")
  })

  it("shares the same role and up-for keys", () => {
    expect(Object.keys(es.aperture.join.roleOptions)).toEqual(
      Object.keys(en.aperture.join.roleOptions)
    )
    expect(Object.keys(es.aperture.join.upForOptions)).toEqual(
      Object.keys(en.aperture.join.upForOptions)
    )
  })
})
