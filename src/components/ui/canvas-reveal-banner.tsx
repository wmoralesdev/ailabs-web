import type { ReactNode } from "react"

import { HalftoneField } from "@/components/halftone/halftone-field"
import {
  homeBandPaddingClassName,
  homeShellClassName,
} from "@/components/home/home-styles"
import { cn } from "@/lib/utils"

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
   * their container here so the band aligns with the sections above it.
   */
  shellClassName?: string
}

/**
 * Full-bleed, theme-invariant night CTA band with a moving halftone field.
 * Dialogs and forms should live outside this tree so they keep normal page
 * theme tokens.
 */
function CanvasRevealBanner({
  id,
  className,
  contentClassName,
  children,
  action,
  shellClassName = homeShellClassName,
}: CanvasRevealBannerProps) {
  return (
    <section
      id={id}
      className={cn(
        "surface-night relative isolate overflow-clip text-on-dark",
        homeBandPaddingClassName,
        className
      )}
    >
      <HalftoneField
        seed={1.2}
        fade="up"
        className="absolute inset-0 -z-10 text-purple-deep opacity-70"
      />

      <div
        className={cn(
          shellClassName,
          "relative",
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
