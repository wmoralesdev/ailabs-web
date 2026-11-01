import { HalftoneLens } from "@/components/halftone/halftone-lens"
import { PrintCell } from "@/components/home/print-cell"
import { EVENT_PHOTOS } from "@/content/event-photos"
import type { EventPhoto } from "@/content/event-photos"
import { cn } from "@/lib/utils"

type CampaignHeroProps = {
  /** Real event photo at the right. Omit to print the Ai Labs mark instead. */
  photo?: EventPhoto
  /** Static heroes fill one viewport (like home); dynamic flows grow. */
  fluid?: boolean
  footer?: React.ReactNode
  children: React.ReactNode
}

/**
 * Shared split hero for campaign-style routes (today the booking page):
 * copy on paper at the left; at the right a real event photo with the
 * halftone lens under the pointer, or the mark printed as dots when no photo
 * belongs there.
 */
function CampaignHero({
  photo,
  fluid = false,
  footer,
  children,
}: CampaignHeroProps) {
  const size = photo ? EVENT_PHOTOS[photo.name] : undefined

  return (
    <section
      className={cn(
        "grid grid-cols-1 bg-background text-foreground lg:grid-cols-12",
        !fluid && "lg:min-h-[calc(100svh-var(--site-header-height))]"
      )}
    >
      <div className="page-gutter flex min-w-0 flex-col justify-between gap-12 pt-10 pb-12 sm:pt-14 lg:col-span-7 lg:pt-[clamp(2.5rem,8svh,5.5rem)] lg:pr-12">
        <div
          className={cn(
            "flex w-full max-w-2xl flex-col items-start gap-5",
            !footer && "flex-1 justify-center"
          )}
        >
          {children}
        </div>

        {footer}
      </div>

      <div className="page-gutter pb-[var(--space-gutter)] lg:col-span-5 lg:py-[var(--space-gutter)] lg:pl-0">
        <div className="relative aspect-[4/3] h-full w-full lg:aspect-auto">
          {photo && size ? (
            <HalftoneLens
              src={`/carousel/${photo.name}`}
              alt={photo.alt}
              width={size.width}
              height={size.height}
              sizes="(min-width: 1024px) 42vw, 100vw"
              priority
              className="absolute inset-0 size-full rounded-3xl"
            />
          ) : (
            <PrintCell
              src="/brand/ailabs-iso-dark.svg"
              tone="night"
              className="absolute inset-0 size-full rounded-3xl"
            />
          )}
        </div>
      </div>
    </section>
  )
}

export { CampaignHero }
export type { CampaignHeroProps }
