import { useEffect, useRef, useState } from "react"
import type { CSSProperties } from "react"
import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  PauseIcon,
  PlayIcon,
} from "@hugeicons/core-free-icons"

import { HalftoneIcon } from "@/components/halftone/halftone-icon"
import { HomeHero } from "@/components/home/home-hero"
import {
  homeHeadingClassName,
  homePillClassName,
  homeShellClassName,
} from "@/components/home/home-styles"
import { Button } from "@/components/ui/button"
import { BOOKING_PAGE_PATH, COMMUNITY_WHATSAPP_URL } from "@/content/booking"
import {
  formatCurrentMonth,
  formatLumaPlace,
  formatLumaTime,
  splitCurrentMonthEvents,
  walterEventsCalendarUrl,
} from "@/content/luma-event-format"
import type { LumaEvent } from "@/content/luma-events"
import type {
  EventsIndexContent,
  EventsIndexPhoto,
  HomeHeroContent,
  Locale,
  SiteContent,
} from "@/content/types"
import type { ShapeName } from "@/lib/halftone-shapes"
import { localizedPath } from "@/lib/locale-path"
import { cn } from "@/lib/utils"

import "./events-index.css"

const trackShapes: ReadonlyArray<ShapeName> = ["target", "nodes"]

type EventsIndexProps = {
  locale: Locale
  content: SiteContent
  now: Date
}

const MONTH_LABELS: Record<Locale, readonly string[]> = {
  es: [
    "ENE",
    "FEB",
    "MAR",
    "ABR",
    "MAY",
    "JUN",
    "JUL",
    "AGO",
    "SET",
    "OCT",
    "NOV",
    "DIC",
  ],
  en: [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ],
}

/** Same constant speed as the home ambassador marquee. */
const MARQUEE_SPEED = 42

const sectionTitleClassName =
  "font-display text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"

const monthTitleClassName =
  "font-display text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl"

const subheadingClassName =
  "font-display text-lg leading-tight font-semibold tracking-tight sm:text-xl"

const frameClassName =
  "h-60 w-80 shrink-0 overflow-hidden rounded-2xl border border-border bg-muted sm:h-72 sm:w-96 lg:h-80 lg:w-128"

const frameSizes = "(min-width: 64rem) 32rem, (min-width: 40rem) 24rem, 20rem"

function smallSrc(src: string) {
  return src.replace("/events/community/", "/events/community/sm/")
}

function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "")
}

function intlLocale(locale: Locale): string {
  return locale === "es" ? "es-SV" : "en-US"
}

function eventMonthNumber(date: Date, timeZone: string): number {
  const month = new Intl.DateTimeFormat("en-US", {
    timeZone,
    month: "numeric",
  }).format(date)
  return Number(month)
}

function eventDateParts(event: LumaEvent, locale: Locale) {
  const date = new Date(event.startAt)
  const timeZone = event.timezone
  const day = new Intl.DateTimeFormat(intlLocale(locale), {
    timeZone,
    day: "2-digit",
  }).format(date)
  const month = MONTH_LABELS[locale][eventMonthNumber(date, timeZone) - 1] ?? ""

  return { day, month }
}

