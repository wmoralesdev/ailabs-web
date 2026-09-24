import { describe, expect, it } from "vitest"

import {
  buildProjectImageKey,
  isOwnedProjectImageKey,
  isProjectImageType,
  parseProjectImageKey,
  projectImageUrl,
} from "./project-image"

describe("project-image", () => {
  it("accepts jpeg, png, and webp only", () => {
    expect(isProjectImageType("image/png")).toBe(true)
    expect(isProjectImageType("image/svg+xml")).toBe(false)
  })

  it("builds and owns keys per member", () => {
    const key = buildProjectImageKey(5, "image/webp", "abc12345")
    expect(key).toBe("projects/5/abc12345.webp")
    expect(parseProjectImageKey(key)).toEqual({ memberNumber: 5 })
    expect(isOwnedProjectImageKey(key, 5)).toBe(true)
    expect(isOwnedProjectImageKey(key, 6)).toBe(false)
    expect(isOwnedProjectImageKey("../etc/passwd", 5)).toBe(false)
  })

  it("joins the public base to the key", () => {
    expect(
      projectImageUrl("https://media.example.com/", "projects/5/a.webp")
    ).toBe("https://media.example.com/projects/5/a.webp")
    expect(projectImageUrl(null, "projects/5/a.webp")).toBeNull()
  })
})
