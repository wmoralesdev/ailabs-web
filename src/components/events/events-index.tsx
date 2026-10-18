import { useEffect, useRef, useState } from "react"
import type { CSSProperties, ReactNode } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import type { IconSvgElement } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  Calendar03Icon,
  Clock01Icon,
  Location01Icon,
  PauseIcon,
  PlayIcon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons"
import { Link } from "@tanstack/react-router"
import { gsap } from "gsap"

import { homePillClassName } from "@/components/home/home-styles"
import { Eyebrow } from "@/components/ui/eyebrow"
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
  Locale,
} from "@/content/types"
import { cn } from "@/lib/utils"

import "./events-index.css"

type EventsIndexProps = {
  locale: Locale
  copy: EventsIndexContent
  now: Date
}

const HERO_COUNT = 5
const MARQUEE_SPEED = 42

const shellClassName = "page-gutter mx-auto w-full max-w-content"

const sectionTitleClassName =
  "font-display text-3xl font-semibold tracking-tight text-balance text-foreground md:text-4xl"

function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "")
}

function intlLocale(locale: Locale): string {
  return locale === "es" ? "es-SV" : "en-US"
}

function eventDateParts(event: LumaEvent, locale: Locale) {
  const date = new Date(event.startAt)
  const options = { timeZone: event.timezone }
  const format = (part: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(intlLocale(locale), { ...options, ...part }).format(
      date
    )

  return {
    weekday: format({ weekday: "short" }),
    day: format({ day: "numeric" }),
    month: format({ month: "short" }),
  }
}

function MetaRow({
  icon,
  children,
}: {
  icon: IconSvgElement
  children: ReactNode
}) {
  return (
    <p className="flex gap-2">
      <span aria-hidden="true" className="mt-1 inline-flex shrink-0">
        <HugeiconsIcon icon={icon} strokeWidth={1.75} className="size-4" />
      </span>
      <span className="min-w-0">{children}</span>
    </p>
  )
}

function DateBlock({
  event,
  locale,
  featured,
}: {
  event: LumaEvent
  locale: Locale
  featured?: boolean
}) {
  const parts = eventDateParts(event, locale)

  return (
    <div
      className={cn(
        "flex shrink-0 flex-col items-center justify-center rounded-2xl px-3 py-3 text-center",
        featured
          ? "min-w-28 bg-primary text-primary-foreground md:min-w-36 md:px-5 md:py-6"
          : "min-w-20 bg-foreground text-background"
      )}
    >
      <span className="text-xs font-semibold tracking-wide uppercase">
        {parts.weekday}
      </span>
      <span
        className={cn(
          "font-display leading-none font-semibold",
          featured ? "text-6xl md:text-7xl" : "text-4xl"
        )}
      >
        {parts.day}
      </span>
      <span className="text-sm font-semibold tracking-wide uppercase">
        {parts.month}
      </span>
    </div>
  )
}

function EventCard({
  event,
  locale,
  copy,
  featured = false,
  quiet = false,
}: {
  event: LumaEvent
  locale: Locale
  copy: EventsIndexContent
  featured?: boolean
  quiet?: boolean
}) {
  const place = formatLumaPlace(event, locale)
  const time = formatLumaTime(event, locale)

  return (
    <a
      href={event.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex h-full min-h-11 flex-col gap-5 rounded-3xl p-5 transition-shadow duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none sm:p-6",
        featured
          ? "shadow-panel bg-foreground text-background md:flex-row md:items-stretch md:gap-8 md:p-8"
          : quiet
            ? "border border-border bg-card text-card-foreground sm:flex-row sm:items-start"
            : "shadow-elevated border border-border bg-card text-card-foreground sm:flex-row sm:items-start"
      )}
    >
      <DateBlock event={event} locale={locale} featured={featured} />
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <h4
          className={cn(
            "font-display font-semibold tracking-tight text-balance",
            featured ? "text-3xl md:text-4xl" : "text-2xl"
          )}
        >
          {event.name}
        </h4>
        <time dateTime={event.startAt} className="flex flex-col gap-2">
          <MetaRow icon={Clock01Icon}>{time}</MetaRow>
        </time>
        {place ? <MetaRow icon={Location01Icon}>{place}</MetaRow> : null}
        {event.hosts.length > 0 ? (
          <MetaRow icon={UserGroupIcon}>
            {copy.hostsLabel}: {event.hosts.join(", ")}
          </MetaRow>
        ) : null}
        <span
          className={cn(
            "mt-auto inline-flex min-h-11 w-fit items-center gap-1.5 rounded-full px-5 text-sm font-medium",
            quiet
              ? "border border-current"
              : "bg-primary text-primary-foreground"
          )}
        >
          {copy.lumaLabel}
          <span className="sr-only"> {copy.newTabLabel}</span>
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            strokeWidth={2}
            className="size-4"
            aria-hidden
          />
        </span>
      </div>
    </a>
  )
}

