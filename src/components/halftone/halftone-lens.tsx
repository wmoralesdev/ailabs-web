import { useEffect, useRef } from "react"

import { onThemeChange } from "@/lib/theme-change"
import { cn } from "@/lib/utils"

type HalftoneLensProps = {
  /** Path of a same-origin photo, e.g. `/carousel/23.webp`. */
  src: string
  alt: string
  width: number
  height: number
  sizes: string
  className?: string
  style?: React.CSSProperties
  priority?: boolean
}

/** Dot pitch inside the lens, in CSS pixels. */
const CELL = 7

function smoothstep(a: number, b: number, v: number) {
  const t = Math.min(Math.max((v - a) / (b - a), 0), 1)
  return t * t * (3 - 2 * t)
}

/**
 * A real photograph that stays a photograph. Under the pointer a round
 * halftone lens opens and trails the cursor on a spring, reprinting that part
 * of the photo as dots in the brand inks; it closes when the pointer leaves.
 * On touch screens a tap opens it where the finger lands.
 *
 * Inks come from `--ht-paper` and `--ht-ink` on the element. Never animates
 * under reduced motion; the photo is untouched without JavaScript.
 */
function HalftoneLens({
  src,
  alt,
  width,
  height,
  sizes,
  className,
  style,
  priority = false,
}: HalftoneLensProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!wrap || !canvas || !ctx) return
    if (
      typeof window.matchMedia !== "function" ||
      typeof ResizeObserver !== "function"
    ) {
      return
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")

    let w = 0
    let h = 0
    let cols = 0
    let rows = 0
    let lum: Uint8ClampedArray | null = null
    let image: HTMLImageElement | null = null
    let paper = ""
    let ink = ""
    let raf = 0
    let open = 0
    let target = 0
    const pointer = { x: 0, y: 0 }
    const lens = { x: 0, y: 0 }

    function readColors() {
      const computed = getComputedStyle(wrap as HTMLElement)
      paper = computed.getPropertyValue("--ht-paper").trim() || "#fff"
      ink = computed.getPropertyValue("--ht-ink").trim() || "#000"
    }

    /** Luminance per cell of the photo as it is cropped on screen. */
    function sample() {
      if (!image || !image.naturalWidth || !cols || !rows) return
      const off = document.createElement("canvas")
      off.width = cols
      off.height = rows
      const octx = off.getContext("2d", { willReadFrequently: true })
      if (!octx) return
      const scale = Math.max(
        cols / image.naturalWidth,
        rows / image.naturalHeight
      )
      const iw = image.naturalWidth * scale
      const ih = image.naturalHeight * scale
      octx.filter = "grayscale(1) contrast(1.15)"
      octx.drawImage(image, (cols - iw) / 2, (rows - ih) / 2, iw, ih)
      const data = octx.getImageData(0, 0, cols, rows).data
      lum = new Uint8ClampedArray(cols * rows)
      for (let i = 0; i < cols * rows; i++) lum[i] = data[i * 4]
    }

    function resize() {
      if (!canvas || !ctx || !wrap) return
      w = wrap.clientWidth
      h = wrap.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(w / CELL)
      rows = Math.ceil(h / CELL)
      sample()
    }

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, w, h)
      if (open < 0.01 || !lum) return
      const radius = Math.min(w, h) * 0.34 * open
      const edge = radius * 0.78
      const grad = ctx.createRadialGradient(
        lens.x,
        lens.y,
        edge,
        lens.x,
        lens.y,
        radius
      )
      grad.addColorStop(0, paper)
      grad.addColorStop(1, "transparent")
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(lens.x, lens.y, radius, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = ink
      ctx.beginPath()
      const c0 = Math.max(0, Math.floor((lens.x - radius) / CELL))
      const c1 = Math.min(cols - 1, Math.ceil((lens.x + radius) / CELL))
      const r0 = Math.max(0, Math.floor((lens.y - radius) / CELL))
      const r1 = Math.min(rows - 1, Math.ceil((lens.y + radius) / CELL))
      for (let row = r0; row <= r1; row++) {
        const shift = row % 2 ? CELL / 2 : 0
        const y = (row + 0.5) * CELL
        for (let col = c0; col <= c1; col++) {
          const x = (col + 0.5) * CELL + shift
          const d = Math.hypot(x - lens.x, y - lens.y)
          if (d > radius) continue
          const fade = smoothstep(radius, edge, d)
          const dark = 1 - lum[row * cols + col] / 255
          const r = dark ** 1.1 * CELL * 0.6 * fade
          if (r < 0.35) continue
          ctx.moveTo(x + r, y)
          ctx.arc(x, y, r, 0, Math.PI * 2)
        }
      }
      ctx.fill()
    }

    function frame() {
      raf = 0
      lens.x += (pointer.x - lens.x) * 0.2
      lens.y += (pointer.y - lens.y) * 0.2
      open += (target - open) * 0.16
      draw()
      const settled =
        Math.abs(target - open) < 0.005 &&
        Math.hypot(pointer.x - lens.x, pointer.y - lens.y) < 0.5
      if (!settled) raf = requestAnimationFrame(frame)
    }

    function wake() {
      if (!raf) raf = requestAnimationFrame(frame)
    }

    function place(event: PointerEvent) {
      const rect = (canvas as HTMLCanvasElement).getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
    }

    const onEnter = (event: PointerEvent) => {
      if (reduced.matches || event.pointerType !== "mouse") return
      place(event)
      if (open < 0.05) {
        lens.x = pointer.x
        lens.y = pointer.y
      }
      target = 1
      wake()
    }
    const onMove = (event: PointerEvent) => {
      if (reduced.matches || event.pointerType !== "mouse") return
      place(event)
      target = 1
      wake()
    }
    const onLeave = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return
      target = 0
      wake()
    }
    const onDown = (event: PointerEvent) => {
      if (reduced.matches || event.pointerType === "mouse") return
      place(event)
      lens.x = pointer.x
      lens.y = pointer.y
      target = target > 0 ? 0 : 1
      wake()
    }

    readColors()
    resize()
    image = new Image()
    image.decoding = "async"
    image.onload = () => sample()
    image.src = src

    const ro = new ResizeObserver(() => {
      resize()
      draw()
    })
    ro.observe(wrap)
    const offTheme = onThemeChange(() => {
      readColors()
      draw()
    })
    wrap.addEventListener("pointerenter", onEnter)
    wrap.addEventListener("pointermove", onMove)
    wrap.addEventListener("pointerleave", onLeave)
    wrap.addEventListener("pointerdown", onDown)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      offTheme()
      wrap.removeEventListener("pointerenter", onEnter)
      wrap.removeEventListener("pointermove", onMove)
      wrap.removeEventListener("pointerleave", onLeave)
      wrap.removeEventListener("pointerdown", onDown)
    }
  }, [src])

  return (
    <div
      ref={wrapRef}
      style={style}
      className={cn(
        "relative cursor-crosshair overflow-clip bg-surface [--ht-ink:var(--color-purple-deep)] [--ht-paper:var(--color-print)]",
        className
      )}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="absolute inset-0 size-full object-cover"
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full"
      />
    </div>
  )
}

export { HalftoneLens }
export type { HalftoneLensProps }
