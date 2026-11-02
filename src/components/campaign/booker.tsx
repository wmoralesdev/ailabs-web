import { useEffect, useMemo, useRef, useState } from "react"
import type { CSSProperties, FormEvent, ReactNode, RefObject } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import type { IconSvgElement } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  Calendar03Icon,
  Clock01Icon,
  Globe02Icon,
  Tick02Icon,
  Video01Icon,
} from "@hugeicons/core-free-icons"
// DayPicker's own locales carry its translated labels ("Hoy", "seleccionado").
import { enUS } from "react-day-picker/locale/en-US"
import { es } from "react-day-picker/locale/es"

import { HalftoneCanvas } from "@/components/halftone/halftone-canvas"
import { Calendar } from "@/components/ui/calendar"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { BookerContent, Locale } from "@/content"
import { BOOKING_TOPIC_OPTIONS } from "@/content/booking"
import type { BookingTopic } from "@/content/booking"
import {
  BookingError,
  createBooking,
  dateFromKey,
  dayKey,
  fetchSlots,
} from "@/lib/cal-booking"
import type { BookingResult, SlotsByDay } from "@/lib/cal-booking"
import { cn } from "@/lib/utils"

/** How many months past this one the calendar lets the visitor browse. */
const MONTHS_AHEAD = 3

type MonthState =
  | { status: "loading" }
  | { status: "ready"; days: SlotsByDay }
  | { status: "error" }

type Step = "pick" | "form" | "done"

type BookerProps = {
  /** `<username>/<event-slug>` on cal.com. */
  calLink: string
  /** Preselects the topic question when a service page sent one. */
  topic?: BookingTopic
  locale: Locale
  copy: BookerContent
  /** Accessible name of the booker region. */
  title: string
  /** The page's H1 and lead, in the event column like cal.com's title. */
  headline: string
  lead: string
}

function monthId(month: Date) {
  return `${month.getFullYear()}-${month.getMonth()}`
}

function monthFromId(id: string) {
  const [year, month] = id.split("-").map(Number)
  return new Date(year, month, 1)
}