const frameWidths = ["15rem", "22rem", "13.5rem", "26rem", "18rem"]

function PhotoStrip({
  photos,
  decorative = false,
  listRef,
  className,
  frameHeight,
}: {
  photos: ReadonlyArray<EventsIndexPhoto>
  decorative?: boolean
  listRef?: React.RefObject<HTMLUListElement | null>
  className?: string
  frameHeight?: string
}) {
  return (
    <ul ref={listRef} className={cn("events-marquee-strip", className)}>
      {photos.map((photo, index) => (
        <li
          key={photo.src}
          className="events-marquee-frame"
          style={
            {
              width: frameWidths[index % frameWidths.length],
              "--frame-h": frameHeight,
            } as CSSProperties
          }
        >
          <img
            src={photo.src}
            alt={decorative ? "" : photo.alt}
            width={1600}
            height={1067}
            draggable={false}
          />
        </li>
      ))}
    </ul>
  )
}

function PhotoMarquee({
  photos,
  copy,
}: {
  photos: ReadonlyArray<EventsIndexPhoto>
  copy: EventsIndexContent
}) {
  const bandRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLUListElement>(null)
  const [layout, setLayout] = useState({ sets: 1, duration: 0 })
  const [motionAllowed, setMotionAllowed] = useState(false)
  const [environmentPaused, setEnvironmentPaused] = useState(true)
  const [userPaused, setUserPaused] = useState(false)
  const ready = motionAllowed && layout.duration > 0
  const reversed = [...photos].reverse()

  useEffect(() => {
    const band = bandRef.current
    const measure = measureRef.current
    if (!band || !measure || typeof window.matchMedia !== "function") return

    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    let inViewport = typeof IntersectionObserver !== "function"
    const syncPlayback = () => {
      setMotionAllowed(!media.matches)
      setEnvironmentPaused(!inViewport || document.visibilityState === "hidden")
    }
    const measureLayout = () => {
      const width = measure.getBoundingClientRect().width
      const viewport = band.clientWidth
      if (width <= 0 || viewport <= 0) return
      const sets = Math.max(1, Math.ceil(viewport / width))
      const duration = (width * sets) / MARQUEE_SPEED
      setLayout((previous) =>
        previous.sets === sets && previous.duration === duration
          ? previous
          : { sets, duration }
      )
    }

    measureLayout()
    syncPlayback()
    const resizeObserver =
      typeof ResizeObserver === "function"
        ? new ResizeObserver(measureLayout)
        : null
    resizeObserver?.observe(band)
    resizeObserver?.observe(measure)
    const viewportObserver =
      typeof IntersectionObserver === "function"
        ? new IntersectionObserver((entries) => {
            inViewport = entries.some((entry) => entry.isIntersecting)
            syncPlayback()
          })
        : null
    viewportObserver?.observe(band)
    window.addEventListener("resize", measureLayout)
    document.addEventListener("visibilitychange", syncPlayback)
    media.addEventListener("change", syncPlayback)

    return () => {
      resizeObserver?.disconnect()
      viewportObserver?.disconnect()
      window.removeEventListener("resize", measureLayout)
      document.removeEventListener("visibilitychange", syncPlayback)
      media.removeEventListener("change", syncPlayback)
    }
  }, [photos])

  const rows = [
    { photos, reverse: false, height: "13.5rem" },
    { photos: reversed, reverse: true, height: "10.5rem" },
  ]

  return (
    <div
      ref={bandRef}
      className="events-marquee-band flex flex-col gap-5 py-12 md:gap-6 md:py-16"
      data-ready={ready || undefined}
      data-paused={userPaused || environmentPaused || undefined}
    >
      <div
        className={cn(shellClassName, "flex items-end justify-between gap-4")}
      >
        <div className="flex max-w-3xl flex-col gap-3">
          <h2 id="events-photos" className={sectionTitleClassName}>
            {copy.photosLabel}
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {copy.photosCaption}
          </p>
        </div>
        <button
          type="button"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-foreground/20 bg-background text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          hidden={!ready}
          onClick={() => setUserPaused((paused) => !paused)}
          aria-label={userPaused ? copy.playPhotos : copy.pausePhotos}
        >
          <HugeiconsIcon
            icon={userPaused ? PlayIcon : PauseIcon}
            className="size-4"
            aria-hidden
          />
        </button>
      </div>
      <PhotoStrip
        photos={photos}
        decorative
        listRef={measureRef}
        className="events-marquee-measure"
        frameHeight="13.5rem"
      />
      {rows.map((row) => (
        <div key={row.height} className="events-marquee-row">
          <PhotoStrip
            photos={row.photos}
            decorative={row.reverse}
            className="events-marquee-static"
            frameHeight={row.height}
          />
          <div
            className="events-marquee-track"
            aria-hidden="true"
            data-reverse={row.reverse || undefined}
            style={
              {
                "--events-duration": `${layout.duration}s`,
              } as CSSProperties
            }
          >
            {["first", "duplicate"].map((half) => (
              <div key={half} className="events-marquee-half">
                {Array.from({ length: layout.sets }, (_, index) => (
                  <PhotoStrip
                    key={`${half}-${index}`}
                    photos={row.photos}
                    decorative
                    frameHeight={row.height}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function EventsIndex({ locale, copy, now }: EventsIndexProps) {
  const rootRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const { upcoming, past } = splitCurrentMonthEvents(now)
  const monthLabel = formatCurrentMonth(now, locale)
  const monthInSentence =
    locale === "es" ? monthLabel.toLocaleLowerCase("es-SV") : monthLabel
  const monthIsEmpty = upcoming.length === 0 && past.length === 0
  const heroPhotos = copy.photos.slice(0, HERO_COUNT)
  const restPhotos = copy.photos.slice(HERO_COUNT)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero || typeof window.matchMedia !== "function") return
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (media.matches) return

    const slots = [...hero.querySelectorAll<HTMLElement>("[data-depth]")]
    const setters = slots.map((slot) => ({
      set: gsap.quickSetter(slot, "y", "px"),
      depth: Number(slot.dataset.depth) || 12,
    }))
    let frame = 0
    const update = () => {
      frame = 0
      const shift = Math.max(
        -72,
        Math.min(72, -hero.getBoundingClientRect().top * 0.12)
      )
      for (const { set, depth } of setters) {
        set(shift * (depth / 28))
      }
    }
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root || typeof window.matchMedia !== "function") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (typeof IntersectionObserver !== "function") return

    root.classList.add("events-ready")
    const nodes = [...root.querySelectorAll<HTMLElement>("[data-rise]")]
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add("is-in")
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.18 }
    )
    for (const node of nodes) observer.observe(node)
    return () => {
      observer.disconnect()
      root.classList.remove("events-ready")
    }
  }, [])

  return (
    <article
      ref={rootRef}
      className="overflow-x-clip bg-background text-foreground"
    >
      <header ref={heroRef} className="events-hero">
        <div className="events-hero-inner">
          <div className="flex max-w-xl flex-col items-start gap-4">
            <Eyebrow tone="onDark">{copy.label}</Eyebrow>
            <h1 className="font-display text-[clamp(2.75rem,4.6vw,5.25rem)] leading-[0.95] font-semibold tracking-tight text-balance text-on-dark">
              {copy.headline}
            </h1>
            <p className="max-w-md text-base leading-relaxed text-on-dark/85 md:text-lg">
              {copy.intro}
            </p>
            <a
              href={walterEventsCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                homePillClassName,
                "mt-2 h-12 w-fit gap-2 px-6 text-base"
              )}
            >
              <HugeiconsIcon
                icon={Calendar03Icon}
                strokeWidth={1.75}
                className="size-4"
                aria-hidden
              />
              {copy.calendarLabel}
              <span className="sr-only"> {copy.newTabLabel}</span>
            </a>
          </div>
          {heroPhotos.length > 0 ? (
            <div className="events-collage">
              {heroPhotos.map((photo, index) => (
                <div
                  key={photo.src}
                  className="events-collage-slot"
                  data-depth={12 + index * 4}
                >
                  <div className="events-collage-float">
                    <div className="events-collage-card">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        width={1600}
                        height={1067}
                        draggable={false}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      {restPhotos.length > 0 ? (
        <section aria-labelledby="events-photos">
          <PhotoMarquee photos={restPhotos} copy={copy} />
        </section>
      ) : null}

      <section className="bg-background py-14 md:py-20">
        <div className={cn(shellClassName, "flex flex-col gap-8")}>
          <h2 id="events-month" className={sectionTitleClassName}>
            {monthLabel}
          </h2>
          {monthIsEmpty ? (
            <p className="max-w-xl text-base leading-relaxed text-foreground">
              {fill(copy.monthEmpty, { month: monthInSentence })}
            </p>
          ) : (
            <div className="flex flex-col gap-12">
              <section
                aria-labelledby="events-upcoming"
                className="flex flex-col gap-4"
              >
                <h3
                  id="events-upcoming"
                  className="font-display text-xl font-semibold tracking-tight text-foreground"
                >
                  {copy.upcomingLabel}
                </h3>
                {upcoming.length > 0 ? (
                  <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {upcoming.map((event, index) => (
                      <li
                        key={event.id}
                        data-rise
                        style={{ ["--i" as string]: index }}
                        className={cn(
                          "min-w-0",
                          index === 0 && "lg:col-span-2"
                        )}
                      >
                        <EventCard
                          event={event}
                          locale={locale}
                          copy={copy}
                          featured={index === 0}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-base leading-relaxed text-foreground">
                    {copy.upcomingEmpty}
                  </p>
                )}
              </section>
              {past.length > 0 ? (
                <section
                  aria-labelledby="events-past"
                  className="flex flex-col gap-4"
                >
                  <h3
                    id="events-past"
                    className="font-display text-xl font-semibold tracking-tight text-foreground"
                  >
                    {copy.pastLabel}
                  </h3>
                  <ul className="grid grid-cols-1 gap-4">
                    {past.map((event, index) => (
                      <li
                        key={event.id}
                        data-rise
                        style={{ ["--i" as string]: index }}
                        className="min-w-0"
                      >
                        <EventCard
                          event={event}
                          locale={locale}
                          copy={copy}
                          quiet
                        />
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby="events-close" className="events-close">
        <div
          className={cn(
            shellClassName,
            "flex flex-col items-start gap-4 py-12 md:flex-row md:items-end md:justify-between md:gap-8 md:py-14"
          )}
        >
          <div className="flex max-w-xl flex-col gap-2">
            <h2
              id="events-close"
              className="font-display text-2xl font-semibold tracking-tight text-balance text-foreground md:text-3xl"
            >
              {copy.closeHeadline}
            </h2>
            <p className="text-base leading-relaxed text-foreground">
              {copy.closeSupport}
            </p>
          </div>
          <Link
            to="/community"
            className={cn(homePillClassName, "w-fit shrink-0")}
          >
            {copy.communityCta}
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              strokeWidth={2}
              className="size-4"
              aria-hidden
            />
          </Link>
        </div>
      </section>
    </article>
  )
}

export { EventsIndex }
