import { useEffect, useRef, useState } from "react"
import type { MouseEvent as ReactMouseEvent } from "react"

import { cn } from "@/lib/utils"

const FONT_STACK =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
/** Inter-word separator glyph (never inserted between letters of a word). */
const WORD_SEP = "·"
/** Opacity for separator / filler middots (letters stay fully opaque). */
const SEP_ALPHA = 0.45
const SPIN_DURATION_S = 160
const FLICKER_INTERVAL_MS = 520
const FLICKER_FRACTION = 0.01
const MAX_GLYPHS = 6000
const INNER_RADIUS_RATIO = 0.045
/** Extra rings tucked inside the base inner radius (1 = one more center ring). */
const EXTRA_INNER_RINGS = 0
/** Global type-size multiplier — tune here (1 = previous size). */
const FONT_SCALE = 1.05
/** Constant ring-to-ring gap (fraction of min side) for every ring. */
const RING_GAP_RATIO = 0.029
/** Floor used when placing the innermost radius relative to type size. */
const MIN_GAP_TO_FONT = 1.05
/** Cap outward type growth so outer rings don’t dominate. */
const MAX_FONT_SCALE = 1.65
/** Each outward ring’s type size is this × the previous ring. */
const RING_SIZE_SCALE = 1.05
/** Extra along-path tracking so glyphs don’t read as a solid stroke. */
const LETTER_TRACKING = 1.12
/** Wavefront delay between rings (pond drop). */
const RIPPLE_STAGGER_MS = 48
const RIPPLE_DURATION_MS = 1400
/** Click swell: single smooth pulse duration. */
const SWELL_DURATION_MS = 1400
/** Wavefront travel time per px of ring distance from the click point. */
const WAVE_MS_PER_PX = 2.5
const SWELL_MAX_DELAY_MS = 900
/**
 * Splash amplitude at the clicked ring. Falls off as 1/sqrt(1 + dist/gap) —
 * circular-wave geometric spreading, so even far rings keep a visible pulse.
 */
const TAP_SPLASH = 0.14
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
/* Pond drop: fade-in + soft swell that never undershoots below scale(1).
   --splash is set per ring (largest at center, decaying outward). */
