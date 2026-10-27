import { cn } from "@/lib/utils"

type HomePaperArcsProps = {
  className?: string
}

/**
 * Quiet halftone texture for purple bands: a dot screen that thins out from
 * one corner, so empty violet reads as print without competing with type.
 */
function HomePaperArcs({ className }: HomePaperArcsProps) {
  return (
    <div
      className={cn(
        "dot-screen pointer-events-none absolute inset-0 [mask-image:radial-gradient(120%_90%_at_100%_0%,#000_0%,transparent_60%)] [--dot-r:32%] [--dot-size:9px] [--dot:var(--color-purple-deep)]",
        className
      )}
      aria-hidden
    />
  )
}

export { HomePaperArcs }
export type { HomePaperArcsProps }
