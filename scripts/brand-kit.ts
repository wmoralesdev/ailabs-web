// Packs the Ai Labs logo files into the brand kit offered on /brand.
//
//   pnpm brand:kit
//
// Run it again whenever one of the files changes;
// src/content/brand-assets.test.ts checks the zip lists exactly these files.
import { execFileSync } from "node:child_process"
import { rmSync } from "node:fs"

import { BRAND_KIT_FILES, BRAND_KIT_PATH } from "../src/content/brand-assets"

const kit = `public${BRAND_KIT_PATH}`
rmSync(kit, { force: true })
// -X drops extra file attributes and -j stores bare names.
execFileSync(
  "zip",
  ["-X", "-j", "-q", kit, ...BRAND_KIT_FILES.map((f) => `public/brand/${f}`)],
  {
    stdio: "inherit",
  }
)
console.log(`${kit}: ${BRAND_KIT_FILES.length} files`)
