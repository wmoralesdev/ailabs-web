import { useEffect, useState } from "react"
import type { ReactNode } from "react"

import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect"
import {
  homeBandPaddingClassName,
  homeShellClassName,
} from "@/components/home/home-styles"
import { cn } from "@/lib/utils"

/** Brand purple → deeper violet for the canvas dots (RGB for the shader). */
const CANVAS_COLORS: number[][] = [
  [167, 139, 250],
  [124, 58, 237],
]

type CanvasRevealBannerProps = {
  id?: string
  className?: string
  contentClassName?: string
  children: ReactNode
  /**
   * Optional right-side action (usually a CTA). When set, children sit in a
   * left copy column and the action is vertically centered on `md+`.
   */
  action?: ReactNode
  /**
   * Replaces the home shell (max-width + gutter). Pages on their own grid pass
   * their container here so the band aligns with the sections above it —
   * `contentClassName` can't do this because the shell's custom `page-gutter`
   * and `max-w-content` utilities aren't resolvable by tailwind-merge.
   */
  shellClassName?: string
}

/**
 * Full-bleed, theme-invariant dark CTA band with purple canvas-reveal dots.
 * Uses surface-ink / on-dark; Dialogs and forms should live outside this tree
 * so they keep normal page theme tokens.
 */
function CanvasRevealBanner({
  id,
  className,
  contentClassName,
  children,
  action,
  shellClassName = homeShellClassName,
}: CanvasRevealBannerProps) {
  const [reduceMotion, setReduceMotion] = useState(true)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduceMotion(media.matches)
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [])

  return (
    <section
      id={id}
      className={cn(
        "home-hero-invert relative scroll-mt-8 overflow-hidden bg-surface-ink text-on-dark",
        homeBandPaddingClassName,
        className
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {reduceMotion ? (
          <div className="absolute inset-0 bg-linear-to-b from-purple/35 via-background to-background" />
        ) : (
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-background"
            colors={CANVAS_COLORS}
            dotSize={2}
            showGradient
          />
        )}
      </div>

      <div
        className={cn(
          shellClassName,
          "relative z-1",
          action
            ? "flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-10"
            : null,
          contentClassName
        )}
      >
        {action ? (
          <>
            <div className="flex max-w-xl min-w-0 flex-col gap-4 md:gap-5">
              {children}
            </div>
            <div className="shrink-0 self-start md:self-center">{action}</div>
          </>
        ) : (
          children
        )}
      </div>
    </section>
  )
}

export { CanvasRevealBanner }
