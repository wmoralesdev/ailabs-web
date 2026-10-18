import { useEffect, useRef, useState } from "react"
import { Link } from "@tanstack/react-router"

import {
  formatCurrentMonth,
  formatLumaPlace,
  formatLumaWhen,
  splitCurrentMonthEvents,
  walterEventsCalendarUrl,
} from "@/content/luma-event-format"
import type { LumaEvent } from "@/content/luma-events"
import type { EventsIndexContent, Locale } from "@/content/types"

import "./events-index.css"

type EventsIndexProps = {
  locale: Locale
  copy: EventsIndexContent
  now: Date
}

function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "")
}

function splitAfter(value: string, head: string): [string, string] {
  if (value.startsWith(head)) {
    const rest = value.slice(head.length).trim()
    return rest ? [head, rest] : [value, ""]
  }
  const space = value.lastIndexOf(" ")
  if (space <= 0) {
    return [value, ""]
  }
  return [value.slice(0, space), value.slice(space + 1)]
}

function listPhotoIndex(letter: number): number {
  if (letter !== 7) {
    return 7
  }
  return 4
}

function EventRow({
  event,
  locale,
  copy,
  revealIndex,
}: {
  event: LumaEvent
  locale: Locale
  copy: EventsIndexContent
  revealIndex: number
}) {
  const place = formatLumaPlace(event, locale)
  const when = formatLumaWhen(event, locale)

  return (
    <li data-reveal style={{ ["--i" as string]: revealIndex }}>
      <a
        href={event.href}
        target="_blank"
        rel="noopener noreferrer"
        className="events-row"
      >
        <span className="events-row-name">{event.name}</span>
        <span className="events-row-line">
          <time dateTime={event.startAt}>{when}</time>
          {place ? <span>{place}</span> : <span />}
          <span className="events-row-go">
            {copy.lumaLabel}
            <span className="sr-only"> {copy.newTabLabel}</span>
          </span>
        </span>
        {event.hosts.length > 0 ? (
          <span className="events-row-hosts">
            {copy.hostsLabel}: {event.hosts.join(", ")}
          </span>
        ) : null}
      </a>
    </li>
  )
}

