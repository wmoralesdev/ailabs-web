import { MainGridBackground } from "@/components/chrome/main-grid-background"
import { cn } from "@/lib/utils"

const mainCardClassName =
  "relative mx-2 mt-[var(--main-card-margin-top)] mb-[var(--main-card-margin-bottom)] flex min-h-[var(--main-card-min-height)] shrink-0 overflow-hidden rounded-xl border border-border bg-muted/30 p-2 sm:mx-3 sm:p-3"

type MainCardProps = {
  children: React.ReactNode
  className?: string
  /** Aperture pages opt out of the dotted grid. */
  textured?: boolean
}

/**
 * The bordered "app window" surface with the dotted grid texture. Owned by
 * pages so content (e.g. marketing sections) can render below it, outside the
 * card and its texture.
 */
function MainCard({ children, className, textured = true }: MainCardProps) {
  return (
    <div className={cn(mainCardClassName, className)}>
      {textured ? <MainGridBackground /> : null}
      <div className="relative z-10 flex min-h-full w-full flex-1 flex-col">
        {children}
      </div>
    </div>
  )
}

export { MainCard }