function EventCard({
  event,
  locale,
  copy,
}: {
  event: LumaEvent
  locale: Locale
  copy: EventsIndexContent
}) {
  const place = formatLumaPlace(event, locale)
  const time = formatLumaTime(event, locale)
  const parts = eventDateParts(event, locale)

  return (
    <a
      href={event.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-3 text-card-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none sm:gap-4 sm:p-4"
    >
      <span className="flex w-12 shrink-0 flex-col items-center gap-0.5 rounded-lg border border-border px-1.5 py-1.5">
        <span className="font-display text-xl leading-none font-semibold tracking-tight tabular-nums">
          {parts.day}
        </span>
        <span className="font-mono text-[0.6rem] tracking-wider text-muted-foreground uppercase">
          {parts.month}
        </span>
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="font-display text-base font-semibold tracking-tight text-balance group-hover:underline group-hover:decoration-2 sm:text-lg">
          {event.name}
        </span>
        <time
          dateTime={event.startAt}
          className="text-sm leading-snug text-muted-foreground"
        >
          {time}
        </time>
        {place ? (
          <span className="text-sm leading-snug text-muted-foreground">
            {place}
          </span>
        ) : null}
        <span className="inline-flex items-center gap-1 text-sm font-medium">
          {copy.lumaLabel}
          <span className="sr-only"> {copy.newTabLabel}</span>
          <HugeiconsIcon
            icon={ArrowUpRight01Icon}
            strokeWidth={2}
            className="size-4 text-purple"
            aria-hidden
          />
        </span>
      </span>
    </a>
  )
}

function PhotoStrip({
  photos,
  decorative = false,
  className,
  tabIndex,
  loading = "lazy",
}: {
  photos: ReadonlyArray<EventsIndexPhoto>
  decorative?: boolean
  className?: string
  tabIndex?: number
  loading?: "lazy" | "eager"
}) {
  return (
    <ul
      className={cn(
        "flex shrink-0 flex-nowrap items-stretch gap-4 pr-4",
        tabIndex === undefined && "w-max",
        className
      )}
      aria-hidden={decorative || undefined}
      tabIndex={tabIndex}
    >
      {photos.map((photo) => (
        <li key={photo.src} className={frameClassName}>
          <img
            src={photo.src}
            srcSet={`${smallSrc(photo.src)} 640w, ${photo.src} ${photo.width}w`}
            sizes={frameSizes}
            alt={decorative ? "" : photo.alt}
            width={photo.width}
            height={photo.height}
            loading={loading}
            decoding="async"
            draggable={false}
            className="size-full object-cover"
          />
        </li>
      ))}
    </ul>
  )
}

function MarqueeRow({
  photos,
  reverse = false,
  motionAllowed,
  userPaused,
}: {
  photos: ReadonlyArray<EventsIndexPhoto>
  reverse?: boolean
  motionAllowed: boolean
  userPaused: boolean
}) {
  const rowRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLUListElement>(null)
  const [layout, setLayout] = useState({ sets: 1, duration: 0 })
  const [environmentPaused, setEnvironmentPaused] = useState(true)
  const [seen, setSeen] = useState(false)
  const [painted, setPainted] = useState(false)
  const showTrack = painted && motionAllowed && layout.duration > 0 && seen

  useEffect(() => {
    const row = rowRef.current
    const measure = measureRef.current
    if (!row || !measure) return

    let inViewport = typeof IntersectionObserver !== "function"
    const syncPlayback = () => {
      setEnvironmentPaused(!inViewport || document.visibilityState === "hidden")
      if (inViewport) setSeen(true)
    }
    const measureLayout = () => {
      const width = measure.getBoundingClientRect().width
      const viewport = row.clientWidth
      if (width <= 0 || viewport <= 0) return
      const sets = Math.max(1, Math.ceil(viewport / width))
      const duration = (width * sets) / MARQUEE_SPEED
      setLayout((previous) =>
        previous.sets === sets && previous.duration === duration
          ? previous
          : { sets, duration }
      )
    }

    let paintFrame = 0
    const firstFrame = requestAnimationFrame(() => {
      measureLayout()
      syncPlayback()
      paintFrame = requestAnimationFrame(() => setPainted(true))
    })
    const resizeObserver =
      typeof ResizeObserver === "function"
        ? new ResizeObserver(measureLayout)
        : null
    resizeObserver?.observe(row)
    resizeObserver?.observe(measure)
    const viewportObserver =
      typeof IntersectionObserver === "function"
        ? new IntersectionObserver((entries) => {
            inViewport = entries.some((entry) => entry.isIntersecting)
            syncPlayback()
          })
        : null
    viewportObserver?.observe(row)
    window.addEventListener("resize", measureLayout)
    document.addEventListener("visibilitychange", syncPlayback)

    return () => {
      cancelAnimationFrame(firstFrame)
      cancelAnimationFrame(paintFrame)
      resizeObserver?.disconnect()
      viewportObserver?.disconnect()
      window.removeEventListener("resize", measureLayout)
      document.removeEventListener("visibilitychange", syncPlayback)
    }
  }, [photos])

  const copies = Array.from({ length: layout.sets }, (_, index) => index)
  const paused = userPaused || environmentPaused

  return (
    <div
      ref={rowRef}
      className="events-marquee-row"
      data-ready={showTrack || undefined}
      data-paused={paused || undefined}
      data-reverse={reverse || undefined}
      style={
        {
          "--events-duration": `${layout.duration}s`,
        } as CSSProperties
      }
    >
      <ul
        ref={measureRef}
        className="events-marquee-measure flex w-max flex-nowrap gap-4 pr-4"
        aria-hidden="true"
      >
        {photos.map((photo) => (
          <li key={photo.src} className={frameClassName} />
        ))}
      </ul>
      <div className="events-marquee-track">
        <div className="events-marquee-half">
          {copies.map((index) => (
            <PhotoStrip
              key={index}
              photos={photos}
              decorative={index > 0}
              loading="lazy"
              className={
                showTrack || index > 0 ? undefined : "events-marquee-static"
              }
              tabIndex={showTrack || index > 0 ? undefined : 0}
            />
          ))}
        </div>
        {showTrack ? (
          <div className="events-marquee-half" aria-hidden="true">
            {copies.map((index) => (
              <PhotoStrip
                key={index}
                photos={photos}
                decorative
                loading="lazy"
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

function PhotoMarquee({
  photos,
  copy,
}: {
  photos: ReadonlyArray<EventsIndexPhoto>
  copy: EventsIndexContent
}) {
  const [motionAllowed, setMotionAllowed] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const midpoint = Math.ceil(photos.length / 2)
  const rows = [
    { photos: photos.slice(0, midpoint), reverse: false },
    { photos: photos.slice(midpoint), reverse: true },
  ]

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setMotionAllowed(!media.matches)
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <div
        className={cn(
          homeShellClassName,
          "flex items-end justify-between gap-4"
        )}
      >
        <div className="flex max-w-3xl flex-col gap-3">
          <h2 id="events-photos" className={sectionTitleClassName}>
            {copy.photosLabel}
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {copy.photosCaption}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="xl"
          className="size-11 rounded-full px-0"
          hidden={!motionAllowed}
          onClick={() => setUserPaused((paused) => !paused)}
          aria-label={userPaused ? copy.playPhotos : copy.pausePhotos}
        >
          <HugeiconsIcon
            icon={userPaused ? PlayIcon : PauseIcon}
            className="size-4"
            aria-hidden
          />
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {rows.map((row) => (
          <MarqueeRow
            key={row.reverse ? "reverse" : "forward"}
            photos={row.photos}
            reverse={row.reverse}
            motionAllowed={motionAllowed}
            userPaused={userPaused}
          />
        ))}
      </div>
    </div>
  )
}

function EventsIndex({ locale, content, now }: EventsIndexProps) {
  const copy = content.events
  const { upcoming, past } = splitCurrentMonthEvents(now)
  const monthLabel = formatCurrentMonth(now, locale)
  const monthInSentence =
    locale === "es" ? monthLabel.toLocaleLowerCase("es-SV") : monthLabel
  const monthIsEmpty = upcoming.length === 0 && past.length === 0
  const hero: HomeHeroContent = {
    label: copy.label,
    headline: copy.headline,
    lead: copy.intro,
    primaryCta: {
      label: copy.calendarLabel,
      href: walterEventsCalendarUrl,
    },
    secondaryCta: {
      label: copy.communityCta,
      href: "#comunidad",
    },
  }

  return (
    <article className="bg-background text-foreground">
      <HomeHero
        locale={locale}
        content={content}
        hero={hero}
        primaryAction={{
          label: copy.calendarLabel,
          href: walterEventsCalendarUrl,
          external: true,
          newTabLabel: copy.newTabLabel,
        }}
      />

      <section
        aria-label={copy.label}
        className="border-y border-border bg-background py-10 md:py-14"
      >
        <ul className={cn(homeShellClassName, "grid gap-8 md:grid-cols-2")}>
          {copy.tracks.map((track, index) => (
            <li
              key={track.title}
              data-icon-hover
              className="grid grid-cols-[3.5rem_1fr] gap-x-5"
            >
              <HalftoneIcon
                shape={trackShapes[index] ?? "dot"}
                motion="hover"
                className="size-12 text-purple-ink"
              />
              <div>
                <h2 className="display text-[1.75rem]">{track.title}</h2>
                <p className="mt-2 max-w-[44ch] text-body text-muted-foreground">
                  {track.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {copy.photos.length > 0 ? (
        <section
          aria-labelledby="events-photos"
          className="section-y bg-background"
        >
          <PhotoMarquee photos={copy.photos} copy={copy} />
        </section>
      ) : null}

      <section className="section-y bg-background">
        <div className={cn(homeShellClassName, "flex flex-col gap-6")}>
          <h2 id="events-month" className={monthTitleClassName}>
            {monthLabel}
          </h2>
          {monthIsEmpty ? (
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
              {fill(copy.monthEmpty, { month: monthInSentence })}
            </p>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
              <section
                aria-labelledby="events-upcoming"
                className="flex flex-col gap-3"
              >
                <h3 id="events-upcoming" className={subheadingClassName}>
                  {copy.upcomingLabel}
                </h3>
                {upcoming.length > 0 ? (
                  <ul className="flex flex-col gap-3">
                    {upcoming.map((event) => (
                      <li key={event.id}>
                        <EventCard event={event} locale={locale} copy={copy} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {copy.upcomingEmpty}
                  </p>
                )}
              </section>
              {past.length > 0 ? (
                <section
                  aria-labelledby="events-past"
                  className="flex flex-col gap-3"
                >
                  <h3 id="events-past" className={subheadingClassName}>
                    {copy.pastLabel}
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {past.map((event) => (
                      <li key={event.id}>
                        <EventCard event={event} locale={locale} copy={copy} />
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
          )}
        </div>
      </section>

      <section
        id="comunidad"
        aria-labelledby="events-community"
        className="section-y bg-surface"
      >
        <div
          className={cn(
            homeShellClassName,
            "grid gap-10 lg:grid-cols-12 lg:items-end"
          )}
        >
          <div className="flex flex-col items-start gap-5 lg:col-span-7">
            <h2 id="events-community" className={homeHeadingClassName}>
              {copy.communityTitle}
            </h2>
            <p className="max-w-[52ch] text-lead leading-snug text-muted-foreground">
              {copy.communityBody}
            </p>
            <a
              href={COMMUNITY_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(homePillClassName, "w-fit")}
            >
              {copy.communityCta}
              <span className="sr-only"> {copy.newTabLabel}</span>
              <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
            </a>
            <p className="text-small text-muted-foreground">
              {copy.communityHint}
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 border-t border-foreground/15 pt-8 lg:col-span-4 lg:col-start-9 lg:border-t-0 lg:pt-0">
            <h2 className="display text-[clamp(1.5rem,1.2rem+1vw,2rem)]">
              {copy.bridgeTitle}
            </h2>
            <Link
              to={localizedPath(locale, BOOKING_PAGE_PATH) as never}
              className="text-action"
            >
              {copy.bridgeCta}
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                strokeWidth={2}
                className="size-4"
              />
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}

export { EventsIndex }
