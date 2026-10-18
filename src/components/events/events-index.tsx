import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  Calendar03Icon,
  Location01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons"
import type { IconSvgElement } from "@hugeicons/react"
import { Link } from "@tanstack/react-router"

import { Eyebrow } from "@/components/ui/eyebrow"
import {
  formatLumaPlace,
  formatLumaWhen,
  groupPastLumaEvents,
  splitLumaEvents,
} from "@/content/luma-event-format"
import type { LumaEvent } from "@/content/luma-events"
import type { EventsIndexContent, Locale } from "@/content/types"
import { cn } from "@/lib/utils"

type EventsIndexProps = {
  locale: Locale
  copy: EventsIndexContent
  now: Date
}

const eventLinkClassName =
  "flex min-h-11 min-w-0 cursor-pointer touch-manipulation flex-col gap-4 rounded-2xl bg-card p-6 text-base/relaxed text-card-foreground ring-1 ring-foreground/15 transition-colors duration-200 hover:ring-foreground/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground motion-reduce:transition-none"

const sectionHeadingClassName =
  "font-display text-2xl font-semibold tracking-tight text-foreground"

function MetaIcon({ icon }: { icon: IconSvgElement }) {
  return (
    <span aria-hidden="true" className="mt-1 inline-flex shrink-0">
      <HugeiconsIcon icon={icon} strokeWidth={1.75} className="size-4" />
    </span>
  )
}

function EventCard({
  event,
  locale,
  copy,
  heading,
}: {
  event: LumaEvent
  locale: Locale
  copy: EventsIndexContent
  heading: "h3" | "h4"
}) {
  const Heading = heading
  const place = formatLumaPlace(event, locale)
  const when = formatLumaWhen(event, locale)

  return (
    <a
      href={event.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(eventLinkClassName, heading === "h4" && "gap-3 p-5")}
    >
      <Heading
        className={cn(
          "font-display font-semibold tracking-tight text-balance text-foreground",
          heading === "h3" ? "text-2xl md:text-3xl" : "text-xl",
        )}
      >
        {event.name}
      </Heading>
      <p className="flex gap-2 text-foreground">
        <MetaIcon icon={Calendar03Icon} />
        <time dateTime={event.startAt}>{when}</time>
      </p>
      {place ? (
        <p className="flex gap-2 text-foreground">
          <MetaIcon icon={Location01Icon} />
          <span>{place}</span>
        </p>
      ) : null}
      {event.hosts.length > 0 ? (
        <p className="flex gap-2 text-foreground">
          <MetaIcon icon={UserGroupIcon} />
          <span>
            {copy.hostsLabel}: {event.hosts.join(", ")}
          </span>
        </p>
      ) : null}
      {event.summary ? (
        <p className="text-pretty text-foreground">{event.summary}</p>
      ) : null}
      <span className="inline-flex min-h-11 items-center gap-1 font-medium text-foreground underline decoration-foreground/40 underline-offset-4">
        {copy.lumaLabel}
        <span className="sr-only"> {copy.newTabLabel}</span>
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          strokeWidth={2}
          className="size-4 shrink-0"
          aria-hidden
        />
      </span>
    </a>
  )
}

function EventsIndex({ locale, copy, now }: EventsIndexProps) {
  const { upcoming, past } = splitLumaEvents(now)
  const pastGroups = groupPastLumaEvents(past, locale)

  return (
    <article className="page-gutter section-y mx-auto flex w-full max-w-6xl flex-col gap-12 md:gap-16">
      <header className="flex max-w-3xl flex-col gap-4">
        <Eyebrow>{copy.label}</Eyebrow>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-balance text-foreground md:text-5xl">
          {copy.headline}
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          {copy.intro}
        </p>
      </header>

      <section
        aria-labelledby="events-upcoming"
        className="flex flex-col gap-4"
      >
        <h2 id="events-upcoming" className={sectionHeadingClassName}>
          {copy.upcomingLabel}
        </h2>
        {upcoming.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {upcoming.map((event) => (
              <li key={event.id} className="min-w-0">
                <EventCard
                  event={event}
                  locale={locale}
                  copy={copy}
                  heading="h3"
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-base text-foreground">{copy.upcomingEmpty}</p>
        )}
      </section>

      <section aria-labelledby="events-photos" className="flex flex-col gap-4">
        <h2 id="events-photos" className={sectionHeadingClassName}>
          {copy.photosLabel}
        </h2>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {copy.photos.map((photo) => (
            <li key={photo.src} className="min-w-0">
              <img
                src={photo.src}
                alt={photo.alt}
                width={900}
                height={1200}
                loading="lazy"
                decoding="async"
                className="aspect-[3/4] w-full rounded-2xl object-cover"
              />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="events-past" className="flex flex-col gap-8">
        <h2 id="events-past" className={sectionHeadingClassName}>
          {copy.pastLabel}
        </h2>
        {pastGroups.map((group) => (
          <div key={group.key} className="flex flex-col gap-3">
            <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
              {group.label}
            </h3>
            <ul className="flex flex-col gap-3">
              {group.events.map((event) => (
                <li key={event.id} className="min-w-0">
                  <EventCard
                    event={event}
                    locale={locale}
                    copy={copy}
                    heading="h4"
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <Link
        to="/community"
        className={cn(
          "inline-flex min-h-11 w-fit cursor-pointer touch-manipulation items-center rounded-full bg-primary px-5 text-base font-medium text-primary-foreground transition-colors duration-200",
          "hover:bg-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground motion-reduce:transition-none",
        )}
      >
        {copy.communityCta}
      </Link>
    </article>
  )
}

export { EventsIndex }