function upperFirst(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function firstOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

/** "America/El_Salvador" as "El Salvador (GMT-6)". */
function zoneLabel(timeZone: string, locale: Locale) {
  const city = (timeZone.split("/").pop() ?? timeZone).replaceAll("_", " ")
  try {
    const offset = new Intl.DateTimeFormat(locale, {
      timeZone,
      timeZoneName: "shortOffset",
    })
      .formatToParts(new Date())
      .find((part) => part.type === "timeZoneName")?.value
    return offset ? `${city} (${offset})` : city
  } catch {
    return city
  }
}

/**
 * Days and times are one control family: the same small radius, body-small
 * type, tabular figures and a 44px target on touch screens.
 */
const slotClassName =
  "inline-flex h-11 w-full items-center justify-center rounded-lg border border-input bg-transparent px-2 text-small font-medium whitespace-nowrap text-foreground tabular-nums transition-colors outline-none hover:border-purple-ink focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 md:h-10"

/** The column headers share one band, so the three titles line up. */
const headerBandClassName = "flex min-h-11 items-center sm:min-h-10"

/** Every column has the same inset; the calendar fills it edge to edge. */
const columnPadding = "p-4 sm:p-6"

/**
 * The reserved height of the calendar before it mounts: caption, weekdays and
 * six fixed weeks. Keeps the card from jumping on hydration.
 */
const calendarHeight = "h-[20.5rem] sm:h-[26.5rem] lg:h-[25rem]"

/** Fields sit on paper, so they read as wells in the card in both themes. */
const fieldClassName = "bg-background dark:bg-background"

/** The event, title and all, at the left from `lg`. */
const eventColumn = "19rem"

/**
 * The diagnostic's booker on `/agendar`, laid out like cal.com's own: the
 * event at the left with the page's title, a month of square days, and the
 * times of the chosen day in one scrolling column; then the card narrows to
 * the event and a short form, as cal.com's does.
 * Below `lg` the event goes on top, and below `md` everything stacks.
 * cal.com stays the calendar of record: the slots come from its public API and
 * the booking goes back to it, which sends the invitation. Nothing is stored
 * here.
 */
function Booker({
  calLink,
  topic,
  locale,
  copy,
  title,
  headline,
  lead,
}: BookerProps) {
  const [mounted, setMounted] = useState(false)
  const [timeZone, setTimeZone] = useState("UTC")
  const [thisMonth, setThisMonth] = useState<Date>(() =>
    firstOfMonth(new Date())
  )
  const [month, setMonth] = useState<Date>(thisMonth)
  const [months, setMonths] = useState<Partial<Record<string, MonthState>>>({})
  const [attempt, setAttempt] = useState(0)
  const [selectedDay, setSelectedDay] = useState<string>()
  const [slot, setSlot] = useState<string>()
  const [step, setStep] = useState<Step>("pick")
  const [hour12, setHour12] = useState(true)
  const [notice, setNotice] = useState("")
  const [confirmation, setConfirmation] = useState<
    (BookingResult & { email: string }) | undefined
  >()
  /** Requests sent per month, and the newest one whose answer is shown. */
  const sentRequests = useRef<Record<string, number>>({})
  const shownRequest = useRef<Record<string, number>>({})
  /** Where focus goes once a step change has rendered. */
  const focusNext = useRef<"times" | "done" | null>(null)
  const timesHeading = useRef<HTMLHeadingElement>(null)
  const doneHeading = useRef<HTMLHeadingElement>(null)

  // The time zone and today's date exist only in the browser.
  useEffect(() => {
    const current = firstOfMonth(new Date())
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC")
    setThisMonth(current)
    setMonth(current)
    setMounted(true)
  }, [])

  const id = monthId(month)

  // Every month keeps its own answer, so flipping months while a request is
  // in flight never strands the one left behind. An answer older than the
  // one on screen is dropped.
  useEffect(() => {
    if (!mounted) return
    const request = (sentRequests.current[id] ?? 0) + 1
    sentRequests.current[id] = request
    const show = (next: (current?: MonthState) => MonthState) => {
      if (request < (shownRequest.current[id] ?? 0)) return
      shownRequest.current[id] = request
      setMonths((all) => ({ ...all, [id]: next(all[id]) }))
    }
    setMonths((all) =>
      all[id] ? all : { ...all, [id]: { status: "loading" } }
    )
    fetchSlots(calLink, monthFromId(id), timeZone)
      .then((days) => show(() => ({ status: "ready", days })))
      // A failed refresh keeps the times already shown.
      .catch(() =>
        show((current) =>
          current?.status === "ready" ? current : { status: "error" }
        )
      )
  }, [mounted, calLink, timeZone, id, attempt])

  const state = months[id] ?? { status: "loading" }
  const days = useMemo<SlotsByDay>(
    () => (state.status === "ready" ? state.days : {}),
    [state]
  )

  // Open on the first day with times; leaving a month clears the choice.
  useEffect(() => {
    if (step !== "pick" || state.status !== "ready") return
    if (selectedDay && selectedDay in days) return
    setSelectedDay(Object.keys(days).sort()[0])
  }, [step, state.status, days, selectedDay])

  useEffect(() => {
    const target = focusNext.current
    if (!target) return
    focusNext.current = null
    ;(target === "times" ? timesHeading : doneHeading).current?.focus()
  }, [step])

  const dateFormat = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        weekday: "long",
        day: "numeric",
        month: "long",
      }),
    [locale]
  )
  const timeFormat = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        hour: "numeric",
        minute: "2-digit",
        hour12,
      }),
    [locale, hour12]
  )

  const retry = () => {
    setMonths((all) => ({ ...all, [id]: { status: "loading" } }))
    setAttempt((count) => count + 1)
  }

  const onBooked = (result: BookingResult, email: string) => {
    setConfirmation({ ...result, email })
    focusNext.current = "done"
    setStep("done")
  }

  const onBack = () => {
    focusNext.current = "times"
    setStep("pick")
  }

  const onRejected = () => {
    setSlot(undefined)
    focusNext.current = "times"
    setStep("pick")
    setNotice(copy.rejected)
    retry()
  }

  const when = (start: string) =>
    `${upperFirst(dateFormat.format(new Date(start)))} · ${timeFormat.format(new Date(start))}`

  const picked =
    step === "form" && slot
      ? when(slot)
      : step === "done" && confirmation
        ? when(confirmation.start)
        : undefined

  // Only a day of the month on screen, with times, is shown in the times column.
  const activeDay =
    state.status === "ready" && selectedDay && selectedDay in days
      ? selectedDay
      : undefined

  return (
    <section
      aria-label={title}
      style={{ "--event-column": eventColumn } as CSSProperties}
      className={cn(
        "mx-auto grid w-full overflow-hidden rounded-3xl border border-border bg-surface text-foreground motion-safe:transition-[max-width] motion-safe:duration-300 motion-safe:ease-out md:grid-cols-[minmax(0,1fr)_15rem]",
        step === "pick"
          ? "lg:max-w-full lg:grid-cols-[var(--event-column)_minmax(0,1fr)_13.5rem]"
          : "lg:max-w-[51rem] lg:grid-cols-[var(--event-column)_minmax(0,1fr)]"
      )}
    >
      <EventInfo
        headline={headline}
        lead={lead}
        copy={copy}
        zone={mounted ? zoneLabel(timeZone, locale) : ""}
        when={picked}
      />

      {step === "pick" ? (
        <>
          <div
            className={cn(
              columnPadding,
              "flex min-w-0 flex-col gap-4 border-t lg:border-t-0 lg:border-l"
            )}
          >
            {notice ? (
              <p
                role="alert"
                className="text-small font-semibold text-destructive"
              >
                {notice}
              </p>
            ) : null}
            {mounted ? (
              <Calendar
                mode="single"
                month={month}
                onMonthChange={setMonth}
                startMonth={thisMonth}
                endMonth={
                  new Date(
                    thisMonth.getFullYear(),
                    thisMonth.getMonth() + MONTHS_AHEAD,
                    1
                  )
                }
                selected={activeDay ? dateFromKey(activeDay) : undefined}
                onSelect={(date) => {
                  if (date) setSelectedDay(dayKey(date))
                }}
                disabled={(date) => !days[dayKey(date)]}
                modifiers={{ available: (date) => Boolean(days[dayKey(date)]) }}
                modifiersClassNames={{
                  available:
                    "[&>button]:bg-foreground/[0.07] [&>button]:font-semibold [&>button]:text-foreground [&>button:not([data-selected-single=true]):hover]:bg-foreground/[0.14]",
                }}
                // El Salvador's weeks, like cal.com's, start on Sunday.
                weekStartsOn={0}
                // Six weeks always, so the card keeps its height month to month.
                fixedWeeks
                showOutsideDays={false}
                locale={locale === "es" ? es : enUS}
                formatters={{
                  formatCaption: (date) =>
                    upperFirst(
                      new Intl.DateTimeFormat(locale, {
                        month: "long",
                        year: "numeric",
                      }).format(date)
                    ),
                }}
                labels={{
                  labelPrevious: () => copy.previousMonth,
                  labelNext: () => copy.nextMonth,
                }}
                // Days stay square, so below `lg` the month keeps a cal.com size.
                className="mx-auto w-full max-w-[28rem] bg-transparent p-0 lg:max-w-none"
                classNames={{
                  root: "w-full",
                  nav: "absolute top-0 right-0 flex items-center gap-1",
                  button_previous: navButtonClassName,
                  button_next: navButtonClassName,
                  month_caption: cn(headerBandClassName, "justify-start"),
                  caption_label: "text-base font-semibold",
                  weekday:
                    "flex-1 pb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase",
                  week: "mt-1 flex w-full",
                  day: "group/day flex min-w-0 flex-1 items-center justify-center p-0.5 text-center select-none [&>button]:aspect-square [&>button]:w-full [&>button]:min-w-0 [&>button]:rounded-lg [&>button]:text-small [&>button]:font-medium [&>button]:tabular-nums",
                  today:
                    "[&>button]:after:absolute [&>button]:after:bottom-1 [&>button]:after:left-1/2 [&>button]:after:size-1 [&>button]:after:-translate-x-1/2 [&>button]:after:rounded-full [&>button]:after:bg-current",
                  // Unavailable days stay readable (3:1 and up in both themes).
                  disabled:
                    "[&>button]:text-muted-foreground [&>button:disabled]:opacity-75",
                }}
              />
            ) : (
              <div className={calendarHeight} aria-hidden />
            )}
          </div>

          <TimesPanel
            copy={copy}
            state={state}
            starts={activeDay ? (days[activeDay] ?? []) : []}
            hasDays={Object.keys(days).length > 0}
            dayLabel={
              activeDay
                ? upperFirst(
                    new Intl.DateTimeFormat(locale, {
                      weekday: "short",
                      day: "numeric",
                    }).format(dateFromKey(activeDay))
                  )
                : copy.timesTitle
            }
            dayName={
              activeDay
                ? upperFirst(dateFormat.format(dateFromKey(activeDay)))
                : undefined
            }
            headingRef={timesHeading}
            timeFormat={timeFormat}
            hour12={hour12}
            onHour12={setHour12}
            onRetry={retry}
            onPick={(start) => {
              setNotice("")
              setSlot(start)
              setStep("form")
            }}
          />
        </>
      ) : (
        <div
          className={cn(
            columnPadding,
            "min-w-0 border-t md:col-span-2 lg:col-span-1 lg:border-t-0 lg:border-l"
          )}
        >
          {step === "form" && slot ? (
            <BookingForm
              calLink={calLink}
              copy={copy}
              locale={locale}
              slot={slot}
              timeZone={timeZone}
              topic={topic}
              onBack={onBack}
              onBooked={onBooked}
              onRejected={onRejected}
            />
          ) : null}

          {step === "done" && confirmation ? (
            <div className="flex flex-col items-start gap-4 py-2">
              <span className="flex size-12 items-center justify-center rounded-full bg-purple text-on-purple">
                <HugeiconsIcon
                  icon={Tick02Icon}
                  strokeWidth={2}
                  className="size-6"
                  aria-hidden
                />
              </span>
              <h2
                ref={doneHeading}
                tabIndex={-1}
                className="display text-3xl outline-none"
              >
                {copy.confirmedTitle}
              </h2>
              <p className="max-w-prose text-muted-foreground">
                {copy.confirmedBody}{" "}
                <strong className="font-semibold text-foreground">
                  {confirmation.email}
                </strong>
                .
              </p>
              <a
                href={`https://cal.com/booking/${confirmation.uid}`}
                className="text-action"
              >
                {copy.manage}
              </a>
            </div>
          ) : null}
        </div>
      )}
    </section>
  )
}

