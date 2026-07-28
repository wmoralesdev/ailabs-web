import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"

import type { HomeApertureContent, HomeApertureEvent, Locale } from "@/content"
import { HomeCtaLink } from "@/components/home/home-cta-link"
import { HomePaperArcs } from "@/components/home/home-paper-arcs"
import { cn } from "@/lib/utils"
import {
  homeBandPaddingClassName,
  homeDisplayClassName,
  homePaperBandClassName,
  homeShellClassName,
} from "@/components/home/home-styles"
import { Eyebrow } from "@/components/ui/eyebrow"

type HomeApertureProps = {
  locale: Locale
  aperture: HomeApertureContent
}

const metaClassName =
  "font-mono text-[0.7rem] tracking-wider uppercase text-muted-foreground"

const rowClassName =
  "grid items-baseline gap-x-6 gap-y-1 py-4 sm:grid-cols-[minmax(0,1fr)_auto]"

/** Fixed to UTC so the server and client format the same day. */
function formatEventDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`))
}

function eventMeta(
  event: HomeApertureEvent,
  aperture: HomeApertureContent,
  locale: Locale
) {
  const parts: string[] = []

  if (event.venue) {
    parts.push(event.venue)
  }
  if (event.attendance !== undefined) {
    parts.push(
      `${event.attendance.toLocaleString(locale)} ${aperture.attendanceLabel}`
    )
  }
  if (event.series) {
    parts.push(aperture.seriesLabel)
  }
  if (event.upcoming) {
    parts.push(formatEventDate(event.upcoming.date, locale))
  }

  return parts
}

function HomeApertureEventRow({
  aperture,
  event,
  locale,
}: {
  aperture: HomeApertureContent
  event: HomeApertureEvent
  locale: Locale
}) {
  const { upcoming } = event
  const meta = eventMeta(event, aperture, locale)

  const body = (
    <>
      <span className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
        {upcoming ? (
          <span className="border-border text-foreground rounded-full border px-2 py-0.5 font-mono text-[0.6rem] tracking-wider uppercase">
            {aperture.nextLabel}
          </span>
        ) : null}
        <span
          className={cn(
            "font-display text-foreground text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl",
            upcoming && "group-hover:underline group-hover:decoration-2"
          )}
        >
          {event.name}
        </span>
        {upcoming ? (
          <HugeiconsIcon
            icon={ArrowUpRight01Icon}
            strokeWidth={2}
            className="text-foreground size-4 self-center"
          />
        ) : null}
      </span>
      <span
        className={cn(
          metaClassName,
          "flex flex-wrap items-baseline gap-x-3 gap-y-1 sm:justify-end"
        )}
      >
        {meta.map((part) => (
          <span key={part}>{part}</span>
        ))}
      </span>
    </>
  )

  return (
    <li>
      {upcoming ? (
        <a
          href={upcoming.href}
          target="_blank"
          rel="noreferrer"
          className={cn(
            rowClassName,
            "group focus-visible:ring-ring/50 rounded-sm focus-visible:ring-2 focus-visible:outline-none"
          )}
        >
          {body}
        </a>
      ) : (
        <div className={rowClassName}>{body}</div>
      )}
    </li>
  )
}

function HomeAperture({ locale, aperture }: HomeApertureProps) {
  const [voice] = aperture.voices

  return (
    <section
      id={aperture.id}
      className={cn(
        homePaperBandClassName,
        homeBandPaddingClassName,
        "scroll-mt-8"
      )}
    >
      <HomePaperArcs />
      <div
        className={cn(
          homeShellClassName,
          "relative z-[1] flex flex-col gap-12 md:gap-16"
        )}
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span
                aria-hidden
                className="font-display text-on-dark text-2xl font-semibold tracking-tight tabular-nums md:text-3xl"
              >
                {aperture.index}
              </span>
              <Eyebrow tone="onDark">{aperture.eyebrow}</Eyebrow>
            </div>

            <div className="flex flex-col gap-3">
              <h2
                className={cn(
                  homeDisplayClassName,
                  "text-3xl sm:text-4xl md:text-5xl"
                )}
              >
                {aperture.title}
              </h2>
              <p className="text-muted-foreground max-w-md text-base leading-relaxed md:text-lg">
                {aperture.lead}
              </p>
            </div>

            <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-display text-foreground text-5xl font-semibold tracking-tight md:text-6xl">
                {aperture.stat.value}
              </span>
              <span className={metaClassName}>{aperture.stat.label}</span>
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <HomeCtaLink cta={aperture.cta} locale={locale} />
              <HomeCtaLink
                cta={aperture.partnerCta}
                locale={locale}
                variant="quiet"
              />
            </div>
          </div>

          <figure className="border-border flex flex-col justify-center gap-5 lg:border-l lg:pl-14">
            <blockquote className="font-display text-foreground text-2xl leading-snug font-semibold tracking-tight text-balance md:text-3xl">
              {voice.quote}
            </blockquote>
            <figcaption className={cn(metaClassName, "flex flex-col gap-1")}>
              <span className="text-foreground">{voice.name}</span>
              <span>{voice.role}</span>
            </figcaption>
          </figure>
        </div>

        <div className="flex flex-col gap-4">
          <Eyebrow tone="onDark">{aperture.eventsLabel}</Eyebrow>
          <ul className="border-border divide-border divide-y border-t">
            {aperture.events.map((event) => (
              <HomeApertureEventRow
                key={event.id}
                aperture={aperture}
                event={event}
                locale={locale}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export { HomeAperture }
