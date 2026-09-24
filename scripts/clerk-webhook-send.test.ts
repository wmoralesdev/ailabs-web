import { describe, expect, it } from "vitest"

import { parseSendArgs } from "./clerk-webhook-send"

describe("parseSendArgs", () => {
  it("reads the event type, user, and optional count", () => {
    expect(
      parseSendArgs([
        "node",
        "clerk-webhook-send.ts",
        "user.deleted",
        "--user=user_lane_a",
      ])
    ).toEqual({
      type: "user.deleted",
      user: "user_lane_a",
      count: 1,
      minutesAgo: 0,
    })
    expect(
      parseSendArgs([
        "user.updated",
        "--user=user_a",
        "--count=50",
        "--minutes-ago=10",
      ])
    ).toEqual({
      type: "user.updated",
      user: "user_a",
      count: 50,
      minutesAgo: 10,
    })
  })

  it("requires a supported event and a user", () => {
    expect(() => parseSendArgs(["--user=user_a"])).toThrow(/Usage/)
    expect(() => parseSendArgs(["user.deleted"])).toThrow("--user is required")
  })
})