/** Month arrows: 44px on touch screens, a quiet tint on hover. */
const navButtonClassName =
  "inline-flex size-11 items-center justify-center rounded-lg text-foreground transition-colors outline-none select-none hover:bg-foreground/10 focus-visible:ring-2 focus-visible:ring-ring/50 aria-disabled:pointer-events-none aria-disabled:opacity-40 sm:size-10"

function InfoItem({
  icon,
  strong = false,
  children,
}: {
  icon: IconSvgElement
  strong?: boolean
  children: ReactNode
}) {
  return (
    <li
      className={cn(
        "flex items-center gap-2.5",
        strong && "font-semibold text-foreground"
      )}
    >
      <HugeiconsIcon
        icon={icon}
        strokeWidth={2}
        className="size-4 shrink-0"
        aria-hidden
      />
      <span>{children}</span>
    </li>
  )
}

type EventInfoProps = {
  headline: string
  lead: string
  copy: BookerContent
  zone: string
  /** The chosen date and time, once there is one. */
  when?: string
}

/**
 * The home hero's mark in the empty foot of the event column: the same live
 * halftone, only where there is room for it (`lg` and up). The column is its
 * pointer surface; the canvas mounts only on wide screens and unmounts, with
 * its loop and listeners, when the window narrows.
 */
