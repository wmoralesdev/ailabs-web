import { useEffect, useRef } from "react"

import { shapes } from "@/lib/halftone-shapes"
import type { ShapeName } from "@/lib/halftone-shapes"
import { onThemeChange } from "@/lib/theme-change"
import { cn } from "@/lib/utils"

/** Where the printed shape sits, as fractions of the canvas box. */
type Area = { left: number; top: number; width: number; height: number }

type HalftoneCanvasProps = {
  /** An image whose alpha is printed (e.g. the Ai Labs mark)… */
  src?: string
  /** …or a built-in halftone shape. */
  shape?: ShapeName
  /**
   * Where the printed shape sits, as fractions of the canvas box. A
   * `[data-halftone-slot]` element inside the surface overrides it, so the
   * layout decides where the shape goes at each breakpoint.
   */
  area?: Area
  /** Cell size in CSS pixels. */
  cell?: number
  /**
   * Fewest cells across the box's short side. Small boxes shrink the cell to
   * keep the shape legible.
   */
  density?: number
  /** Radius of the faint resting dots, as a share of the cell. 0 hides them. */
  rest?: number
  className?: string
}

const FULL: Area = { left: 0, top: 0, width: 1, height: 1 }
/** Pixels whose blue clearly leads red print in the accent ink. */
const ACCENT_BIAS = 28

function smoothstep(a: number, b: number, v: number) {
  const t = Math.min(Math.max((v - a) / (b - a), 0), 1)
  return t * t * (3 - 2 * t)
}

/**
 * A live halftone print with a fluid pointer. The shape is printed as a dot
 * screen; the pointer drags a blob of ink through the grid that lingers and
 * melts back, merging with the shape where they meet, like the metaballs of
 * the Ai Labs mark. A tap drops a splash.
 *
 * The pointer surface is the closest `[data-halftone-surface]`, so ink
 * follows the cursor over text too. Inks come from CSS on the element: `--ht-ink` (the shape), `--ht-accent`
 * (accent parts of an image and the pointer's ink) and `--ht-faint` (the
 * resting screen). Decorative. It animates only while ink is moving, only on
 * screen, and prints a still frame under reduced motion.
 */
