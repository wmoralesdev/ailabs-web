import { describe, expect, it } from "vitest"

import { assertSeedTarget, laneEmail, parseLane } from "./dev-seed"
import { SEED_MEMBERS } from "./lib/seed-members"
import { parseProfileInput } from "../src/lib/aperture/profile-input"
import { parseProjectInput } from "../src/lib/aperture/project-input"

describe("seed members", () => {
  it("pass the same validation as the join and project forms", () => {
    for (const { profile, projects } of SEED_MEMBERS) {
      const input = Object.fromEntries(
        Object.entries(profile).map(([key, value]) => [key, value ?? ""])
      )
      const parsed = parseProfileInput(input)
      expect(parsed.ok ? {} : parsed.fieldErrors, profile.username).toEqual({})
      for (const project of projects) {
        const result = parseProjectInput({
          ...project,
          imageKey: null,
          published: true,
        })
        expect(result.ok ? {} : result.fieldErrors, project.title).toEqual({})
      }
    }
  })

  it("use unique usernames and give most members a photo", () => {
    const usernames = new Set(SEED_MEMBERS.map((m) => m.profile.username))
    expect(usernames.size).toBe(SEED_MEMBERS.length)
    const withPhoto = SEED_MEMBERS.filter((m) => m.avatarUrl).length
    expect(withPhoto / SEED_MEMBERS.length).toBeGreaterThan(0.8)
  })
})

describe("dev seed guard", () => {
  it("accepts disposable lane and dev databases", () => {
    expect(() =>
      assertSeedTarget("postgresql://u:p@localhost:5432/lane_ap1_1")
    ).not.toThrow()
    expect(() =>
      assertSeedTarget("postgresql://u:p@localhost:5432/dev_main")
    ).not.toThrow()
  })

  it("refuses the production database name", () => {
    expect(() =>
      assertSeedTarget("postgresql://u:p@ep-x.neon.tech/neondb")
    ).toThrow(
      'Refusing to seed "neondb". Seed only databases named lane_* or dev*.'
    )
  })

  it("targets the Clerk test address for a lane", () => {
    expect(parseLane(["node", "dev-seed.ts", "--lane=7"])).toBe(7)
    expect(parseLane(["node", "dev-seed.ts"])).toBe(1)
    expect(laneEmail(7)).toBe("lane7+clerk_test@example.com")
    expect(() => parseLane(["--lane=0"])).toThrow(
      "--lane must be a positive integer"
    )
  })
})
