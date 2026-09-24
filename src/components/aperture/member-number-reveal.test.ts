import { describe, expect, it } from "vitest"

import { pickRevealTreatment } from "./member-number-reveal"

describe("pickRevealTreatment", () => {
  it("alternates hold and count by member number", () => {
    expect(pickRevealTreatment(6)).toBe("hold")
    expect(pickRevealTreatment(5)).toBe("count")
  })
})
