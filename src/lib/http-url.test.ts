import { describe, expect, it } from "vitest"

import { isHttpUrl, toHttpUrl } from "./http-url"

describe("toHttpUrl", () => {
  it("accepts the Instagram mobile share link", () => {
    const href =
      "https://www.instagram.com/wmoralesdev?igsh=bW5iZ2V1M2dkeTQ3&utm_source=qr"
    expect(toHttpUrl(href)).toBe(href)
    expect(isHttpUrl(href)).toBe(true)
  })

  it("treats empty and whitespace as absent", () => {
    expect(toHttpUrl("")).toBeUndefined()
    expect(toHttpUrl("   ")).toBeUndefined()
    expect(isHttpUrl("")).toBe(false)
  })

  it("coerces scheme-less and @handle pastes", () => {
    expect(toHttpUrl("instagram.com/wmoralesdev")).toBe(
      "https://instagram.com/wmoralesdev"
    )
    expect(toHttpUrl("@wmoralesdev", { host: "instagram.com" })).toBe(
      "https://instagram.com/wmoralesdev"
    )
  })

  it("rejects bare handles without a host hint", () => {
    expect(toHttpUrl("@wmoralesdev")).toBeUndefined()
    expect(isHttpUrl("@wmoralesdev")).toBe(false)
  })
})
