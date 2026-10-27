import { HalftoneLens } from "@/components/halftone/halftone-lens"
import { RedeemQrModal } from "@/components/redeem/redeem-qr-modal"
import type { CampaignQrCopy, Locale } from "@/content/types"
import { EVENT_PHOTOS } from "@/content/event-photos"
import type { EventPhoto } from "@/content/event-photos"
import { cn } from "@/lib/utils"

type CampaignHeroProps = {
  locale: Locale
  /** Real event photo printed as halftone on the purple panel. */
  photo: EventPhoto
  qrContent?: CampaignQrCopy
  /** Static heroes fill one viewport (like home); dynamic flows grow. */
  fluid?: boolean
  footer?: React.ReactNode
  children: React.ReactNode
}

/**
 * Shared split hero for the campaign routes (community, campus leader,
 * redeem): copy on paper at the left, a real event photo at the right with
 * the halftone lens under the pointer.
 */
function CampaignHero({
  photo,
  qrContent,
  fluid = false,
  footer,
  children,
}: CampaignHeroProps) {
  const size = EVENT_PHOTOS[photo.name]

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
          <HalftoneLens
            src={`/carousel/${photo.name}`}
            alt={photo.alt}
            width={size.width}
            height={size.height}
            sizes="(min-width: 1024px) 42vw, 100vw"
            priority
            className="absolute inset-0 size-full rounded-3xl"
          />
          {qrContent ? (
            <div className="absolute top-3 right-3 z-10 rounded-full bg-background sm:top-4 sm:right-4">
              <RedeemQrModal content={qrContent} onDark={false} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export { CampaignHero }
export type { CampaignHeroProps }
