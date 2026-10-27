import { cn } from "@/lib/utils"

const mainCardClassName = "relative flex shrink-0 flex-col"

type MainCardProps = {
  children: React.ReactNode
  className?: string
}

/**
 * The page's opening block on inner pages: flat paper, no frame. Owned by
 * pages so content (e.g. marketing sections) can render below it.
 */
function MainCard({ children, className }: MainCardProps) {
  return (
    <div className={cn(mainCardClassName, className)}>
      <div className="relative flex min-h-full w-full flex-1 flex-col">
        {children}
      </div>
    </div>
  )
}

export { MainCard }
