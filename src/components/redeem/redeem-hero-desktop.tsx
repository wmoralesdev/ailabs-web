import { Link } from "@tanstack/react-router"

import { SiteLogo } from "@/components/chrome/site-logo"
import { HomeHeroStipple } from "@/components/home/home-hero-stipple"
import { HomeMediaCarousel } from "@/components/home/home-media-carousel"
import {
  homeCardClassName,
  homeShellClassName,
} from "@/components/home/home-styles"
import { RedeemQrModal } from "@/components/redeem/redeem-qr-modal"
import type { CampaignQrCopy, Locale, MicrocopyContent } from "@/content/types"
import { cn } from "@/lib/utils"

type RedeemHeroDesktopProps = {
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

function RedeemHeroDesktop({
  locale,
  mediaSrcs,
  mediaAlt,
  qrContent,
  left,
  right,
  leftFooter,
  className,
}: RedeemHeroDesktopProps) {
  return (
    <section
      className={cn(
        homeShellClassName,
        "min-h-dvh flex-col pt-[var(--site-header-offset)] pb-10 md:pb-14",
        className
      )}
    >
      <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-1 gap-5">
        <div
          className={cn(
            homeCardClassName,
            "home-hero-invert bg-surface-ink relative flex h-full min-h-0 flex-col p-6 sm:p-8 md:p-10",
            "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500"
          )}
        >
          <HomeHeroStipple />
          <div className="relative z-10 flex min-h-0 flex-1 flex-col gap-10">
            <div className="flex items-center justify-between gap-4">
              <Link
                to="/$locale"
                params={{ locale }}
                aria-label="Ai Labs"
                className="focus-visible:ring-ring/50 rounded-sm focus-visible:ring-2 focus-visible:outline-none"
              >
                <SiteLogo variant="lockup" onDark />
              </Link>
            </div>

            <div className="flex min-h-0 flex-1 flex-col justify-center py-4">
              {left}
            </div>

            {leftFooter}
          </div>
        </div>

        <div
          className={cn(
            homeCardClassName,
            "bg-surface-ink relative flex h-full flex-col overflow-hidden",
            "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:delay-100 motion-safe:duration-500"
          )}
        >
          <HomeMediaCarousel
            images={mediaSrcs}
            alt={mediaAlt}
            intervalMs={4500}
          />
          <div className="absolute inset-0 z-[2] bg-black/55" aria-hidden />

          <div className="relative z-10 flex h-full flex-col p-6 sm:p-8 md:p-10">
            <div className="[&_button]:text-on-dark [&_button]:hover:bg-on-dark/10 [&_button]:hover:text-on-dark flex items-center justify-end gap-1">
              <RedeemQrModal content={qrContent} />
            </div>

            <div className="flex min-h-0 flex-1 flex-col justify-end pt-8">
              {right}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { RedeemHeroDesktop }
export type { RedeemHeroDesktopProps }
