import { describe, expect, it } from "vitest"

import { en } from "./en"
import { es } from "./es"

const TERMS_IDS = [
  "about",
  "eligibility",
  "membership",
  "profile",
  "projects",
  "conduct",
  "moderation",
  "credits",
  "newsletter",
  "termination",
  "liability",
  "changes",
  "law",
]

const PRIVACY_IDS = [
  "controller",
  "data-we-collect",
  "how-we-use",
  "public-data",
  "consent",
  "processors",
  "retention",
  "data-rights",
  "security",
  "minors",
  "changes",
]

describe("legal documents", () => {
  it.each([en, es])("keep the same section ids in $locale", (content) => {
    expect(content.legal.terms.sections.map(({ id }) => id)).toEqual(TERMS_IDS)
    expect(content.legal.privacy.sections.map(({ id }) => id)).toEqual(
      PRIVACY_IDS
    )
  })

  it("share one version and status across locales", () => {
    expect(en.legal.version).toBe("2026-10-draft")
    expect(es.legal.version).toBe(en.legal.version)
    expect(es.legal.status).toBe(en.legal.status)
    expect(es.legal.updatedOn).toBe(en.legal.updatedOn)
  })
})
