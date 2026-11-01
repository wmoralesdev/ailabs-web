import { useEffect, useRef } from "react"
import { gsap } from "gsap"

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
  /**
   * The hero's story: the dots arrive scattered and settle into the shape, a
   * light turns it into volume, then a signal crosses its nodes every few
   * seconds. The pointer moves the lamp instead of inking.
   */
  story?: boolean
  className?: string
}

const FULL: Area = { left: 0, top: 0, width: 1, height: 1 }
/** Pixels whose blue clearly leads red print in the accent ink. */
const ACCENT_BIAS = 28
/** Seconds the scattered dots take to settle, after a short beat on load. */
const SETTLE_SECONDS = 1.9
/** Share of the settle spent staggering the dots' departures. */
const SETTLE_STAGGER = 0.45
/** How far the dots start from home, as a share of the shape's size. */
const SCATTER = 0.42
const SETTLE_DELAY_SECONDS = 0.2
const SIGNAL_SECONDS = 2.6
const SIGNAL_REST_SECONDS = 6.5
/** Cells the signal jumps, so it crosses thin links and small gaps. */
const SIGNAL_REACH = 3
/** Length of the lit tail, in cells of travel. */
const SIGNAL_TAIL = 6
/** Cells of travel the signal's color takes to fade in at its front. */
const SIGNAL_EDGE = 2
/** Opacity steps of the color crossfade; one canvas fill per step. */
const SIGNAL_LEVELS = 10
/** Tones between accent and ink; two canvas fills per tone. */
const TONE_LEVELS = 8
/** Where the lamp rests: above the shape, to its upper left. */
const LIGHT_REST = { x: -0.6, y: -0.7 }
const LIGHT_HEIGHT = 0.55
/** Light that always reaches a dot, so the shadow side never dissolves. */
const LIGHT_FLOOR = 0.14
/** How rounded the shape reads; higher turns its sides away from the light. */
const VOLUME_RELIEF = 2.2
const LIGHT_SECONDS = 1.6
/**
 * Where each `--ht-lit-*` color and the ink sit on paper's ramp. Paper prints
 * the other way round from the dark theme: light thins the dots out, turning
 * them lilac, and the shadow side is dense ink.
 */
const PAPER_RAMP = [0, 0.2, 0.45, 1]

function rampColor(ramp: Array<string>, at: number) {
  const channels = (hex: string) =>
    [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16))
  const end = PAPER_RAMP.findIndex((position) => at <= position)
  if (end <= 0) return ramp[0]
  const mix =
    (at - PAPER_RAMP[end - 1]) / (PAPER_RAMP[end] - PAPER_RAMP[end - 1])
  const target = channels(ramp[end])
  const [r, g, b] = channels(ramp[end - 1]).map((value, i) =>
    Math.round(value + (target[i] - value) * mix)
  )
  return `rgb(${r} ${g} ${b})`
}

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
 * resting screen). Decorative. It animates only while ink or the `story` is
 * moving, only on screen, and prints a still frame under reduced motion.
 */
