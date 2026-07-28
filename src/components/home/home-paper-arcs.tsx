import { cn } from "@/lib/utils"

type HomePaperArcsProps = {
  className?: string
}

/**
 * Quiet concentric arcs for purple paper bands — poster-rail texture
 * that fills empty violet without competing with type or logos.
 */
function HomePaperArcs({ className }: HomePaperArcsProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden text-on-dark",
        className
      )}
      aria-hidden
    >
      <span className="absolute -top-[28%] -right-[18%] block size-[78%] rounded-full border-[1.5px] border-current opacity-25" />
      <span className="absolute -top-[8%] -right-[34%] block size-[96%] rounded-full border border-current opacity-15" />
      <span className="absolute top-[38%] -left-[26%] block size-[52%] rounded-full border border-current opacity-12" />
    </div>
  )
}

export { HomePaperArcs }
export type { HomePaperArcsProps }
