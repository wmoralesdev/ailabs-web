import { describe, expect, it } from "vitest"

import { parseJoinMode } from "./join-mode"

describe("parseJoinMode", () => {
  it("keeps production closed while legal text is a draft", () => {
    expect(parseJoinMode("open", "production", "draft")).toBe("closed")
  })

  it("opens preview deployments even while legal text is a draft", () => {
    expect(parseJoinMode("preview", "preview", "draft")).toBe("open")
  })

  it("keeps production closed when join is only in preview", () => {
    expect(parseJoinMode("preview", "production", "published")).toBe("closed")
  })

  it("opens production when join is open and legal text is published", () => {
    expect(parseJoinMode("open", "production", "published")).toBe("open")
  })

  it("stays closed when the env flag is unset or closed", () => {
    expect(parseJoinMode(undefined, "preview", "published")).toBe("closed")
    expect(parseJoinMode("closed", "preview", "published")).toBe("closed")
  })
})