function HalftoneCanvas({
  src,
  shape,
  area = FULL,
  cell: maxCell = 12,
  density = 0,
  rest = 0.07,
  story = false,
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
    const surface = wrap.closest<HTMLElement>("[data-halftone-surface]") ?? wrap

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
    let paperRamp: Array<string> | null = null
    let visible = false
    let raf = 0
    let intro = reduced.matches || story ? 1 : 0
    let introStart = 0
    const pointer = { x: 0, y: 0, active: false }
    const follower = { x: 0, y: 0, ready: false }
    const settleEase = gsap.parseEase("back.out(1.25)")
    // Tweened by GSAP, read by the frame loop. settle < 0: not started.
    const motion = {
      settle: story && !reduced.matches ? 0 : 1,
      signal: -1,
      light: reduced.matches ? 1 : 0,
      lightX: LIGHT_REST.x,
      lightY: LIGHT_REST.y,
    }
    let normals = new Float32Array(0)
    let lightTween: gsap.core.Tween | null = null
    let moveLight: { x: gsap.QuickToFunc; y: gsap.QuickToFunc } | null = null
    const mark = { x: 0, y: 0, width: 0, height: 0 }
    let scatter = new Float32Array(0)
    let signalDistance = new Int32Array(0)
    let signalLength = 0
    let settleTween: gsap.core.Tween | null = null
    let signalTween: gsap.core.Tween | null = null

    function readColors() {
      const style = getComputedStyle(wrap as HTMLElement)
      paperRamp = document.documentElement.classList.contains("dark")
        ? null
        : [
            style.getPropertyValue("--ht-lit-high").trim(),
            style.getPropertyValue("--ht-lit-mid").trim(),
            style.getPropertyValue("--ht-lit-low").trim(),
            style.getPropertyValue("--ht-ink").trim(),
          ]
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
      mark.x = ax
      mark.y = ay
      mark.width = aw
      mark.height = ah

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
      if (story) prepareStory()
      if (story) prepareVolume()
    }

    /** Reads the flat shape as a soft relief; what each dot faces is kept. */
    function prepareVolume() {
      // Distance to the shape's edge, in two chamfer passes.
      const depth = new Float32Array(cols * rows)
      const at = (r: number, c: number) =>
        r < 0 || r >= rows || c < 0 || c >= cols ? 0 : depth[r * cols + c]
      for (let i = 0; i < depth.length; i++) {
        depth[i] = base[i] > 0.25 ? Infinity : 0
      }
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const i = row * cols + col
          if (depth[i] === 0) continue
          depth[i] = Math.min(
            depth[i],
            at(row, col - 1) + 1,
            at(row - 1, col) + 1,
            at(row - 1, col - 1) + 1.41,
            at(row - 1, col + 1) + 1.41
          )
        }
      }
      for (let row = rows - 1; row >= 0; row--) {
        for (let col = cols - 1; col >= 0; col--) {
          const i = row * cols + col
          if (depth[i] === 0) continue
          depth[i] = Math.min(
            depth[i],
            at(row, col + 1) + 1,
            at(row + 1, col) + 1,
            at(row + 1, col + 1) + 1.41,
            at(row + 1, col - 1) + 1.41
          )
        }
      }
      // A rounded profile, softened so the ridges don't crease the light.
      let relief = depth.map((d) => Math.sqrt(d))
      const reliefAt = (source: Float32Array, r: number, c: number) =>
        r < 0 || r >= rows || c < 0 || c >= cols ? 0 : source[r * cols + c]
      for (let pass = 0; pass < 2; pass++) {
        const source = relief
        relief = source.map((value, i) => {
          const row = Math.floor(i / cols)
          const col = i % cols
          return (
            (value * 2 +
              reliefAt(source, row, col - 1) +
              reliefAt(source, row, col + 1) +
              reliefAt(source, row - 1, col) +
              reliefAt(source, row + 1, col)) /
            6
          )
        })
      }
      normals = new Float32Array(cols * rows * 3)
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const i = row * cols + col
          const nx =
            ((reliefAt(relief, row, col - 1) - reliefAt(relief, row, col + 1)) /
              2) *
            VOLUME_RELIEF
          const ny =
            ((reliefAt(relief, row - 1, col) - reliefAt(relief, row + 1, col)) /
              2) *
            VOLUME_RELIEF
          const length = Math.hypot(nx, ny, 1)
          normals[i * 3] = nx / length
          normals[i * 3 + 1] = ny / length
          normals[i * 3 + 2] = 1 / length
        }
      }
    }

    /** Where each dot starts its settle, and how far the signal is from it. */
    function prepareStory() {
      scatter = new Float32Array(cols * rows * 3)
      const reach = Math.max(mark.width, mark.height) * SCATTER
      for (let i = 0; i < cols * rows; i++) {
        const angle = Math.random() * Math.PI * 2
        const far = reach * (0.35 + Math.random() * 0.65)
        scatter[i * 3] = Math.cos(angle) * far
        scatter[i * 3 + 1] = Math.sin(angle) * far
        scatter[i * 3 + 2] = Math.random()
      }

      // Walks the shape from its lowest left dot, so the signal follows it.
      signalDistance = new Int32Array(cols * rows).fill(-1)
      signalLength = 0
      let seed = -1
      let seedScore = -Infinity
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (base[row * cols + col] > 0.3 && row - col > seedScore) {
            seedScore = row - col
            seed = row * cols + col
          }
        }
      }
      if (seed < 0) return
      const queue = [seed]
      signalDistance[seed] = 0
      for (const i of queue) {
        const row = Math.floor(i / cols)
        const col = i % cols
        for (let dy = -SIGNAL_REACH; dy <= SIGNAL_REACH; dy++) {
          for (let dx = -SIGNAL_REACH; dx <= SIGNAL_REACH; dx++) {
            const r = row + dy
            const c = col + dx
            if (r < 0 || r >= rows || c < 0 || c >= cols) continue
            const next = r * cols + c
            if (signalDistance[next] >= 0 || base[next] < 0.03) continue
            signalDistance[next] = signalDistance[i] + 1
            signalLength = Math.max(signalLength, signalDistance[next])
            queue.push(next)
          }
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
      // The signal's color, by ink and opacity step, over the dots' own color.
      const litPaths = [0, 1].map(() =>
        Array.from({ length: SIGNAL_LEVELS }, () => new Path2D())
      )
      const settling = motion.settle < 1
      const shading = story && !settling && normals.length === cols * rows * 3
      const tones = shading
        ? Array.from({ length: TONE_LEVELS }, () => new Path2D())
        : []
      const shadows = new Path2D()
      const lampLength = Math.hypot(motion.lightX, motion.lightY, LIGHT_HEIGHT)
      const lampX = motion.lightX / lampLength
      const lampY = motion.lightY / lampLength
      const lampZ = LIGHT_HEIGHT / lampLength
      const front =
        motion.signal >= 0 ? motion.signal * (signalLength + SIGNAL_TAIL) : -1
      for (let row = 0; row < rows; row++) {
        const y = (row + 0.5) * cell
        for (let col = 0; col < cols; col++) {
          const i = row * cols + col
          const shapeV = settling ? 0 : base[i] * grow
          // The signal fades in at its front and out along its tail.
          const behind = front - signalDistance[i]
          const lit =
            front >= 0 && signalDistance[i] >= 0
              ? smoothstep(0, SIGNAL_EDGE, behind) *
                (1 - smoothstep(SIGNAL_EDGE, SIGNAL_TAIL, behind))
              : 0
          const v = shapeV + ink[i] + lit * 0.55
          const r = max * smoothstep(0.08, 0.95, v)
          const x = (col + 0.5) * cell
          let path = 0
          if (shapeV > 0.12) path = accent[i] ? 1 : 0
          else if (ink[i] > 0.04) path = 1
          else path = 2
          const radius = Math.max(r, restR)
          if (shading && base[i] > 0.12) {
            const facing =
              normals[i * 3] * lampX +
              normals[i * 3 + 1] * lampY +
              normals[i * 3 + 2] * lampZ
            const shade = Math.min(
              1,
              LIGHT_FLOOR +
                (1 - LIGHT_FLOOR) * smoothstep(0.15, 0.95, facing) +
                lit * 0.9
            )
            // Flat until the light turns on; bright dots are big and inked.
            const tone = 1 - motion.light * (1 - shade)
            const home = max * smoothstep(0.08, 0.95, base[i])
            // On inverted paper, what the light reaches thins out instead.
            const inkLevel = paperRamp ? 1 - motion.light * shade : tone
            const dotR =
              home * (paperRamp ? 0.38 + 0.62 * inkLevel : 0.42 + 0.58 * tone)
            if (dotR < 0.35) continue
            const target = accent[i]
              ? paths[1]
              : tones[Math.round(inkLevel * (TONE_LEVELS - 1))]
            target.moveTo(x + dotR, y)
            target.arc(x, y, dotR, 0, Math.PI * 2)
            if (motion.light > 0 && base[i] > 0.3) {
              // The shape's shadow falls away from the lamp.
              const shadowR = cell * 0.26
              const shadowX = x - lampX * cell * 1.6
              const shadowY = y - lampY * cell * 2
              shadows.moveTo(shadowX + shadowR, shadowY)
              shadows.arc(shadowX, shadowY, shadowR, 0, Math.PI * 2)
            }
            continue
          }
          if (settling && base[i] > 0.03) {
            // Each dot leaves on its own beat, overshoots home and settles.
            const t = Math.min(
              Math.max(
                (motion.settle - scatter[i * 3 + 2] * SETTLE_STAGGER) /
                  (1 - SETTLE_STAGGER),
                0
              ),
              1
            )
            const eased = settleEase(t)
            const home = max * smoothstep(0.08, 0.95, base[i])
            const dotR = home * (0.45 + 0.55 * Math.min(t * 1.4, 1))
            const dot = base[i] > 0.12 ? (accent[i] ? 1 : 0) : 2
            if (dotR >= 0.35) {
              const dotX = x + scatter[i * 3] * (1 - eased)
              const dotY = y + scatter[i * 3 + 1] * (1 - eased)
              paths[dot].moveTo(dotX + dotR, dotY)
              paths[dot].arc(dotX, dotY, dotR, 0, Math.PI * 2)
            }
          }
          if (radius < 0.35) continue
          paths[path].moveTo(x + radius, y)
          paths[path].arc(x, y, radius, 0, Math.PI * 2)
          const level = Math.round(lit * SIGNAL_LEVELS) - 1
          if (level >= 0) {
            const litPath = litPaths[accent[i] ? 0 : 1][level]
            litPath.moveTo(x + radius, y)
            litPath.arc(x, y, radius, 0, Math.PI * 2)
          }
        }
      }
      if (shading && motion.light > 0 && !paperRamp) {
        ctx.globalAlpha = 0.5 * motion.light
        ctx.fillStyle = colors.accent
        ctx.fill(shadows)
        ctx.globalAlpha = 1
      }
      ctx.fillStyle = colors.faint
      ctx.fill(paths[2])
      ctx.fillStyle = colors.ink
      ctx.fill(paths[0])
      ctx.fillStyle = colors.accent
      ctx.fill(paths[1])
      // Each tone is the accent with the ink printed over it.
      for (let level = 0; level < tones.length; level++) {
        if (paperRamp) {
          ctx.fillStyle = rampColor(paperRamp, level / (TONE_LEVELS - 1))
          ctx.fill(tones[level])
          continue
        }
        ctx.fillStyle = colors.accent
        ctx.fill(tones[level])
        ctx.globalAlpha = level / (TONE_LEVELS - 1)
        ctx.fillStyle = colors.ink
        ctx.fill(tones[level])
        ctx.globalAlpha = 1
      }
      if (front >= 0) {
        for (let level = 0; level < SIGNAL_LEVELS; level++) {
          ctx.globalAlpha = (level + 1) / SIGNAL_LEVELS
          ctx.fillStyle = colors.ink
          ctx.fill(litPaths[0][level])
          ctx.fillStyle = colors.accent
          ctx.fill(litPaths[1][level])
        }
        ctx.globalAlpha = 1
      }
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

      if (motion.settle < 1 && settleTween) moving = true
      if (motion.signal >= 0) moving = true
      if (story && gsap.isTweening(motion)) moving = true

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

    /** Points the lamp, relative to the shape's center. */
    function aimLight(x: number, y: number) {
      if (!moveLight) return
      moveLight.x(Math.min(Math.max(x, -1), 1))
      moveLight.y(Math.min(Math.max(y, -1), 1))
      wake()
    }

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reduced.matches) return
      const p = local(event)
      if (story) {
        aimLight(
          (p.x - mark.x - mark.width / 2) / (mark.width * 0.9),
          (p.y - mark.y - mark.height / 2) / (mark.height * 0.9)
        )
        return
      }
      pointer.x = p.x
      pointer.y = p.y
      pointer.active = true
      wake()
    }
    const onLeave = () => {
      pointer.active = false
      follower.ready = false
      if (story) aimLight(LIGHT_REST.x, LIGHT_REST.y)
    }
    const onDown = (event: PointerEvent) => {
      if (reduced.matches || story) return
      const p = local(event)
      splat(p.x, p.y, 1.1, 3.4)
      wake()
    }

    function scheduleSignal(delay: number) {
      signalTween = gsap.fromTo(
        motion,
        { signal: 0 },
        {
          signal: 1,
          delay,
          duration: SIGNAL_SECONDS,
          ease: "sine.inOut",
          immediateRender: false,
          onStart: wake,
          onComplete() {
            motion.signal = -1
            draw()
            scheduleSignal(SIGNAL_REST_SECONDS)
          },
        }
      )
      if (!visible) signalTween.pause()
    }

    /** A light sweeps across the settled shape and leaves it in volume. */
    function turnOnLight() {
      lightTween = gsap.fromTo(
        motion,
        { light: 0, lightX: 1, lightY: 0.3 },
        {
          light: 1,
          lightX: LIGHT_REST.x,
          lightY: LIGHT_REST.y,
          duration: LIGHT_SECONDS,
          ease: "power2.inOut",
          onStart: wake,
          onComplete() {
            const lamp = { duration: 0.9, ease: "power3.out" }
            moveLight = {
              x: gsap.quickTo(motion, "lightX", lamp),
              y: gsap.quickTo(motion, "lightY", lamp),
            }
            scheduleSignal(2)
          },
        }
      )
      if (!visible) lightTween.pause()
    }

    function startStory() {
      if (settleTween || motion.settle >= 1) return
      settleTween = gsap.to(motion, {
        settle: 1,
        delay: SETTLE_DELAY_SECONDS,
        duration: SETTLE_SECONDS,
        ease: "none",
        onStart: wake,
        onComplete() {
          draw()
          turnOnLight()
        },
      })
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
      if (visible) {
        settleTween?.play()
        lightTween?.play()
        signalTween?.play()
        wake()
      } else {
        settleTween?.pause()
        lightTween?.pause()
        signalTween?.pause()
      }
    })
    io.observe(wrap)
    // The story opens when the mark itself is in view, also below the fold.
    const slot = surface.querySelector("[data-halftone-slot]") ?? wrap
    const storyIo = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || !story) return
        storyIo.disconnect()
        startStory()
      },
      { threshold: 0.3 }
    )
    if (motion.settle < 1) storyIo.observe(slot)
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
      gsap.killTweensOf(motion)
      storyIo.disconnect()
      io.disconnect()
      ro.disconnect()
      offTheme()
      surface.removeEventListener("pointermove", onMove)
      surface.removeEventListener("pointerleave", onLeave)
      surface.removeEventListener("pointerdown", onDown)
    }
  }, [src, shape, left, top, width, height, maxCell, density, rest, story])

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
