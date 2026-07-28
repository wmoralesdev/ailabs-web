import { Link } from "@tanstack/react-router"

import { SiteLogo } from "@/components/chrome/site-logo"
import { TextSpiral } from "@/components/lab/text-spiral"
import { RedeemQrModal } from "@/components/redeem/redeem-qr-modal"
import type { CampaignQrCopy, Locale } from "@/content/types"
import { cn } from "@/lib/utils"

type CampaignHeroProps = {
  locale: Locale
  /** Route-specific phrases painted into the ink spiral panel. */
  words: ReadonlyArray<string>
  qrContent?: CampaignQrCopy
  /** Static heroes lock to one viewport (like home); dynamic flows grow. */
  fluid?: boolean
  footer?: React.ReactNode
  children: React.ReactNode
}

function CampaignHero({
  locale,
  words,
  qrContent,
  fluid = false,
  footer,
  children,
}: CampaignHeroProps) {
  return (
    <section
      className={cn(
        "bg-background text-foreground grid min-h-dvh grid-cols-1 lg:grid-cols-2",
        !fluid && "lg:h-dvh lg:overflow-hidden"
      )}
    >
      <div className="border-border flex min-h-0 w-full flex-col justify-between gap-10 border-b px-6 pt-[calc(var(--site-header-offset)+0.5rem)] pb-8 sm:px-10 sm:pb-10 lg:border-r lg:border-b-0 lg:px-12 lg:pb-12 xl:px-16">
        <div>
          <Link
            to="/$locale"
            params={{ locale }}
            aria-label="Ai Labs"
            className="focus-visible:ring-ring/50 inline-flex rounded-sm focus-visible:ring-2 focus-visible:outline-none"
          >
            <SiteLogo variant="lockup" />
          </Link>
        </div>

        <div
          className={cn(
            "flex w-full max-w-xl flex-col gap-5",
            !footer && "flex-1 justify-center"
          )}
        >
          {children}
        </div>

        {footer}
      </div>

      <div className="bg-surface-ink relative min-h-[50vh] w-full lg:min-h-0">
        <TextSpiral words={words} className="absolute inset-0 h-full w-full" />
        {qrContent ? (
          <div className="absolute top-4 right-4 z-10 sm:right-6 lg:top-[calc(var(--site-header-offset)+0.5rem)] lg:right-8">
            <RedeemQrModal content={qrContent} onDark />
          </div>
        ) : null}
      </div>
    </section>
  )
}

export { CampaignHero }
export type { CampaignHeroProps }
