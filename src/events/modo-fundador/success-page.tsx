import { Link } from "@tanstack/react-router"

import type { Locale } from "@/content"
import { getModoFundadorContent } from "@/events/modo-fundador/content"
import { PassLockup } from "@/events/modo-fundador/pass-lockup"

type ModoFundadorSuccessPageProps = {
  locale: Locale
  paymentStatus?: string
  redirectValid?: boolean | null
}

type PaymentOutcome = "confirmed" | "failed" | "pending"

function resolveOutcome(
  paymentStatus: string,
  redirectValid: boolean | null
): PaymentOutcome {
  if (paymentStatus === "FAILED") {
    return "failed"
  }
  if (paymentStatus === "PAID" || redirectValid === true) {
    return "confirmed"
  }
  return "pending"
}

function ModoFundadorSuccessPage({
  locale,
  paymentStatus = "unknown",
  redirectValid = null,
}: ModoFundadorSuccessPageProps) {
  const content = getModoFundadorContent(locale)
  const outcome = resolveOutcome(paymentStatus, redirectValid)

  const { title, body } = {
    confirmed: { title: content.success.title, body: content.success.body },
    pending: {
      title: content.success.pendingTitle,
      body: content.success.pendingBody,
    },
    failed: {
      title: content.success.failedTitle,
      body: content.success.failedBody,
    },
  }[outcome]

  return (
    <div className="flex min-h-dvh flex-col bg-primary text-primary-foreground">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 pt-[calc(var(--site-header-offset)+1rem)] pb-16 sm:px-10">
        <PassLockup />

        <div className="flex flex-1 flex-col justify-center py-14">
          <div className="flex items-baseline justify-between gap-4 font-mono text-xs font-semibold tracking-[0.14em] text-primary-foreground/85 uppercase">
            <span>Modo Fundador</span>
            {outcome === "failed" ? null : (
              <span>{content.success.stubLabel}</span>
            )}
          </div>

          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-balance md:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-prose text-base leading-relaxed text-pretty text-primary-foreground/85 md:text-lg">
            {body}
          </p>

          {/* Stub detail row — the pass facts, torn along the same dashed seam.
              Withheld on failure: nothing was charged, so nothing was issued. */}
          {outcome === "failed" ? null : (
            <>
              <div
                className="mt-10 h-[3px] w-full"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to right, color-mix(in oklab, var(--primary-foreground) 30%, transparent) 0 12px, transparent 12px 24px)",
                }}
                aria-hidden
              />
              <div className="mt-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
                <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.7rem] font-semibold tracking-[0.14em] text-primary-foreground/85 uppercase">
                  {content.passMeta.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="font-display text-3xl leading-none font-semibold tracking-tight tabular-nums">
                  {content.price}
                </p>
              </div>
            </>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-3">
            {outcome === "failed" ? (
              <Link
                to="/events/$slug"
                params={{ slug: "modo-fundador" }}
                hash="register"
                className="inline-flex min-h-12 w-fit items-center justify-center rounded-xl bg-primary-foreground px-5 text-sm font-semibold tracking-wide text-primary transition-colors hover:bg-primary-foreground/90 focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:outline-none motion-safe:active:translate-y-px"
              >
                {content.success.retryCta}
              </Link>
            ) : null}
            <Link
              to="/"
              className="inline-flex min-h-12 w-fit items-center justify-center rounded-xl text-sm font-semibold tracking-wide text-primary-foreground/85 underline underline-offset-4 transition-colors hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:outline-none"
            >
              {content.success.homeCta}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ModoFundadorSuccessPage }
