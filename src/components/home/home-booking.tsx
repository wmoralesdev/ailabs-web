import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"

import type { HomeBookingContent, Locale } from "@/content"
import { BOOKING_PAGE_PATH, WHATSAPP_URL } from "@/content/booking"
import { HalftoneCanvas } from "@/components/halftone/halftone-canvas"
import { localizedPath } from "@/lib/locale-path"
import { homeShellClassName } from "./home-styles"

/**
 * The closing tile: the whole card leads to the booking page. It is a quiet
 * dot screen on the indigo field until the pointer moves, then lilac ink
 * follows it. The WhatsApp line appears only once a business number exists.
 */
export function HomeBooking({
  booking,
  locale,
}: {
  booking: HomeBookingContent
  locale: Locale
}) {
  return (
    <section
      id="agenda"
      aria-labelledby="home-booking-title"
      className={`${homeShellClassName} pb-[var(--space-gutter)]`}
    >
      <div
        data-halftone-surface
        className="group/booking relative isolate flex min-h-[22rem] flex-col justify-between gap-16 overflow-clip rounded-3xl bg-purple p-6 text-snow [--ht-accent:var(--color-print)] [--ht-faint:color-mix(in_srgb,var(--color-snow)_16%,transparent)] [--ht-ink:var(--color-print)] sm:p-10 md:min-h-[28rem]"
      >
        <HalftoneCanvas
          cell={12}
          rest={0.08}
          className="absolute inset-0 -z-10"
        />
        <Link
          to={localizedPath(locale, BOOKING_PAGE_PATH) as never}
          aria-label={booking.cta}
          className="absolute inset-0 z-10 cursor-pointer rounded-3xl outline-offset-[-6px]"
        />
        <div className="pointer-events-none flex items-start justify-between gap-6">
          <div className="max-w-[32rem]">
            <h2
              id="home-booking-title"
              className="text-lead leading-snug font-semibold text-snow"
            >
              {booking.title}
            </h2>
            <p className="mt-2 text-body leading-snug text-snow/80">
              {booking.body}
            </p>
          </div>
          <HugeiconsIcon
            icon={ArrowUpRight01Icon}
            strokeWidth={1.6}
            className="size-9 shrink-0 text-snow transition-transform duration-300 ease-(--ease-out) group-hover/booking:translate-x-1 group-hover/booking:-translate-y-1 md:size-12"
          />
        </div>
        <div className="pointer-events-none flex flex-wrap items-end justify-between gap-6">
          <p
            aria-hidden="true"
            className="display -mb-[0.12em] text-[17vw] leading-[0.85] text-snow md:text-[clamp(5rem,10vw,9rem)]"
          >
            {booking.display}
          </p>
          <div className="relative z-20 flex flex-wrap items-center gap-x-6 gap-y-2 pb-2">
            <span className="text-body font-semibold text-snow">
              {booking.cta}
            </span>
            {WHATSAPP_URL ? (
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto link-underline text-body text-snow/85 hover:text-snow"
              >
                {booking.whatsappCta}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
