import { describe, expect, it } from "vitest"

import { parseProfileInput } from "./profile-input"

const valid = {
  username: "Walter",
  displayName: " Walter Morales ",
  headline: "Founder, Ai Labs",
  countryCode: "sv",
  role: "FOUNDER",
  upFor: ["MENTORING", "COLLABORATING"],
}

describe("parseProfileInput", () => {
  it("returns a normalized draft for valid input", () => {
    expect(parseProfileInput(valid)).toEqual({
      ok: true,
      draft: {
        username: "walter",
        displayName: "Walter Morales",
        headline: "Founder, Ai Labs",
        bio: null,
        countryCode: "SV",
        city: null,
        role: "FOUNDER",
        upFor: ["MENTORING", "COLLABORATING"],
        showEvents: false,
        linkedinUrl: null,
        xUrl: null,
        githubUrl: null,
        websiteUrl: null,
        instagramUrl: null,
      },
    })
  })

  it("reports each field that fails", () => {
    expect(
      parseProfileInput({
        ...valid,
        headline: "h".repeat(81),
        websiteUrl: "ftp://example.com",
      })
    ).toEqual({
      ok: false,
      fieldErrors: { headline: "too_long", websiteUrl: "invalid" },
    })
  })

  it("rejects missing, unknown, and reserved values", () => {
    expect(
      parseProfileInput({
        username: "admin",
        countryCode: "XX",
        role: "CEO",
        upFor: ["HIRING", "PARTYING"],
      })
    ).toEqual({
      ok: false,
      fieldErrors: {
        username: "reserved",
        displayName: "required",
        headline: "required",
        countryCode: "invalid",
        role: "invalid",
        upFor: "invalid",
      },
    })
    expect(parseProfileInput(null)).toMatchObject({
      ok: false,
      fieldErrors: { username: "required", role: "required" },
    })
  })
})
