import { describe, expect, it } from "vitest"

import { parseProjectInput, slugFromTitle } from "./project-input"

const valid = {
  title: "Lane notes",
  summary: "A notes app for builders.",
  url: "https://example.com",
  repoUrl: null,
  published: true,
  builtWith: [
    { name: "Cursor", percent: 70 },
    { name: "Claude", percent: 30 },
  ],
}

describe("slugFromTitle", () => {
  it("slugifies a title", () => {
    expect(slugFromTitle("Lane Notes")).toBe("lane-notes")
    expect(slugFromTitle("  ")).toBe("project")
  })
})

describe("parseProjectInput", () => {
  it("accepts a complete project", () => {
    expect(parseProjectInput(valid)).toEqual({ ok: true, draft: valid })
  })

  it("requires title, summary, and a 100% built-with split", () => {
    expect(parseProjectInput({ ...valid, title: "" })).toMatchObject({
      ok: false,
      fieldErrors: { title: "required" },
    })
    expect(
      parseProjectInput({
        ...valid,
        builtWith: [{ name: "Cursor", percent: 40 }],
      })
    ).toMatchObject({
      ok: false,
      fieldErrors: { builtWith: "sum" },
    })
    expect(parseProjectInput({ ...valid, url: "not-a-url" })).toMatchObject({
      ok: false,
      fieldErrors: { url: "invalid" },
    })
  })
})
