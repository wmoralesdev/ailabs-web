import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

const FONT_STACK =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
/** Phrase join — spaced middot like the gray reference (not solid ·· bands). */
const SEPARATOR = " · "
const SPIN_DURATION_S = 160
const FLICKER_INTERVAL_MS = 520
const FLICKER_FRACTION = 0.01
const MAX_GLYPHS = 6000
const INNER_RADIUS_RATIO = 0.045
/** Base radial gap at the innermost ring (fraction of min side). */
const RING_GAP_RATIO = 0.034
/** Floor so shrinking gaps never collapse into the type. */
const MIN_GAP_TO_FONT = 1.05
/** Cap outward type growth so outer rings don’t dominate. */
const MAX_FONT_SCALE = 1.65
/** Each outward ring’s type size is this × the previous ring. */
const RING_SIZE_SCALE = 1.05
/** Farther from center, gap shrinks (matches gray reference). */
const RING_GAP_SCALE = 0.975
/** Extra along-path tracking so glyphs don’t read as a solid stroke. */
const LETTER_TRACKING = 1.12
/** Wavefront delay between rings (pond drop). */
const RIPPLE_STAGGER_MS = 48
const RIPPLE_DURATION_MS = 1400
/** Center splash overshoot; falls off per ring. */
const SPLASH_CENTER = 0.16
const SPLASH_FALLOFF = 0.87
const TAU = Math.PI * 2
/**
 * Sparse wedge (~8–11 o'clock): mostly middle dots. Dense text sits on the
 * opposite arc so the composition matches the asymmetric reference.
 */
const SPARSE_CENTER = (13 * Math.PI) / 12
const SPARSE_HALF_WIDTH = Math.PI * 0.62

const SPIRAL_KEYFRAMES = `
@keyframes lab-spiral-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
/* Pond drop: spring settle with decaying overshoot.
   --splash is set per ring (largest at center, decaying outward). */
@keyframes lab-ring-ripple {
  0% {
    opacity: 0;
    transform: scale(1);
  }
  10% {
    opacity: 1;
    transform: scale(calc(1 + var(--splash, 0.1)));
  }
  26% {
    opacity: 1;
    transform: scale(calc(1 - var(--splash, 0.1) * 0.55));
  }
  44% {
    opacity: 1;
    transform: scale(calc(1 + var(--splash, 0.1) * 0.32));
  }
  62% {
    opacity: 1;
    transform: scale(calc(1 - var(--splash, 0.1) * 0.14));
  }
  80% {
    opacity: 1;
    transform: scale(calc(1 + var(--splash, 0.1) * 0.05));
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@media (prefers-reduced-motion: reduce) {
  @keyframes lab-spiral-spin {
    from { transform: none; }
    to { transform: none; }
  }
  @keyframes lab-ring-ripple {
    from { opacity: 1; transform: none; }
    to { opacity: 1; transform: none; }
  }
}
`

type Glyph = {
  char: string
  angle: number
  radius: number
  fontSize: number
}

type RingLayer = {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  glyphs: Glyph[]
}

type TextSpiralProps = {
  words: ReadonlyArray<string>
  className?: string
}

/**
 * Concentric text rings as per-ring canvases: CSS spin on the stack + CSS
 * ripple entrance per ring (compositor / GPU). Sparse ASCII flicker rebakes
 * bitmaps on a slow interval. Honors prefers-reduced-motion.
 */
