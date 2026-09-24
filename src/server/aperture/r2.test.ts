import { describe, expect, it } from "vitest"

import { presignProjectImagePut, readR2Config } from "./r2"

describe("readR2Config", () => {
  it("returns null when any credential is missing", () => {
    expect(readR2Config({})).toBeNull()
    expect(
      readR2Config({
        R2_ACCOUNT_ID: "a",
        R2_ACCESS_KEY_ID: "b",
        R2_SECRET_ACCESS_KEY: "c",
        R2_BUCKET_NAME: "d",
      })
    ).toBeNull()
  })
})

describe("presignProjectImagePut", () => {
  it("stays unavailable without R2 credentials", async () => {
    const previous = process.env.R2_ACCOUNT_ID
    delete process.env.R2_ACCOUNT_ID
    const result = await presignProjectImagePut(
      5,
      "image/png",
      1024,
      "abc12345"
    )
    expect(result).toEqual({ status: "unavailable" })
    if (previous) {
      process.env.R2_ACCOUNT_ID = previous
    }
  })
})
