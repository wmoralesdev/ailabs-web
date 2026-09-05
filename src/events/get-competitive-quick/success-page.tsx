import { Link } from "@tanstack/react-router"

import { SiteLogo } from "@/components/chrome/site-logo"
import { HomePaperArcs } from "@/components/home/home-paper-arcs"
import type { Locale } from "@/content"
import { getGetCompetitiveQuickContent } from "@/events/get-competitive-quick/content"

type GetCompetitiveQuickSuccessPageProps = {
  locale: Locale
  paymentStatus?: string
  redirectValid?: boolean | null
}

function GetCompetitiveQuickSuccessPage({
  locale,
  paymentStatus = "unknown",
  redirectValid = null,
}: GetCompetitiveQuickSuccessPageProps) {
  const content = getGetCompetitiveQuickContent(locale)
  const confirmed =
    paymentStatus === "PAID" ||
    (redirectValid === true && paymentStatus !== "FAILED")

  const title = confirmed ? content.success.title : content.success.pendingTitle
  const body = confirmed ? content.success.body : content.success.pendingBody

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-background text-foreground">
      <HomePaperArcs className="text-foreground/[0.07] dark:text-foreground/[0.12]" />

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 pt-[calc(var(--site-header-offset)+1rem)] pb-16 sm:px-10">
        <Link
          to="/"
          aria-label="Ai Labs"
          className="-my-2 inline-flex w-fit rounded-sm py-2 focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
        >
          <SiteLogo variant="lockup" className="h-7 w-auto" />
        </Link>

        <div className="flex flex-1 flex-col justify-center py-14">
          <p className="font-mono text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            {content.success.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[0.9] font-black tracking-[-0.03em] uppercase md:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-prose text-base leading-relaxed text-foreground/85 md:text-lg">
            {body}
          </p>

          {/* Same numbered device as the outcomes ledger — violet as fill, not type. */}
          <h2 className="mt-12 font-display text-xl font-semibold tracking-tight md:text-2xl">
            {content.success.nextStepsTitle}
          </h2>
          <ol className="mt-4 divide-y divide-foreground/15 border-y border-foreground/25">
            {content.success.nextSteps.map((step, index) => (
              <li key={step} className="flex items-baseline gap-4 py-4">
                <span
                  className="inline-flex shrink-0 items-center justify-center bg-primary px-2 py-1 font-mono text-sm font-bold text-primary-foreground tabular-nums"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-relaxed text-foreground/85 md:text-base">
                  {step}
                </span>
              </li>
            ))}
          </ol>

          <Link
            to="/"
            className="mt-10 inline-flex min-h-11 w-fit items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold tracking-wide text-primary-foreground transition-[background-color,transform] duration-200 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-foreground/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none active:translate-y-px"
          >
            {content.success.homeCta}
          </Link>
        </div>
      </div>
    </div>
  )
}

export { GetCompetitiveQuickSuccessPage }