function TextSpiral({ words, className }: TextSpiralProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const spinRef = useRef<HTMLDivElement>(null)
  const wordsKey = words.join("\0")

  useEffect(() => {
    const root = rootRef.current
    const spin = spinRef.current
    if (!root || !spin) {
      return
    }

    const reduceMedia = window.matchMedia("(prefers-reduced-motion: reduce)")
    const source = buildSource(words)
    if (source.length === 0) {
      return
    }

    let layers: RingLayer[] = []
    let flatGlyphs: { ring: number; index: number; char: string }[] = []
    let dpr = 1
    let cssWidth = 0
    let cssHeight = 0
    let flickerTimer = 0
    let visible = document.visibilityState !== "hidden"

    const measureChar = (ctx: CanvasRenderingContext2D, ch: string, size: number) => {
      ctx.font = `${size}px ${FONT_STACK}`
      const w = ctx.measureText(ch).width
      return w > 0 ? w : size * 0.55
    }

    const readColors = () => {
      const styles = getComputedStyle(root)
      const ink =
        styles.getPropertyValue("--surface-ink").trim() ||
        styles.backgroundColor ||
        "#111111"
      const onDark = styles.getPropertyValue("--on-dark").trim() || "#ffffff"
      return { ink, onDark }
    }

    const clearLayers = () => {
      for (const layer of layers) {
        layer.canvas.remove()
      }
      layers = []
      flatGlyphs = []
    }

    const layout = () => {
      clearLayers()

      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = spin.getBoundingClientRect()
      cssWidth = Math.max(1, rect.width)
      cssHeight = Math.max(1, rect.height)

      const probe = document.createElement("canvas")
      const probeCtx = probe.getContext("2d")
      if (!probeCtx) {
        return
      }

      const minSide = Math.min(cssWidth, cssHeight)
      const baseFontSize = Math.max(7, Math.min(10, minSide * 0.011))
      const maxRadius = Math.hypot(cssWidth, cssHeight) / 2
      const inner = minSide * INNER_RADIUS_RATIO
      let gap = minSide * RING_GAP_RATIO
      let radius = inner
      let sourceIndex = 0
      let ring = 0
      let totalGlyphs = 0

      while (totalGlyphs < MAX_GLYPHS) {
        if (radius > maxRadius) {
          break
        }

        const ringFont = Math.min(
          baseFontSize * RING_SIZE_SCALE ** ring,
          baseFontSize * MAX_FONT_SCALE
        )

        const ringGlyphs: Glyph[] = []
        let angle = (ring * 0.55) % (Math.PI * 2)
        const endAngle = angle + Math.PI * 2
        let guard = 0

        while (
          angle < endAngle &&
          totalGlyphs + ringGlyphs.length < MAX_GLYPHS &&
          guard++ < 4000
        ) {
          const density = textDensityAt(angle, ring)
          let ch: string
          if (Math.random() < density) {
            ch = source[sourceIndex % source.length] ?? "·"
            sourceIndex += 1
          } else {
            ch = "·"
          }

          const charWidth =
            measureChar(probeCtx, ch, ringFont) * LETTER_TRACKING
          const step = Math.max(0.035, charWidth / Math.max(radius, 1))

          if (angle + step * 0.5 > endAngle) {
            break
          }

          if (ch !== " ") {
            ringGlyphs.push({
              char: ch,
              angle,
              radius,
              fontSize: ringFont,
            })
          }

          angle += step
        }

        if (ringGlyphs.length > 0) {
          const canvas = document.createElement("canvas")
          canvas.width = Math.max(1, Math.round(cssWidth * dpr))
          canvas.height = Math.max(1, Math.round(cssHeight * dpr))
          canvas.setAttribute("aria-hidden", "true")
          canvas.className =
            "pointer-events-none absolute inset-0 h-full w-full max-w-none will-change-transform"
          const ctx = canvas.getContext("2d", { alpha: true })
          if (!ctx) {
            break
          }

          const ringIndex = layers.length
          if (reduceMedia.matches) {
            canvas.style.opacity = "1"
            canvas.style.transform = "none"
          } else {
            const splash = SPLASH_CENTER * SPLASH_FALLOFF ** ringIndex
            canvas.style.setProperty("--splash", splash.toFixed(4))
            // Outer rings settle a touch sooner (wave loses energy).
            const duration = Math.round(
              RIPPLE_DURATION_MS * (1 - Math.min(0.28, ringIndex * 0.014))
            )
            // Smooth spring: long ease-out with overshoot baked into keyframes.
            canvas.style.animation = `lab-ring-ripple ${duration}ms cubic-bezier(0.22, 0.61, 0.36, 1) both`
            canvas.style.animationDelay = `${ringIndex * RIPPLE_STAGGER_MS}ms`
          }

          spin.appendChild(canvas)
          layers.push({ canvas, ctx, glyphs: ringGlyphs })

          for (let i = 0; i < ringGlyphs.length; i++) {
            flatGlyphs.push({
              ring: ringIndex,
              index: i,
              char: ringGlyphs[i].char,
            })
          }
          totalGlyphs += ringGlyphs.length
        }

        ring += 1
        radius += gap
        // Shrink gap outward; keep a soft floor tied to type size.
        gap = Math.max(ringFont * MIN_GAP_TO_FONT, gap * RING_GAP_SCALE)
      }
    }

    const paintRing = (layer: RingLayer, hidden: ReadonlySet<number>) => {
      const { onDark } = readColors()
      const { ctx, glyphs, canvas } = layer
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillStyle = onDark

      const cx = cssWidth / 2
      const cy = cssHeight / 2
      let lastFont = -1

      for (let i = 0; i < glyphs.length; i++) {
        if (hidden.has(i)) {
          continue
        }

        const glyph = glyphs[i]
        if (glyph.fontSize !== lastFont) {
          ctx.font = `${glyph.fontSize}px ${FONT_STACK}`
          lastFont = glyph.fontSize
        }

        const x = cx + Math.cos(glyph.angle) * glyph.radius
        const y = cy + Math.sin(glyph.angle) * glyph.radius
        const rot = glyph.angle + Math.PI / 2
        const cos = Math.cos(rot)
        const sin = Math.sin(rot)
        ctx.setTransform(
          cos * dpr,
          sin * dpr,
          -sin * dpr,
          cos * dpr,
          x * dpr,
          y * dpr
        )
        ctx.fillText(glyph.char, 0, 0)
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0)
    }

    const pickHiddenByRing = (): Map<number, Set<number>> => {
      const byRing = new Map<number, Set<number>>()
      for (let r = 0; r < layers.length; r++) {
        byRing.set(r, new Set())
      }
      if (reduceMedia.matches || flatGlyphs.length === 0) {
        return byRing
      }

      const flickerCount = Math.max(
        1,
        Math.floor(flatGlyphs.length * FLICKER_FRACTION)
      )
      for (let n = 0; n < flickerCount; n++) {
        const pick = flatGlyphs[Math.floor(Math.random() * flatGlyphs.length)]
        if (pick.char !== "·" && pick.char !== " ") {
          byRing.get(pick.ring)?.add(pick.index)
        }
      }
      return byRing
    }

    const paintAll = (hiddenByRing: Map<number, Set<number>>) => {
      for (let r = 0; r < layers.length; r++) {
        paintRing(layers[r], hiddenByRing.get(r) ?? new Set())
      }
    }

    const syncSpin = () => {
      if (reduceMedia.matches) {
        spin.style.animation = "none"
        spin.style.transform = "none"
      } else {
        spin.style.animation = `lab-spiral-spin ${SPIN_DURATION_S}s linear infinite`
      }
    }

    const rebuild = () => {
      layout()
      paintAll(pickHiddenByRing())
      syncSpin()
    }

    const onFlicker = () => {
      if (!visible || reduceMedia.matches) {
        return
      }
      paintAll(pickHiddenByRing())
    }

    const startFlicker = () => {
      window.clearInterval(flickerTimer)
      flickerTimer = 0
      if (!reduceMedia.matches && visible) {
        flickerTimer = window.setInterval(onFlicker, FLICKER_INTERVAL_MS)
      }
    }

    const onResize = () => {
      rebuild()
    }

    const onVisibility = () => {
      visible = document.visibilityState !== "hidden"
      if (visible) {
        startFlicker()
      } else {
        window.clearInterval(flickerTimer)
        flickerTimer = 0
      }
    }

    const onMotionChange = () => {
      rebuild()
      startFlicker()
    }

    rebuild()
    startFlicker()

    const observer = new ResizeObserver(onResize)
    observer.observe(root)
    document.addEventListener("visibilitychange", onVisibility)
    reduceMedia.addEventListener("change", onMotionChange)

    return () => {
      window.clearInterval(flickerTimer)
      observer.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      reduceMedia.removeEventListener("change", onMotionChange)
      spin.style.animation = "none"
      clearLayers()
    }
  }, [wordsKey, words])

  return (
    <div
      ref={rootRef}
      className={cn(
        "bg-surface-ink relative flex items-center justify-center overflow-hidden",
        className
      )}
    >
      <style>{SPIRAL_KEYFRAMES}</style>
      <div
        ref={spinRef}
        aria-hidden
        className="relative h-[140%] w-[140%] max-w-none shrink-0 will-change-transform"
      />
    </div>
  )
}

/** 1 = full text, ~0 = almost only dots. Soft falloff into the sparse wedge. */
function textDensityAt(angle: number, ring: number): number {
  const a = ((angle % TAU) + TAU) % TAU
  const center = (SPARSE_CENTER + ring * 0.07) % TAU
  let delta = Math.abs(a - center)
  if (delta > Math.PI) {
    delta = TAU - delta
  }

  const t = Math.min(1, delta / SPARSE_HALF_WIDTH)
  return 0.03 + t * t * 0.97
}

function buildSource(words: ReadonlyArray<string>): string {
  const cleaned = words
    .map((word) => word.trim())
    .filter((word) => word.length > 0)
    .map((word) => word.toUpperCase().replace(/\s+/g, " "))
    .filter((word) => word.length > 0)

  if (cleaned.length === 0) {
    return ""
  }

  const unit = cleaned.join(SEPARATOR) + SEPARATOR
  let source = unit
  while (source.length < 1200) {
    source += unit
  }
  return source
}

export { TextSpiral }
