import { describe, expect, it } from "vitest"

import { assertSeedTarget, laneEmail, parseLane } from "./dev-seed"

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
