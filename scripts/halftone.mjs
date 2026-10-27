// Prints the event photos in public/carousel as halftone dot masks.
//
//   public/halftone/<name>.webp   alpha mask of dots, coloured in CSS with mask-image
//
// Dark areas print big dots and light areas small ones, on an offset grid like
// a newspaper screen. HalftonePhoto colours the mask with the text colour and
// develops into the real photo on hover.
//
// Run with `pnpm halftone` whenever a photo in public/carousel changes.
import { mkdir, readdir } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const ROOT = path.resolve(import.meta.dirname, "..")
const SRC = path.join(ROOT, "public/carousel")
const OUT = path.join(ROOT, "public/halftone")

/** Mask width in pixels. */
const WIDTH = 1200
/** Pixels per dot cell. */
const CELL = 6

async function luminanceGrid(file, cols) {
  const meta = await sharp(file).metadata()
  const rows = Math.round((cols * meta.height) / meta.width)
  const { data } = await sharp(file)
    .resize(cols, rows, { fit: "fill" })
    .grayscale()
    .normalise()
    .raw()
    .toBuffer({ resolveWithObject: true })
  return { cols, rows, data }
}

function dotsSvg({ cols, rows, data }) {
  const w = cols * CELL
  const h = rows * CELL
  let circles = ""
  for (let y = 0; y < rows; y++) {
    const offset = y % 2 ? CELL / 2 : 0
    for (let x = 0; x < cols; x++) {
      const lum = data[y * cols + x] / 255
      const r = (1 - lum) ** 1.15 * CELL * 0.62
      if (r < 0.45) continue
      const cx = (x * CELL + CELL / 2 + offset).toFixed(1)
      const cy = (y * CELL + CELL / 2).toFixed(1)
      circles += `<circle cx="${cx}" cy="${cy}" r="${r.toFixed(2)}"/>`
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><g fill="#000">${circles}</g></svg>`
}

await mkdir(OUT, { recursive: true })

const files = (await readdir(SRC)).filter((f) => f.endsWith(".webp"))
for (const name of files) {
  const grid = await luminanceGrid(path.join(SRC, name), WIDTH / CELL)
  await sharp(Buffer.from(dotsSvg(grid)))
    .webp({ quality: 60, alphaQuality: 55, effort: 6 })
    .toFile(path.join(OUT, name))
  console.log(`halftone: ${name}`)
}
