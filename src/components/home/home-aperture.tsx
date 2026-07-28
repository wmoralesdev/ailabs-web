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
  "grid items-baseline gap-x-6 gap-y-1 py-3 sm:grid-cols-[minmax(0,1fr)_auto]"

type UpcomingEvent = HomeApertureEvent & {
  upcoming: NonNullable<HomeApertureEvent["upcoming"]>
}

function isUpcoming(event: HomeApertureEvent): event is UpcomingEvent {
  return event.upcoming !== undefined
}

/** Fixed to UTC so the server and client format the same day. */
function eventDateParts(date: string, locale: Locale) {
  const value = new Date(`${date}T00:00:00Z`)
  const day = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    timeZone: "UTC",
  }).format(value)
  const monthYear = new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(value)

  return { day, monthYear }
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

  return parts
}

function HomeApertureUpcomingCard({
  aperture,
  event,
  locale,
}: {
  aperture: HomeApertureContent
  event: UpcomingEvent
  locale: Locale
}) {
  const { day, monthYear } = eventDateParts(event.upcoming.date, locale)

  return (
    <li>
      <a
        href={event.upcoming.href}
        target="_blank"
        rel="noreferrer"
        className="group border-border bg-card text-card-foreground focus-visible:ring-ring/50 flex items-center gap-5 rounded-2xl border p-5 focus-visible:ring-2 focus-visible:outline-none sm:p-6"
      >
        <span className="border-border flex w-16 shrink-0 flex-col items-center gap-1 rounded-xl border px-2 py-2.5">
          <span className="font-display text-3xl leading-none font-semibold tracking-tight tabular-nums">
            {day}
          </span>
          <span className={cn(metaClassName, "text-[0.6rem]")}>
            {monthYear}
          </span>
        </span>
        <span className="flex min-w-0 flex-col gap-1.5">
          <span className="border-border text-muted-foreground w-fit rounded-full border px-2 py-0.5 font-mono text-[0.6rem] tracking-wider uppercase">
            {aperture.nextLabel}
          </span>
          <span className="flex flex-wrap items-baseline gap-x-2">
            <span className="font-display text-xl font-semibold tracking-tight group-hover:underline group-hover:decoration-2 sm:text-2xl">
              {event.name}
            </span>
            <HugeiconsIcon
              icon={ArrowUpRight01Icon}
              strokeWidth={2}
              className="text-purple size-4 self-center"
            />
          </span>
        </span>
      </a>
    </li>
  )
}

function HomeAperturePastEventRow({
  aperture,
  event,
  locale,
}: {
  aperture: HomeApertureContent
  event: HomeApertureEvent
  locale: Locale
}) {
  const meta = eventMeta(event, aperture, locale)

  return (
    <li className={rowClassName}>
      <span className="font-display text-foreground text-lg font-semibold tracking-tight sm:text-xl">
        {event.name}
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
    </li>
  )
}

function HomeApertureEventLedger({
  aperture,
  events,
  locale,
}: {
  aperture: HomeApertureContent
  events: ReadonlyArray<HomeApertureEvent>
  locale: Locale
}) {
  return (
    <ul className="border-border divide-border divide-y border-t">
      {events.map((event) => (
        <HomeAperturePastEventRow
          key={event.id}
          aperture={aperture}
          event={event}
          locale={locale}
        />
      ))}
    </ul>
  )
}

function HomeAperture({ locale, aperture }: HomeApertureProps) {
  const [voice] = aperture.voices
  const upcomingEvents = aperture.events.filter(isUpcoming)
  const pastEvents = aperture.events.filter((event) => !isUpcoming(event))

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

        {upcomingEvents.length > 0 ? (
          <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-14">
            <div className="flex flex-col gap-4">
              <Eyebrow tone="onDark">{aperture.upcomingLabel}</Eyebrow>
              <ul className="flex flex-col gap-4">
                {upcomingEvents.map((event) => (
                  <HomeApertureUpcomingCard
                    key={event.id}
                    aperture={aperture}
                    event={event}
                    locale={locale}
                  />
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <Eyebrow tone="onDark">{aperture.eventsLabel}</Eyebrow>
              <HomeApertureEventLedger
                aperture={aperture}
                events={pastEvents}
                locale={locale}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <Eyebrow tone="onDark">{aperture.eventsLabel}</Eyebrow>
            <HomeApertureEventLedger
              aperture={aperture}
              events={aperture.events}
              locale={locale}
            />
          </div>
        )}
      </div>
    </section>
  )
}

export { HomeAperture }
