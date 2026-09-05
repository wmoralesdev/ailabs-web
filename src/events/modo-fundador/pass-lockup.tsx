import { Link } from "@tanstack/react-router"

import { SiteLogo } from "@/components/chrome/site-logo"
import { cn } from "@/lib/utils"

type PassLockupProps = {
  className?: string
}

/**
 * The lockup's "Ai" glyph is violet, so on the violet pass face it disappears.
 * Printing it on a graphite block restores it (4.8:1) and reads as ticket
 * chrome rather than a sticker — a white plate would only reach 3.5:1.
 */
function PassLockup({ className }: PassLockupProps) {
  return (
    <Link
      to="/"
      aria-label="Ai Labs"
      className={cn(
        "inline-flex w-fit items-center rounded-md bg-primary-foreground px-3 py-2 transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:outline-none",
        className
      )}
    >
      <SiteLogo variant="lockup" onDark className="h-5 w-auto sm:h-6" />
    </Link>
  )
}

export { PassLockup }
