import { Link } from "@tanstack/react-router"

import { SiteLogo } from "@/components/chrome/site-logo"
import { HomeMediaCarousel } from "@/components/home/home-media-carousel"
import { RedeemQrModal } from "@/components/redeem/redeem-qr-modal"
import type { CampaignQrCopy, Locale, MicrocopyContent } from "@/content/types"
import { cn } from "@/lib/utils"

type RedeemHeroMobileProps = {
  locale: Locale
  microcopy: MicrocopyContent
  mediaSrcs: ReadonlyArray<string>
  mediaAlt: string
  qrContent: CampaignQrCopy
  left: React.ReactNode
  right: React.ReactNode
  leftFooter?: React.ReactNode
  className?: string
}

function RedeemHeroMobile({
  locale,
  mediaSrcs,
  mediaAlt,
  qrContent,
  left,
  right,
  leftFooter,
  className,
}: RedeemHeroMobileProps) {
  return (
    <div className={cn("relative", className)}>
      <section
        className="bg-surface-ink relative w-full min-h-[100dvh]"
        aria-label={mediaAlt}
      >
        <HomeMediaCarousel
          images={mediaSrcs}
          alt={mediaAlt}
          intervalMs={4500}
        />
        <div
          className="from-black via-black/70 to-black/25 absolute inset-0 z-1 bg-gradient-to-t"
          aria-hidden
        />

        <div
          className={cn(
            "relative z-10 flex min-h-[100dvh] flex-col justify-between gap-8 px-5 pb-12",
            "pt-[calc(var(--site-header-offset)+0.5rem)]"
          )}
        >
          <div className="[&_button]:text-on-dark [&_button]:hover:bg-on-dark/10 [&_button]:hover:text-on-dark flex items-center justify-between gap-3">
            <Link
              to="/$locale"
              params={{ locale }}
              aria-label="Ai Labs"
              className="focus-visible:ring-ring/50 rounded-sm focus-visible:ring-2 focus-visible:outline-none"
            >
              <SiteLogo variant="lockup" onDark className="h-5 w-auto" />
            </Link>
            <RedeemQrModal content={qrContent} onDark />
          </div>

          <div className="flex flex-col gap-8">
            {left}
            {right}
            {leftFooter}
          </div>
        </div>
      </section>
    </div>
  )
}

export { RedeemHeroMobile }
export type { RedeemHeroMobileProps }
