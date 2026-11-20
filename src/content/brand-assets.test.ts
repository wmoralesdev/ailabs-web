import { existsSync, readFileSync } from "node:fs"
import { crc32 } from "node:zlib"

import { describe, expect, it } from "vitest"

import { BRAND_KIT_FILES, BRAND_KIT_PATH, BRAND_LOGOS } from "./brand-assets"

type ZipEntry = { name: string; crc: number }

/** Entries of a zip's central directory (signature PK\x01\x02). */
function zipEntries(buffer: Buffer): ZipEntry[] {
  const entries: ZipEntry[] = []
  let at = buffer.indexOf("PK\x01\x02")
  while (at !== -1) {
    const nameLength = buffer.readUInt16LE(at + 28)
    const extraLength = buffer.readUInt16LE(at + 30)
    const commentLength = buffer.readUInt16LE(at + 32)
    entries.push({
      name: buffer.toString("utf8", at + 46, at + 46 + nameLength),
      crc: buffer.readUInt32LE(at + 16),
    })
    at = buffer.indexOf(
      "PK\x01\x02",
      at + 46 + nameLength + extraLength + commentLength
    )
  }
  return entries
}

describe("brand kit", () => {
  it("serves every logo file the page offers", () => {
    const paths = [
      BRAND_LOGOS.lockup.light,
      BRAND_LOGOS.lockup.dark,
      BRAND_LOGOS.mark.light,
      BRAND_LOGOS.mark.dark,
      BRAND_LOGOS.icon,
      BRAND_KIT_PATH,
    ]
    for (const path of paths) {
      expect(existsSync(`public${path}`), path).toBe(true)
    }
  })

  it("zips exactly the Ai Labs artwork, nothing from other brands", () => {
    const entries = zipEntries(readFileSync(`public${BRAND_KIT_PATH}`))
    const names = entries.map((entry) => entry.name)
    expect(names.sort()).toEqual([...BRAND_KIT_FILES].sort())
    expect(names.every((name) => name.startsWith("ailabs-"))).toBe(true)
  })

  it("matches the current artwork; run pnpm brand:kit after changing it", () => {
    for (const { name, crc } of zipEntries(
      readFileSync(`public${BRAND_KIT_PATH}`)
    )) {
      expect(crc, name).toBe(crc32(readFileSync(`public/brand/${name}`)))
    }
  })
})
