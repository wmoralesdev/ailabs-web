import { describe, expect, it } from "vitest"

import { formatMemberNumber } from "./member-number"
import { nextUsernameChange, parseUsername } from "./username"

describe("parseUsername", () => {
  it("lowercases and accepts letters, digits, and underscores", () => {
    expect(parseUsername("Walter")).toEqual({ ok: true, value: "walter" })
    expect(parseUsername(" @new_builder ")).toEqual({
      ok: true,
      value: "new_builder",
    })
  })

  it("rejects reserved names and invalid shapes", () => {
    expect(parseUsername("admin")).toEqual({ ok: false, reason: "reserved" })
    expect(parseUsername("ab")).toEqual({ ok: false, reason: "invalid" })
    expect(parseUsername("has-dash")).toEqual({ ok: false, reason: "invalid" })
    expect(parseUsername("a".repeat(21))).toEqual({
      ok: false,
      reason: "invalid",
    })
  })
})

describe("nextUsernameChange", () => {
  it("allows a change after 30 days", () => {
    const changedAt = new Date("2026-09-01T00:00:00Z")
    expect(nextUsernameChange(null, changedAt)).toBeNull()
    expect(
      nextUsernameChange(changedAt, new Date("2026-09-15T00:00:00Z"))
    ).toEqual(new Date("2026-10-01T00:00:00Z"))
    expect(
      nextUsernameChange(changedAt, new Date("2026-10-02T00:00:00Z"))
    ).toBeNull()
  })
})

describe("formatMemberNumber", () => {
  it("pads to at least three digits", () => {
    expect(formatMemberNumber(0)).toBe("000")
    expect(formatMemberNumber(5)).toBe("005")
    expect(formatMemberNumber(1000)).toBe("1000")
  })
})
