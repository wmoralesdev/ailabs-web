import { HalftonePhoto } from "@/components/halftone/halftone-photo"
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
 * redeem): copy on paper at the left, a real event photo printed in graphite
 * on the purple field at the right. The photo develops on hover.
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

      <div className="relative aspect-[4/3] w-full lg:col-span-5 lg:aspect-auto">
        <HalftonePhoto
          name={photo.name}
          alt={photo.alt}
          width={size.width}
          height={size.height}
          sizes="(min-width: 1024px) 42vw, 100vw"
          tone="bg-purple text-on-purple"
          priority
          fill
        />
        {qrContent ? (
          <div className="absolute top-3 right-3 z-10 bg-background sm:top-4 sm:right-4">
            <RedeemQrModal content={qrContent} onDark={false} />
          </div>
        ) : null}
      </div>
    </section>
  )
}

export { CampaignHero }
export type { CampaignHeroProps }