function EventMark() {
  const [wide, setWide] = useState(false)

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return
    const query = window.matchMedia("(min-width: 1024px)")
    const sync = () => setWide(query.matches)
    sync()
    query.addEventListener("change", sync)
    return () => query.removeEventListener("change", sync)
  }, [])

  if (!wide) return null
  return (
    <>
      <HalftoneCanvas
        src="/brand/ailabs-iso-dark.svg"
        cell={6}
        rest={0}
        story
        className="absolute inset-0 -z-10"
      />
      {/*
        Where the printed mark sits; the canvas reads this box. Pinned to the
        foot and never squeezed, so a taller card (the form) only adds air
        above it.
      */}
      <div
        data-halftone-slot
        aria-hidden="true"
        className="mt-auto aspect-[278/324] w-full max-w-[6.5rem] shrink-0 self-start"
      />
    </>
  )
}

/** What the visitor is booking, always in view like cal.com's left column. */
function EventInfo({ headline, lead, copy, zone, when }: EventInfoProps) {
  return (
    <div
      data-halftone-surface
      className={cn(
        columnPadding,
        "relative isolate flex min-w-0 flex-col gap-4 overflow-clip [--ht-accent:var(--color-purple-ink)] [--ht-faint:color-mix(in_srgb,var(--color-ink)_10%,transparent)] [--ht-ink:var(--color-ink)] md:col-span-2 lg:col-span-1"
      )}
    >
      <header className="flex flex-col gap-2">
        <div className={headerBandClassName}>
          <Eyebrow>{copy.eventTitle}</Eyebrow>
        </div>
        <h1 className="display text-3xl text-balance lg:text-[1.75rem] lg:leading-[1.15]">
          {headline}
        </h1>
        <p className="mt-1 max-w-xl text-small leading-relaxed text-muted-foreground">
          {lead}
        </p>
      </header>
      <ul className="flex flex-wrap gap-x-5 gap-y-2 text-small text-muted-foreground lg:flex-col lg:gap-3">
        {when ? (
          <InfoItem icon={Calendar03Icon} strong>
            {when}
          </InfoItem>
        ) : null}
        <InfoItem icon={Clock01Icon}>{copy.durationLabel}</InfoItem>
        <InfoItem icon={Video01Icon}>{copy.locationLabel}</InfoItem>
        {zone ? (
          <InfoItem icon={Globe02Icon}>
            <span className="sr-only">{copy.timeZoneLabel} </span>
            {zone}
          </InfoItem>
        ) : null}
      </ul>
      <EventMark />
    </div>
  )
}