@keyframes lab-ring-ripple {
  0% {
    opacity: 0;
    transform: scale(1);
  }
  14% {
    opacity: 1;
    transform: scale(calc(1 + var(--splash, 0.1)));
    animation-timing-function: cubic-bezier(0.3, 0.6, 0.4, 1);
  }
  42% {
    opacity: 1;
    transform: scale(calc(1 + var(--splash, 0.1) * 0.38));
    animation-timing-function: cubic-bezier(0.3, 0.6, 0.4, 1);
  }
  68% {
    opacity: 1;
    transform: scale(calc(1 + var(--splash, 0.1) * 0.14));
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
/* Click swell: opacity pinned at 1 so retriggering never blanks the spiral;
   scale stays >= 1 (no trampoline undershoot). The envelope is sampled finely
   and interpolated LINEARLY — per-keyframe easings stall velocity at every
   boundary (measured: ~50ms near-stops each), which reads as stepping. */
@keyframes lab-ring-swell {
  0% {
    transform: scale(1);
  }
  10% {
    transform: scale(calc(1 + var(--splash, 0.1) * 0.52));
  }
  20% {
    transform: scale(calc(1 + var(--splash, 0.1) * 0.88));
  }
  30% {
    transform: scale(calc(1 + var(--splash, 0.1)));
  }
  42% {
    transform: scale(calc(1 + var(--splash, 0.1) * 0.78));
  }
  54% {
    transform: scale(calc(1 + var(--splash, 0.1) * 0.56));
  }
  66% {
    transform: scale(calc(1 + var(--splash, 0.1) * 0.38));
  }
  77% {
    transform: scale(calc(1 + var(--splash, 0.1) * 0.24));
  }
  87% {
    transform: scale(calc(1 + var(--splash, 0.1) * 0.13));
  }
  94% {
    transform: scale(calc(1 + var(--splash, 0.1) * 0.05));
  }
  100% {
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
  @keyframes lab-ring-swell {
    from { transform: none; }
    to { transform: none; }
  }
}
`

type Glyph = {
  char: string
  angle: number
  radius: number
  fontSize: number
}

type SourceToken =
  | { type: "word"; text: string }
  | { type: "sep" }

type RingLayer = {
  ripple: HTMLDivElement
  spin: HTMLDivElement
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  glyphs: Glyph[]
  /** Ring radius in stage px — drives click-wave distance math. */
  radius: number
}

type RippleOrigin = {
  x: number
  y: number
}

type TextSpiralProps = {
  words: ReadonlyArray<string>
  className?: string
}

/**
 * Concentric text rings as per-ring canvases: CSS spin per ring (odd
 * clockwise / even counter-clockwise) + CSS ripple entrance (compositor /
 * GPU). Sparse ASCII flicker rebakes bitmaps on a slow interval. Honors
 * prefers-reduced-motion. Hover shows a "click" tip that rides the cursor;
 * click sends a smooth water swell outward from the pointer position.
 */
function TextSpiral({ words, className }: TextSpiralProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const wordsKey = words.join("\0")
  const [motionOk, setMotionOk] = useState(() => {
    if (typeof window === "undefined") {
      return true
    }
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  })

  useEffect(() => {
    const reduceMedia = window.matchMedia("(prefers-reduced-motion: reduce)")
    const syncMotion = () => {
      setMotionOk(!reduceMedia.matches)
    }
    syncMotion()
    reduceMedia.addEventListener("change", syncMotion)
    return () => {
      reduceMedia.removeEventListener("change", syncMotion)
    }
  }, [])

  useEffect(() => {
    const root = rootRef.current
    const stage = stageRef.current
    if (!root || !stage) {
      return
    }

    const reduceMedia = window.matchMedia("(prefers-reduced-motion: reduce)")
    const tokens = buildTokens(words)
    if (tokens.length === 0) {
      return
    }

    let layers: RingLayer[] = []
    let flatGlyphs: { ring: number; index: number; char: string }[] = []
    let dpr = 1
    let cssWidth = 0
    let cssHeight = 0
    let flickerTimer = 0
    let swellUntil = 0
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
      const onDark = styles.getPropertyValue("--on-dark").trim() || "#fafafa"
      return { ink, onDark }
    }

    const clearLayers = () => {
      for (const layer of layers) {
        layer.ripple.remove()
      }
      layers = []
      flatGlyphs = []
    }

    const applyRipple = (ripple: HTMLDivElement, ringIndex: number) => {
      if (reduceMedia.matches) {
        ripple.style.opacity = "1"
        ripple.style.transform = "none"
        ripple.style.animation = "none"
        ripple.style.transformOrigin = ""
        return
      }

      ripple.style.transformOrigin = "50% 50%"

      const splash = SPLASH_CENTER * SPLASH_FALLOFF ** ringIndex
      ripple.style.setProperty("--splash", splash.toFixed(4))
      // Outer rings settle a touch sooner (wave loses energy).
      const duration = Math.round(
        RIPPLE_DURATION_MS * (1 - Math.min(0.28, ringIndex * 0.014))
      )
      // Smooth spring: long ease-out with overshoot baked into keyframes.
      ripple.style.animation = `lab-ring-ripple ${duration}ms cubic-bezier(0.22, 0.61, 0.36, 1) both`
      ripple.style.animationDelay = `${ringIndex * RIPPLE_STAGGER_MS}ms`
    }

    const retriggerRipple = (origin: RippleOrigin) => {
      if (reduceMedia.matches || layers.length === 0) {
        return
      }

      const cx = cssWidth / 2
      const cy = cssHeight / 2
      const originDist = Math.hypot(origin.x - cx, origin.y - cy)
      const gap = Math.min(cssWidth, cssHeight) * RING_GAP_RATIO

      for (const layer of layers) {
        // Wavefront crosses rings by distance from the click, not ring index;
        // amplitude spreads like a circular water wave (1/sqrt) so the pulse
        // stays visible across the whole canvas instead of dying nearby.
        const dist = Math.abs(layer.radius - originDist)
        const delay = Math.min(dist * WAVE_MS_PER_PX, SWELL_MAX_DELAY_MS)
        const splash = TAP_SPLASH / Math.sqrt(1 + dist / gap)

        const ripple = layer.ripple
        ripple.style.animation = "none"
        // Force a style flush so the next animation assignment restarts.
        void ripple.offsetWidth
        ripple.style.transformOrigin = `${origin.x}px ${origin.y}px`
        ripple.style.setProperty("--splash", splash.toFixed(4))
        ripple.style.animation = `lab-ring-swell ${SWELL_DURATION_MS}ms linear both`
        ripple.style.animationDelay = `${Math.round(delay)}ms`
      }

      // Suppress flicker rebakes while the swell runs: their ~90ms canvas
      // re-raster stalls the renderer mid-wave (measured on the 520ms cadence).
      swellUntil = performance.now() + SWELL_MAX_DELAY_MS + SWELL_DURATION_MS
    }

    const stagePointFromClient = (clientX: number, clientY: number): RippleOrigin => {
      const rect = stage.getBoundingClientRect()
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      }
    }

    const makeRippleShell = () => {
      const shell = document.createElement("div")
      shell.className = "pointer-events-none absolute inset-0 will-change-transform"
      shell.setAttribute("aria-hidden", "true")
      return shell
    }

    const makeSpinShell = (ringIndex: number) => {
      const shell = document.createElement("div")
      shell.className = "pointer-events-none absolute inset-0 will-change-transform"
      shell.setAttribute("aria-hidden", "true")

      if (reduceMedia.matches) {
        shell.style.animation = "none"
        shell.style.transform = "none"
      } else {
        // 1-based odd rings → clockwise; even → counter-clockwise.
        const direction = ringIndex % 2 === 0 ? "normal" : "reverse"
        shell.style.animation = `lab-spiral-spin ${SPIN_DURATION_S}s linear infinite`
        shell.style.animationDirection = direction
      }

      return shell
    }

    const layout = () => {
      clearLayers()

      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = stage.getBoundingClientRect()
      cssWidth = Math.max(1, rect.width)
      cssHeight = Math.max(1, rect.height)

      const probe = document.createElement("canvas")
      const probeCtx = probe.getContext("2d")
      if (!probeCtx) {
        return
      }

      const minSide = Math.min(cssWidth, cssHeight)
      const baseFontSize =
        Math.max(7, Math.min(10, minSide * 0.011)) * FONT_SCALE
      const maxRadius = Math.hypot(cssWidth, cssHeight) / 2
      const gap = minSide * RING_GAP_RATIO
      // Start one (or more) gap inward so the center gains an extra ring.
      const inner = Math.max(
        baseFontSize * MIN_GAP_TO_FONT,
        minSide * INNER_RADIUS_RATIO - EXTRA_INNER_RINGS * gap
      )
      let radius = inner
      let tokenIndex = 0
      let charInWord = 0
      let ring = 0
      let totalGlyphs = 0

      const stepFor = (ch: string, fontSize: number, atRadius: number) => {
        const charWidth = measureChar(probeCtx, ch, fontSize) * LETTER_TRACKING
        return Math.max(0.035, charWidth / Math.max(atRadius, 1))
      }

      /** Arc length (radians) needed to place every letter of a word from `fromAngle`. */
      const wordArcLength = (
        text: string,
        fontSize: number,
        atRadius: number
      ) => {
        let arc = 0
        for (let i = 0; i < text.length; i++) {
          arc += stepFor(text[i] ?? "·", fontSize, atRadius)
        }
        return arc
      }

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
          const token = tokens[tokenIndex % tokens.length]!
          let ch: string
          let nextTokenIndex = tokenIndex
          let nextCharInWord = charInWord

          if (token.type === "word" && charInWord > 0) {
            // Finish the current word — never inject separators mid-word.
            ch = token.text[charInWord] ?? WORD_SEP
            nextCharInWord = charInWord + 1
            if (nextCharInWord >= token.text.length) {
              nextCharInWord = 0
              nextTokenIndex = tokenIndex + 1
            }
          } else if (token.type === "word") {
            const remaining = endAngle - angle
            const needs = wordArcLength(token.text, ringFont, radius)
            if (needs > remaining) {
              // Not enough arc left for the whole word; pad with dots.
              ch = WORD_SEP
            } else if (Math.random() < density) {
              ch = token.text[0] ?? WORD_SEP
              nextCharInWord = 1
              if (nextCharInWord >= token.text.length) {
                nextCharInWord = 0
                nextTokenIndex = tokenIndex + 1
              }
            } else {
              // Sparse filler between words only.
              ch = WORD_SEP
            }
          } else if (Math.random() < density) {
            // Inter-word separator from the token stream.
            ch = WORD_SEP
            nextTokenIndex = tokenIndex + 1
          } else {
            // Sparse filler; do not consume the next word.
            ch = WORD_SEP
          }

          const step = stepFor(ch, ringFont, radius)

          if (angle + step * 0.5 > endAngle) {
            break
          }

          tokenIndex = nextTokenIndex
          charInWord = nextCharInWord

          ringGlyphs.push({
            char: ch,
            angle,
            radius,
            fontSize: ringFont,
          })

          angle += step
        }

        if (ringGlyphs.length > 0) {
          const ringIndex = layers.length
          const canvas = document.createElement("canvas")
          canvas.width = Math.max(1, Math.round(cssWidth * dpr))
          canvas.height = Math.max(1, Math.round(cssHeight * dpr))
          canvas.setAttribute("aria-hidden", "true")
          canvas.className =
            "pointer-events-none absolute inset-0 h-full w-full max-w-none"
          const ctx = canvas.getContext("2d", { alpha: true })
          if (!ctx) {
            break
          }

          const ripple = makeRippleShell()
          applyRipple(ripple, ringIndex)

          const spin = makeSpinShell(ringIndex)
          spin.appendChild(canvas)
          ripple.appendChild(spin)
          stage.appendChild(ripple)

          layers.push({ ripple, spin, canvas, ctx, glyphs: ringGlyphs, radius })

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
      ctx.globalAlpha = 1

      const cx = cssWidth / 2
      const cy = cssHeight / 2
      let lastFont = -1
      let lastAlpha = 1

      for (let i = 0; i < glyphs.length; i++) {
        if (hidden.has(i)) {
          continue
        }

        const glyph = glyphs[i]
        if (glyph.fontSize !== lastFont) {
          ctx.font = `${glyph.fontSize}px ${FONT_STACK}`
          lastFont = glyph.fontSize
        }

        const alpha = glyph.char === WORD_SEP ? SEP_ALPHA : 1
        if (alpha !== lastAlpha) {
          ctx.globalAlpha = alpha
          lastAlpha = alpha
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

      ctx.globalAlpha = 1
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

    const rebuild = () => {
      layout()
      paintAll(pickHiddenByRing())
    }

    const onFlicker = () => {
      if (!visible || reduceMedia.matches || performance.now() < swellUntil) {
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

    const onActivate = (clientX: number, clientY: number) => {
      retriggerRipple(stagePointFromClient(clientX, clientY))
    }

    const onClick = (event: MouseEvent) => {
      if (reduceMedia.matches) {
        return
      }
      onActivate(event.clientX, event.clientY)
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (reduceMedia.matches) {
        return
      }
      if (event.key !== "Enter" && event.key !== " ") {
        return
      }
      event.preventDefault()
      const rect = stage.getBoundingClientRect()
      onActivate(rect.left + rect.width / 2, rect.top + rect.height / 2)
    }

    rebuild()
    startFlicker()

    const observer = new ResizeObserver(onResize)
    observer.observe(root)
    document.addEventListener("visibilitychange", onVisibility)
    reduceMedia.addEventListener("change", onMotionChange)
    root.addEventListener("click", onClick)
    root.addEventListener("keydown", onKeyDown)

    return () => {
      window.clearInterval(flickerTimer)
      observer.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      reduceMedia.removeEventListener("change", onMotionChange)
      root.removeEventListener("click", onClick)
      root.removeEventListener("keydown", onKeyDown)
      clearLayers()
    }
  }, [wordsKey, words])

  const chipRef = useRef<HTMLDivElement>(null)
  const chipTimer = useRef(0)

  useEffect(() => {
    return () => {
      window.clearTimeout(chipTimer.current)
    }
  }, [])

  const positionChip = (clientX: number, clientY: number) => {
    const root = rootRef.current
    const chip = chipRef.current
    if (!root || !chip) {
      return
    }
    const rect = root.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    // Flip below the cursor near the top edge (root clips overflow).
    chip.style.transform =
      y > 48
        ? `translate3d(${x}px, ${y - 12}px, 0) translate(-50%, -100%)`
        : `translate3d(${x}px, ${y + 16}px, 0) translate(-50%, 0)`
  }

  const onRootEnter = () => {
    window.clearTimeout(chipTimer.current)
    chipTimer.current = window.setTimeout(() => {
      const chip = chipRef.current
      if (chip) {
        chip.style.opacity = "1"
      }
    }, 250)
  }

  const onRootMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    positionChip(event.clientX, event.clientY)
  }

  const onRootLeave = () => {
    window.clearTimeout(chipTimer.current)
    chipTimer.current = 0
    const chip = chipRef.current
    if (chip) {
      chip.style.opacity = "0"
    }
  }

  const onRootFocus = () => {
    const root = rootRef.current
    if (!root) {
      return
    }
    const rect = root.getBoundingClientRect()
    positionChip(rect.left + rect.width / 2, rect.top + rect.height / 2)
    const chip = chipRef.current
    if (chip) {
      chip.style.opacity = "1"
    }
  }

  const rootClassName = cn(
    "bg-surface-ink relative flex items-center justify-center overflow-hidden",
    motionOk && "cursor-pointer",
    className
  )

  return (
    <div
      ref={rootRef}
      role={motionOk ? "button" : undefined}
      tabIndex={motionOk ? 0 : undefined}
      aria-label={motionOk ? "click" : undefined}
      className={rootClassName}
      onMouseEnter={motionOk ? onRootEnter : undefined}
      onMouseMove={motionOk ? onRootMove : undefined}
      onMouseLeave={motionOk ? onRootLeave : undefined}
      onFocus={motionOk ? onRootFocus : undefined}
      onBlur={motionOk ? onRootLeave : undefined}
    >
      <style>{SPIRAL_KEYFRAMES}</style>
      <div
        ref={stageRef}
        aria-hidden
        className="relative h-[140%] w-[140%] max-w-none shrink-0"
      />
      {motionOk && (
        <div
          ref={chipRef}
          aria-hidden
          className="bg-foreground text-background pointer-events-none absolute top-0 left-0 z-10 rounded-md px-3 py-1.5 text-xs opacity-0 transition-opacity duration-150 will-change-transform"
        >
          CLICK
        </div>
      )}
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

/**
 * Flatten phrases into whole-word tokens separated by middots. Letters of a
 * word always stay contiguous; separators exist only between words.
 */
function buildTokens(words: ReadonlyArray<string>): SourceToken[] {
  const cleaned = words
    .map((phrase) => phrase.trim())
    .filter((phrase) => phrase.length > 0)
    .flatMap((phrase) =>
      phrase
        .toUpperCase()
        .split(/\s+/)
        .map((word) => word.trim())
        .filter((word) => word.length > 0)
    )

  if (cleaned.length === 0) {
    return []
  }

  const tokens: SourceToken[] = []
  for (const word of cleaned) {
    tokens.push({ type: "word", text: word })
    tokens.push({ type: "sep" })
  }
  return tokens
}

export { TextSpiral }
