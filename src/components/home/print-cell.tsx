import { HalftoneCanvas } from "@/components/halftone/halftone-canvas"
import type { ShapeName } from "@/lib/halftone-shapes"
import { cn } from "@/lib/utils"

/**
 * Inks for the lit print on a dark or coloured field, read like the hero in
 * the dark theme: the lit side in `--ht-ink`, the shade in `--ht-accent`.
 */
const printTones = {
  purple:
    "bg-purple [--ht-ramp:off] [--ht-accent:var(--color-print)] [--ht-ink:var(--color-on-purple)]",
  night:
    "bg-night ring-1 ring-snow/10 ring-inset [--ht-ramp:off] [--ht-accent:var(--brand-purple-soft)] [--ht-ink:var(--color-snow)]",
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
 * A pure-halftone cell: the shape or mark printed live as dots in light and
 * shade, like the hero mark, with the pointer moving the lamp. It stands where a photo would go when there is no photo that
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
        rest={0}
        volume
        area={{ left: 0.12, top: 0.12, width: 0.76, height: 0.76 }}
        className="absolute inset-0"
      />
    </div>
  )
}

export { PrintCell }
export type { PrintCellProps, PrintTone }