type TimesPanelProps = {
  copy: BookerContent
  state: MonthState
  /** Start times of the day on screen. */
  starts: Array<string>
  /** The month has at least one day with times. */
  hasDays: boolean
  /** Short heading, "Lun 2", or the column title before a day. */
  dayLabel: string
  /** The full date, which names the group of times for screen readers. */
  dayName?: string
  headingRef: RefObject<HTMLHeadingElement | null>
  timeFormat: Intl.DateTimeFormat
  hour12: boolean
  onHour12: (hour12: boolean) => void
  onRetry: () => void
  onPick: (start: string) => void
}

function TimesPanel({
  copy,
  state,
  starts,
  hasDays,
  dayLabel,
  dayName,
  headingRef,
  timeFormat,
  hour12,
  onHour12,
  onRetry,
  onPick,
}: TimesPanelProps) {
  const listRef = useRef<HTMLDivElement>(null)
  // The fade at the foot shows only while there are more times below.
  const [more, setMore] = useState(false)

  useEffect(() => {
    const list = listRef.current
    if (!list) {
      setMore(false)
      return
    }
    // Another day starts at its first time, not where the last one was left.
    list.scrollTop = 0
    const sync = () =>
      setMore(list.scrollHeight - list.scrollTop - list.clientHeight > 2)
    sync()
    list.addEventListener("scroll", sync, { passive: true })
    const ro =
      typeof ResizeObserver === "function" ? new ResizeObserver(sync) : null
    ro?.observe(list)
    return () => {
      list.removeEventListener("scroll", sync)
      ro?.disconnect()
    }
  }, [starts])

  return (
    // From `md` the column is as tall as the calendar; the times scroll inside.
    <div className="relative min-w-0 border-t md:border-l lg:border-t-0">
      <div
        className={cn(
          columnPadding,
          "flex flex-col gap-4 md:absolute md:inset-0"
        )}
      >
        <div className={cn(headerBandClassName, "justify-between gap-2")}>
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="text-base font-semibold outline-none"
          >
            {dayLabel}
          </h2>
          <div
            role="group"
            aria-label={copy.hourFormatLabel}
            className="inline-flex rounded-lg border border-border p-0.5 text-xs font-semibold"
          >
            {(
              [
                [true, copy.hour12Label],
                [false, copy.hour24Label],
              ] as const
            ).map(([value, label]) => (
              <button
                key={label}
                type="button"
                aria-pressed={hour12 === value}
                onClick={() => onHour12(value)}
                className={cn(
                  "h-10 rounded-md px-3 tabular-nums transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50 sm:h-7 sm:px-2",
                  hour12 === value
                    ? "bg-foreground/10 text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {state.status === "loading" ? (
          <div
            role="status"
            className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-1"
          >
            <span className="sr-only">{copy.loading}</span>
            {Array.from({ length: 6 }, (_, index) => (
              <span
                key={index}
                aria-hidden
                className="h-11 rounded-lg bg-foreground/[0.06] motion-safe:animate-pulse md:h-10"
              />
            ))}
          </div>
        ) : null}

        {state.status === "error" ? (
          <div role="status" className="flex flex-col items-start gap-1">
            <p className="text-small text-muted-foreground">{copy.loadError}</p>
            <button type="button" onClick={onRetry} className="text-action">
              {copy.retry}
            </button>
          </div>
        ) : null}

        {state.status === "ready" && !hasDays ? (
          <p role="status" className="text-small text-muted-foreground">
            {copy.noTimes}
          </p>
        ) : null}

        {state.status === "ready" && hasDays && starts.length === 0 ? (
          <p className="text-small text-muted-foreground">{copy.pickDay}</p>
        ) : null}

        {state.status === "ready" && starts.length > 0 ? (
          <div
            ref={listRef}
            role="group"
            aria-label={dayName}
            className={cn(
              // The inset keeps focus rings clear of the scroll edge.
              "-m-1 grid grid-cols-3 content-start gap-2 p-1 [scrollbar-width:none] sm:grid-cols-4 md:flex md:min-h-0 md:flex-1 md:flex-col md:overflow-y-auto md:overscroll-contain",
              more &&
                "md:[mask-image:linear-gradient(to_bottom,black_calc(100%-3rem),transparent)]"
            )}
          >
            {starts.map((start) => (
              <button
                key={start}
                type="button"
                onClick={() => onPick(start)}
                className={cn(slotClassName, "md:shrink-0")}
              >
                {timeFormat.format(new Date(start))}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

type BookingFormProps = {
  calLink: string
  copy: BookerContent
  locale: Locale
  slot: string
  timeZone: string
  topic?: BookingTopic
  onBack: () => void
  onBooked: (result: BookingResult, email: string) => void
  onRejected: () => void
}

function BookingForm({
  calLink,
  copy,
  locale,
  slot,
  timeZone,
  topic,
  onBack,
  onBooked,
  onRejected,
}: BookingFormProps) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const nameRef = useRef<HTMLInputElement>(null)

  // The time the visitor clicked is gone from the page; continue in the form.
  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitting) return
    const data = new FormData(event.currentTarget)
    const text = (name: string) => String(data.get(name) ?? "").trim()
    setSubmitting(true)
    setError("")
    try {
      const result = await createBooking(calLink, {
        start: slot,
        name: text("name"),
        email: text("email"),
        company: text("company"),
        topic: text("topic"),
        notes: text("notes"),
        timeZone,
        language: locale,
      })
      onBooked(result, text("email"))
    } catch (failure) {
      if (failure instanceof BookingError && failure.rejected) {
        onRejected()
        return
      }
      setError(copy.failed)
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-busy={submitting}
      className="flex flex-col gap-5"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-small font-semibold">
          {copy.nameLabel}
          <Input
            ref={nameRef}
            name="name"
            size="xl"
            required
            className={fieldClassName}
            autoComplete="name"
            placeholder={copy.namePlaceholder}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-small font-semibold">
          {copy.emailLabel}
          <Input
            name="email"
            type="email"
            size="xl"
            required
            className={fieldClassName}
            autoComplete="email"
            placeholder={copy.emailPlaceholder}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-small font-semibold">
        {copy.companyLabel}
        <Input
          name="company"
          size="xl"
          required
          className={fieldClassName}
          autoComplete="organization"
          placeholder={copy.companyPlaceholder}
        />
      </label>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1 text-small font-semibold">
          {copy.topicLabel}
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {BOOKING_TOPIC_OPTIONS.map((option) => (
            <label
              key={option.key}
              className={cn(
                "relative flex min-h-11 cursor-pointer items-center rounded-xl border border-input px-3 py-2 text-small transition-colors",
                "hover:border-foreground/40 has-checked:border-purple-ink has-checked:font-semibold has-checked:ring-1 has-checked:ring-purple-ink has-focus-visible:ring-2 has-focus-visible:ring-ring/50"
              )}
            >
              {/*
                Visually hidden but laid over its card, so the browser's
                "pick one" bubble points at the options.
              */}
              <input
                type="radio"
                name="topic"
                value={option.value}
                required
                defaultChecked={topic === option.key}
                className="absolute inset-0 size-full cursor-pointer opacity-0"
              />
              {copy.topics[option.key]}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex flex-col gap-1.5 text-small font-semibold">
        {copy.notesLabel}
        <Textarea
          name="notes"
          size="xl"
          className={fieldClassName}
          placeholder={copy.notesPlaceholder}
        />
      </label>

      {error ? (
        <p role="alert" className="text-small font-semibold text-destructive">
          {error}
        </p>
      ) : null}

      {/* Back and confirm together at the foot, like cal.com's form. */}
      <div className="flex flex-wrap items-center justify-end gap-x-5 gap-y-3">
        <button
          type="button"
          onClick={onBack}
          className="text-action [&>svg]:transition-transform hover:[&>svg]:-translate-x-0.5"
        >
          <HugeiconsIcon
            icon={ArrowLeft01Icon}
            strokeWidth={2}
            className="size-4"
            aria-hidden
          />
          {/* A text node is not `:last-child`; the span keeps the arrow still. */}
          <span>{copy.changeTime}</span>
        </button>
        <button type="submit" disabled={submitting} className="btn">
          {submitting ? copy.submitting : copy.submit}
        </button>
      </div>
    </form>
  )
}

export { Booker }
export type { BookerProps }
