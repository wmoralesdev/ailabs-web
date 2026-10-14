import { describe, expect, it } from "vitest"

import { LEGACY_REDIRECTS } from "@/lib/legacy-redirects"

describe("legacy redirects", () => {
  it("sends retired paths to a live page", () => {
    expect(LEGACY_REDIRECTS).toEqual({
      "/events": "/eventos",
      "/links": "/enlaces",
      "/work-with-us": "/consultoria-de-ia",
      "/partners": "/consultoria-de-ia",
      "/showcase": "/",
      "/blog": "/",
    })
  })
})
