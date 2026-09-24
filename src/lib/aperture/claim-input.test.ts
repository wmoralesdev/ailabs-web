import { describe, expect, it } from "vitest"

import { parseClaimForm } from "./claim-input"

const valid = {
  username: "walter",
  displayName: "Walter Morales",
  headline: "Founder, Ai Labs",
  countryCode: "SV",
  role: "FOUNDER",
  upFor: ["MENTORING"],
  acceptLegal: true,
  acceptAge: true,
  marketing: false,
  locale: "en",
}

describe("parseClaimForm", () => {
  it("accepts a complete claim with optional newsletter off", () => {
    expect(parseClaimForm(valid)).toMatchObject({
      ok: true,
      marketing: false,
      locale: "en",
      profile: { username: "walter", role: "FOUNDER" },
    })
  })

  it("requires Terms, Privacy, and the age declaration after the profile", () => {
    expect(parseClaimForm({ ...valid, acceptLegal: false })).toEqual({
      ok: false,
      status: "consent_required",
    })
    expect(parseClaimForm({ ...valid, acceptAge: false })).toEqual({
      ok: false,
      status: "consent_required",
    })
  })

  it("reports profile errors before consent", () => {
    expect(parseClaimForm({ acceptLegal: false })).toMatchObject({
      ok: false,
      status: "invalid",
      fieldErrors: { username: "required" },
    })
  })

  it("records the newsletter choice when it is checked", () => {
    expect(parseClaimForm({ ...valid, marketing: true })).toMatchObject({
      ok: true,
      marketing: true,
    })
  })
})
