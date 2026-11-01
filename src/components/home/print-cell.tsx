import { HalftoneCanvas } from "@/components/halftone/halftone-canvas"
import type { ShapeName } from "@/lib/halftone-shapes"
import { cn } from "@/lib/utils"

const printTones = {
  purple:
    "bg-purple [--ht-accent:var(--color-print)] [--ht-faint:color-mix(in_srgb,var(--color-on-purple)_14%,transparent)] [--ht-ink:var(--color-on-purple)]",
  night:
    "bg-night ring-1 ring-snow/10 ring-inset [--ht-accent:var(--color-snow)] [--ht-faint:color-mix(in_srgb,var(--color-snow)_12%,transparent)] [--ht-ink:var(--color-purple)]",
} as const

type PrintTone = keyof typeof printTones

type PrintCellProps = {
  /** One of the halftone shapes, or omit it and pass `src`. */
  shape?: ShapeName
  /** An SVG to print, such as the Ai Labs mark. */
  src?: string
  tone: PrintTone
  className?: string
}

/**
 * A pure-halftone cell: the shape or mark printed live as dots and inked by
 * the pointer. It stands where a photo would go when there is no photo that
 * belongs there.
 */
function PrintCell({ shape, src, tone, className }: PrintCellProps) {
  return (
    <div
      data-reveal
      data-halftone-surface
      className={cn(
        "relative overflow-clip rounded-2xl",
        "aspect-square lg:aspect-auto",
        printTones[tone],
        className
      )}
    >
      <HalftoneCanvas
        shape={shape}
        src={src ?? (shape ? undefined : "/brand/ailabs-iso-dark.svg")}
        cell={10}
        density={30}
        area={{ left: 0.12, top: 0.12, width: 0.76, height: 0.76 }}
        className="absolute inset-0"
      />
    </div>
  )
}

export { PrintCell }
export type { PrintCellProps, PrintTone }