function EventsIndex({ locale, copy, now }: EventsIndexProps) {
  const rootRef = useRef<HTMLElement>(null)
  const [letter, setLetter] = useState(0)
  const { upcoming, past } = splitCurrentMonthEvents(now)
  const monthLabel = formatCurrentMonth(now, locale)
  const monthInSentence =
    locale === "es" ? monthLabel.toLocaleLowerCase("es-SV") : monthLabel
  const monthIsEmpty = upcoming.length === 0 && past.length === 0
  const photos = copy.photos
  const letterPhoto = photos[letter]
  const listIndex = listPhotoIndex(letter)
  const prints = photos
    .map((photo, index) => ({ photo, index }))
    .filter((item) => item.index !== letter && item.index !== listIndex)
  const [line1, line2] = splitAfter(
    copy.headline,
    locale === "es" ? "Eventos de Ai Labs" : "Ai Labs events"
  )
  const [photoLine1, photoLine2] = splitAfter(
    copy.photosLabel,
    locale === "es" ? "En la" : "From the"
  )
  const [closeLine1, closeLine2] = splitAfter(
    copy.closeHeadline,
    "San Salvador"
  )
  const listPhoto = photos[listIndex]

  useEffect(() => {
    const root = rootRef.current
    if (!root) {
      return
    }
    root.classList.add("is-ready")
    if (typeof window.matchMedia !== "function") {
      return
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }
    const nodes = root.querySelectorAll("[data-reveal]")
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue
          }
          entry.target.classList.add("is-in")
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    )
    for (const node of nodes) {
      observer.observe(node)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <article ref={rootRef} className="events-page">
      <header className="events-hero">
        <h1
          className="events-sentence"
          aria-labelledby="events-line-1 events-line-2"
        >
          <span
            id="events-line-1"
            className="events-sentence-line"
            data-rise
            style={{ ["--i" as string]: 0 }}
          >
            {line1}
          </span>
          {photos.length > 0 ? (
            <span className="events-letter">
              <img
                data-letter="true"
                src={letterPhoto.src}
                alt={letterPhoto.alt}
                width={1200}
                height={800}
              />
            </span>
          ) : null}
          <span
            id="events-line-2"
            className="events-sentence-rest"
            data-rise
            style={{ ["--i" as string]: 2 }}
          >
            {line2}
          </span>
        </h1>
        <div className="events-hero-bar">
          <p
            className="events-support"
            data-rise
            style={{ ["--i" as string]: 3 }}
          >
            {copy.intro}
          </p>
          <a
            href={walterEventsCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="events-button"
            data-rise
            style={{ ["--i" as string]: 4 }}
          >
            {copy.calendarLabel}
            <span className="sr-only"> {copy.newTabLabel}</span>
          </a>
        </div>
      </header>

      {photos.length > 0 ? (
        <section
          className="events-gallery"
          aria-labelledby="events-photos-title"
        >
          <h2 id="events-photos-title" className="events-gallery-title">
            <span data-reveal style={{ ["--i" as string]: 0 }}>
              {photoLine1}
            </span>
            <span data-reveal style={{ ["--i" as string]: 1 }}>
              {photoLine2}
            </span>
          </h2>
          <div className="events-prints">
            {prints.map((item, position) => {
              const slot = position === 0 ? "a" : position === 1 ? "b" : "stack"
              const stack = position - 2
              return (
                <button
                  key={item.photo.src}
                  type="button"
                  className="events-print"
                  data-slot={slot}
                  data-reveal
                  style={{
                    ["--i" as string]: position + 2,
                    ["--x" as string]:
                      slot === "stack" ? `${stack * 14}px` : "0px",
                    ["--y" as string]:
                      slot === "stack" ? `${stack * -16}px` : "0px",
                  }}
                  onClick={() => setLetter(item.index)}
                >
                  <img
                    src={item.photo.src}
                    alt={item.photo.alt}
                    width={900}
                    height={1200}
                    loading={position < 2 ? "eager" : "lazy"}
                  />
                </button>
              )
            })}
          </div>
          <p
            className="events-caption"
            data-reveal
            style={{ ["--i" as string]: 4 }}
          >
            {copy.photosCaption}
          </p>
        </section>
      ) : null}

      <section className="events-month" aria-labelledby="events-month-title">
        <h2 id="events-month-title" className="events-month-title">
          <span data-reveal style={{ ["--i" as string]: 0 }}>
            {monthLabel}
          </span>
          <span data-reveal style={{ ["--i" as string]: 1 }}>
            {copy.cityLine}
          </span>
        </h2>
        {monthIsEmpty ? (
          <p className="events-note" data-reveal>
            {fill(copy.monthEmpty, { month: monthInSentence })}
          </p>
        ) : (
          <div className="events-month-body">
            {photos.length > 0 ? (
              <img
                className="events-month-photo"
                src={listPhoto.src}
                alt={listPhoto.alt}
                width={900}
                height={1125}
                data-reveal
                style={{ ["--i" as string]: 2 }}
              />
            ) : null}
            <div className="events-month-table">
              <section
                className="events-group"
                aria-labelledby="events-upcoming"
              >
                <h3
                  id="events-upcoming"
                  data-reveal
                  style={{ ["--i" as string]: 1 }}
                >
                  {copy.upcomingLabel}
                </h3>
                {upcoming.length > 0 ? (
                  <ul className="events-rows">
                    {upcoming.map((event, index) => (
                      <EventRow
                        key={event.id}
                        event={event}
                        locale={locale}
                        copy={copy}
                        revealIndex={index + 2}
                      />
                    ))}
                  </ul>
                ) : (
                  <p className="events-note">{copy.upcomingEmpty}</p>
                )}
              </section>
              {past.length > 0 ? (
                <section className="events-group" aria-labelledby="events-past">
                  <h3 id="events-past" data-reveal>
                    {copy.pastLabel}
                  </h3>
                  <ul className="events-rows">
                    {past.map((event, index) => (
                      <EventRow
                        key={event.id}
                        event={event}
                        locale={locale}
                        copy={copy}
                        revealIndex={index}
                      />
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
          </div>
        )}
      </section>

      <section className="events-close" aria-labelledby="events-close-title">
        <h2 id="events-close-title" className="events-close-title">
          <span data-reveal style={{ ["--i" as string]: 0 }}>
            {closeLine1}
          </span>
          <span data-reveal style={{ ["--i" as string]: 1 }}>
            {closeLine2}
          </span>
        </h2>
        <div className="events-close-bar">
          <p
            className="events-support"
            data-reveal
            style={{ ["--i" as string]: 2 }}
          >
            {copy.closeSupport}
          </p>
          <Link
            to="/community"
            className="events-button"
            data-reveal
            style={{ ["--i" as string]: 3 }}
          >
            {copy.communityCta}
          </Link>
        </div>
      </section>
    </article>
  )
}

export { EventsIndex }