function HalftoneCanvas({
  src,
  shape,
  area = FULL,
  cell: maxCell = 12,
  density = 0,
  rest = 0.07,
  className,
}: HalftoneCanvasProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { left, top, width, height } = area

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!wrap || !canvas || !ctx) return
    if (
      typeof window.matchMedia !== "function" ||
      typeof IntersectionObserver !== "function" ||
      typeof ResizeObserver !== "function"
    ) {
      return
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    const surface =
      wrap.closest<HTMLElement>("[data-halftone-surface]") ?? wrap

    let cell = maxCell
    let cols = 0
    let rows = 0
    let w = 0
    let h = 0
    let base = new Float32Array(0)
    let accent = new Uint8Array(0)
    let ink = new Float32Array(0)
    let image: HTMLImageElement | null = null
    let colors = { ink: "", accent: "", faint: "" }
    let visible = false
    let raf = 0
    let intro = reduced.matches ? 1 : 0
    let introStart = 0
    const pointer = { x: 0, y: 0, active: false }
    const follower = { x: 0, y: 0, ready: false }

    function readColors() {
      const style = getComputedStyle(wrap as HTMLElement)
      colors = {
        ink: style.getPropertyValue("--ht-ink").trim() || style.color,
        accent: style.getPropertyValue("--ht-accent").trim() || style.color,
        faint: style.getPropertyValue("--ht-faint").trim() || "transparent",
      }
    }

    /** Samples the shape into the grid: coverage per cell and its ink. */
    function sample() {
      base = new Float32Array(cols * rows)
      accent = new Uint8Array(cols * rows)
      let ax = left * w
      let ay = top * h
      let aw = width * w
      let ah = height * h
      const slot = surface.querySelector("[data-halftone-slot]")
      if (slot && canvas) {
        const box = slot.getBoundingClientRect()
        const own = canvas.getBoundingClientRect()
        ax = box.left - own.left
        ay = box.top - own.top
        aw = box.width
        ah = box.height
      }

      if (shape) {
        const sdf = shapes[shape]
        const side = Math.min(aw, ah)
        const ox = ax + (aw - side) / 2
        const oy = ay + (ah - side) / 2
        const stepUnits = (cell / side) * 2
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const x = ((col + 0.5) * cell - ox) / side
            const y = ((row + 0.5) * cell - oy) / side
            if (x < -0.1 || x > 1.1 || y < -0.1 || y > 1.1) continue
            const d = sdf(x * 2 - 1, y * 2 - 1)
            base[row * cols + col] = smoothstep(0.9, -1.4, d / stepUnits)
          }
        }
        return
      }

      if (!image || !image.naturalWidth) return
      // Contain the image in the area, measured in cells.
      const scale = Math.min(aw / image.naturalWidth, ah / image.naturalHeight)
      const iw = image.naturalWidth * scale
      const ih = image.naturalHeight * scale
      const off = document.createElement("canvas")
      off.width = cols
      off.height = rows
      const octx = off.getContext("2d", { willReadFrequently: true })
      if (!octx) return
      octx.drawImage(
        image,
        (ax + (aw - iw) / 2) / cell,
        (ay + (ah - ih) / 2) / cell,
        iw / cell,
        ih / cell
      )
      const data = octx.getImageData(0, 0, cols, rows).data
      const raw = new Float32Array(cols * rows)
      for (let i = 0; i < cols * rows; i++) {
        raw[i] = data[i * 4 + 3] / 255
        if (raw[i] > 0.05 && data[i * 4 + 2] - data[i * 4] > ACCENT_BIAS) {
          accent[i] = 1
        }
      }
      // A soft blur tapers the edges: big dots inside, small ones at the rim.
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          let sum = 0
          let weight = 0
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const r = row + dy
              const c = col + dx
              if (r < 0 || r >= rows || c < 0 || c >= cols) continue
              const k = dx === 0 && dy === 0 ? 4 : dx === 0 || dy === 0 ? 2 : 1
              sum += raw[r * cols + c] * k
              weight += k
            }
          }
          base[row * cols + col] = (sum / weight) ** 1.4
        }
      }
    }

    function resize() {
      if (!canvas || !ctx || !wrap) return
      w = wrap.clientWidth
      h = wrap.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cell = density
        ? Math.max(5, Math.min(maxCell, Math.min(w, h) / density))
        : maxCell
      cols = Math.ceil(w / cell)
      rows = Math.ceil(h / cell)
      ink = new Float32Array(cols * rows)
      sample()
      draw()
    }

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, w, h)
      const max = cell * 0.5
      const restR = cell * rest
      const grow = intro < 1 ? 1 - (1 - intro) ** 3 : 1
      const paths = [new Path2D(), new Path2D(), new Path2D()]
      for (let row = 0; row < rows; row++) {
        const y = (row + 0.5) * cell
        for (let col = 0; col < cols; col++) {
          const i = row * cols + col
          const shapeV = base[i] * grow
          const v = shapeV + ink[i]
          const r = max * smoothstep(0.08, 0.95, v)
          const x = (col + 0.5) * cell
          let path = 0
          if (shapeV > 0.12) path = accent[i] ? 1 : 0
          else if (ink[i] > 0.04) path = 1
          else path = 2
          const radius = Math.max(r, restR)
          if (radius < 0.35) continue
          paths[path].moveTo(x + radius, y)
          paths[path].arc(x, y, radius, 0, Math.PI * 2)
        }
      }
      ctx.fillStyle = colors.faint
      ctx.fill(paths[2])
      ctx.fillStyle = colors.ink
      ctx.fill(paths[0])
      ctx.fillStyle = colors.accent
      ctx.fill(paths[1])
    }

    /** Adds a soft blob of ink around (px, py), in CSS pixels. */
    function splat(px: number, py: number, amount: number, spread: number) {
      const cx = px / cell
      const cy = py / cell
      const reach = Math.ceil(spread * 2.2)
      const c0 = Math.max(0, Math.floor(cx - reach))
      const c1 = Math.min(cols - 1, Math.ceil(cx + reach))
      const r0 = Math.max(0, Math.floor(cy - reach))
      const r1 = Math.min(rows - 1, Math.ceil(cy + reach))
      for (let row = r0; row <= r1; row++) {
        for (let col = c0; col <= c1; col++) {
          const d2 = (col + 0.5 - cx) ** 2 + (row + 0.5 - cy) ** 2
          const i = row * cols + col
          ink[i] = Math.min(
            1.15,
            ink[i] + amount * Math.exp(-d2 / (2 * spread * spread))
          )
        }
      }
    }

    function frame(now: number) {
      raf = 0
      let moving = false

      if (intro < 1) {
        if (!introStart) introStart = now
        intro = Math.min(1, (now - introStart) / 1100)
        moving = true
      }

      if (pointer.active) {
        if (!follower.ready) {
          follower.x = pointer.x
          follower.y = pointer.y
          follower.ready = true
        }
        const dx = pointer.x - follower.x
        const dy = pointer.y - follower.y
        follower.x += dx * 0.16
        follower.y += dy * 0.16
        const speed = Math.min(Math.hypot(dx, dy) / cell, 6)
        splat(follower.x, follower.y, 0.08 + speed * 0.07, 3)
        moving = true
      }

      let energy = 0
      for (let i = 0; i < ink.length; i++) {
        if (ink[i] === 0) continue
        ink[i] *= 0.945
        if (ink[i] < 0.01) ink[i] = 0
        energy += ink[i]
      }
      if (energy > 0) moving = true

      draw()
      if (moving && visible) raf = requestAnimationFrame(frame)
    }

    function wake() {
      if (!raf && visible && !reduced.matches) {
        raf = requestAnimationFrame(frame)
      }
    }

    function local(event: PointerEvent) {
      const rect = (canvas as HTMLCanvasElement).getBoundingClientRect()
      return { x: event.clientX - rect.left, y: event.clientY - rect.top }
    }

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reduced.matches) return
      const p = local(event)
      pointer.x = p.x
      pointer.y = p.y
      pointer.active = true
      wake()
    }
    const onLeave = () => {
      pointer.active = false
      follower.ready = false
    }
    const onDown = (event: PointerEvent) => {
      if (reduced.matches) return
      const p = local(event)
      splat(p.x, p.y, 1.1, 3.4)
      wake()
    }

    readColors()
    resize()

    if (src) {
      image = new Image()
      image.decoding = "async"
      image.onload = () => {
        sample()
        draw()
      }
      image.src = src
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) wake()
    })
    io.observe(wrap)
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)
    const offTheme = onThemeChange(() => {
      readColors()
      draw()
    })
    surface.addEventListener("pointermove", onMove)
    surface.addEventListener("pointerleave", onLeave)
    surface.addEventListener("pointerdown", onDown)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      offTheme()
      surface.removeEventListener("pointermove", onMove)
      surface.removeEventListener("pointerleave", onLeave)
      surface.removeEventListener("pointerdown", onDown)
    }
  }, [src, shape, left, top, width, height, maxCell, density, rest])

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={cn("pointer-events-none", className)}
    >
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
    </div>
  )
}

export { HalftoneCanvas }
export type { HalftoneCanvasProps }
