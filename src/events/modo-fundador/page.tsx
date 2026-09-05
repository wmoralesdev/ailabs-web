import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  Cancel01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"
import type { ReactNode } from "react"

import { HomePaperArcs } from "@/components/home/home-paper-arcs"
import { HomeReveal } from "@/components/home/home-reveal"
import { CanvasRevealBanner } from "@/components/ui/canvas-reveal-banner"
import type { Locale } from "@/content"
import { getModoFundadorContent } from "@/events/modo-fundador/content"
import {
  breakIcon,
  closeIcon,
  deliverableIcons,
  factIcons,
  proofIcons,
  requirementIcons,
  tagIcons,
} from "@/events/modo-fundador/icons"
import type { IconDefinition } from "@/events/modo-fundador/icons"
import { PassLockup } from "@/events/modo-fundador/pass-lockup"
import { RegistrationForm } from "@/events/modo-fundador/registration-form"
import { cn } from "@/lib/utils"

type ModoFundadorPageProps = {
  locale: Locale
  soldOut: boolean
  seatsLeft: number
  capacity: number
  daysUntil: number | null
}

/**
 * The pass, all the way down. The face and the registration band are violet
 * ticket stock, the middle is the paper it was torn from, and the seams between
 * them are perforated. Paper islands on violet are theme-invariant
 * (`surface-paper`) because the violet never changes with the theme — a
 * theme-following card would turn into a dark hole on an unchanged field.
 *
 * Text on violet never drops below /80 of `primary-foreground`: /70 measures
 * 3.8:1 against brand purple and fails AA.
 */
const shellClassName = "mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-12"

const bandClassName = "py-14 lg:py-20"

const passEnter =
  "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:fill-mode-backwards motion-safe:duration-500"

const microLabel = "font-mono text-xs font-semibold tracking-[0.14em] uppercase"

const sectionTitleClassName =
  "font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl"

const subTitleClassName =
  "font-display text-xl font-semibold tracking-tight md:text-2xl"

/** Section heading + supporting note on the left, content on the right. */
const railClassName =
  "grid gap-8 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-14"

const ctaBaseClassName =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold tracking-wide transition-[background-color,transform] duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none motion-safe:active:translate-y-px"

/** Ink CTA for paper islands sitting on the violet pass. */
const inkCtaClassName = cn(
  ctaBaseClassName,
  "w-full bg-foreground text-background hover:bg-foreground/85 focus-visible:ring-foreground focus-visible:ring-offset-background"
)

function formatSeats(template: string, count: number, total: number): string {
  return template
    .replace("{count}", String(count))
    .replace("{total}", String(total))
}

/**
 * Ticket perforation: two punched notches riding the seam, plus a dashed tear
 * line. The notches show the section *above* through the paper, so their fill
 * has to match whatever band precedes this one.
 */
function Perforation({
  className,
  notchClassName,
}: {
  className?: string
  notchClassName: string
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-10",
        className
      )}
      aria-hidden
    >
      {/* Centered on the shell gutter, not the viewport edge — at the edge only
          a quarter of each notch would be on screen. */}
      <span
        className={cn(
          "absolute top-0 left-6 size-7 -translate-x-1/2 -translate-y-1/2 rounded-full sm:left-10 sm:size-8 lg:left-12",
          notchClassName
        )}
      />
      <span
        className={cn(
          "absolute top-0 right-6 size-7 translate-x-1/2 -translate-y-1/2 rounded-full sm:right-10 sm:size-8 lg:right-12",
          notchClassName
        )}
      />
      <div
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, currentColor 0 12px, transparent 12px 24px)",
        }}
      />
    </div>
  )
}

/** Diagonal hatch strip — the pass's printed edge. */
function HatchEdge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 h-12 md:h-16",
        className
      )}
      style={{
        backgroundImage:
          "repeating-linear-gradient(-45deg, transparent, transparent 10px, color-mix(in oklab, var(--primary-foreground) 22%, transparent) 10px, color-mix(in oklab, var(--primary-foreground) 22%, transparent) 12px)",
      }}
      aria-hidden
    />
  )
}

/**
 * Punched circular glyph. `ink` is the variant for violet bands, where a violet
 * tile would vanish into its own background.
 */
function Punch({
  icon,
  tone = "violet",
  size = "md",
  className,
}: {
  icon: IconDefinition
  tone?: "violet" | "ink"
  size?: "sm" | "md"
  className?: string
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full",
        tone === "violet"
          ? "bg-primary text-primary-foreground"
          : "bg-primary-foreground text-primary",
        size === "sm" ? "size-7" : "size-10",
        className
      )}
    >
      <HugeiconsIcon
        icon={icon}
        strokeWidth={2}
        className={size === "sm" ? "size-3.5" : "size-5"}
      />
    </span>
  )
}

function Section({
  title,
  note,
  aside,
  children,
}: {
  title: string
  note?: string
  aside?: ReactNode
  children: ReactNode
}) {
  return (
    <div className={railClassName}>
      <div>
        <h2 className={sectionTitleClassName}>{title}</h2>
        {note ? (
          <p className="mt-4 text-sm leading-relaxed text-pretty text-muted-foreground">
            {note}
          </p>
        ) : null}
        {aside}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  )
}

function ModoFundadorPage({
  locale,
  soldOut,
  seatsLeft,
  capacity,
  daysUntil,
}: ModoFundadorPageProps) {
  const content = getModoFundadorContent(locale)

  const countdownLabel =
    daysUntil === null
      ? null
      : daysUntil === 1
        ? content.countdownSingular
        : content.countdown.replace("{days}", String(daysUntil))

  const seatsTaken = Math.max(0, capacity - seatsLeft)
  const showSeatCount = capacity > 0 && !soldOut
  // An empty track reads as a broken widget, so the bar waits for real demand.
  const showSeatBar = showSeatCount && seatsTaken > 0
  const seatsFilledPercent = capacity > 0 ? (seatsTaken / capacity) * 100 : 0

  // Breaks are unnumbered, so the visible sequence has to be counted separately
  // from the array index or the session numbers skip.
  let sessionCount = 0
  const agenda = content.agenda.map((item) => {
    const numbered = item.kind !== "break" && item.kind !== "close"
    if (numbered) {
      sessionCount += 1
    }
    return { ...item, ordinal: numbered ? sessionCount : null }
  })

  return (
    <div className="min-h-dvh bg-background text-foreground">
      {/* Pass face — violet stock, ink type, one paper island for the boarding
          strip. The registration form itself lives at the bottom. */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        {/* Held off the top-right so it stops competing with the rail; it now
            fills the gutter between the title and the boarding strip. */}
        <img
          src="/brand/claude-symbol.svg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-1/2 -right-[24%] w-[80%] -translate-y-1/2 opacity-[0.09] brightness-0 md:w-[56%] lg:-right-[16%] lg:w-[48%]"
        />
        <HatchEdge className="bottom-0 opacity-40" />

        <div
          className={cn(
            shellClassName,
            "relative z-10 flex min-h-[min(88dvh,44rem)] flex-col pt-[calc(var(--site-header-offset)+0.75rem)] pb-20"
          )}
        >
          {/* Printed header rail. The rule turns the lockup and the eyebrow
              into pass chrome instead of two objects floating on the field. */}
          <header className="flex items-center justify-between gap-6 border-b border-primary-foreground/25 pb-5">
            <PassLockup />
            <div className="min-w-0 text-right">
              {countdownLabel ? (
                <p
                  className={cn(
                    microLabel,
                    "text-primary-foreground sm:text-sm"
                  )}
                >
                  {countdownLabel}
                </p>
              ) : null}
              <p
                className={cn(
                  microLabel,
                  "mt-1 text-[0.6rem] text-balance text-primary-foreground/80 sm:text-[0.7rem]"
                )}
              >
                {content.eyebrow.join(" ")}
              </p>
            </div>
          </header>

          <div className="grid flex-1 content-center items-center gap-10 py-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(19rem,0.85fr)] lg:gap-14">
            <div className={cn(passEnter, "max-w-xl")}>
              <h1 className="font-display text-[clamp(3.5rem,12vw,7.5rem)] leading-[0.84] font-semibold tracking-tight">
                <span
                  className="block"
                  style={{
                    WebkitTextStrokeWidth: "clamp(1.5px, 0.34vw, 3px)",
                    WebkitTextStrokeColor: "currentColor",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {content.title[0]}
                </span>
                <span className="block">{content.title[1]}</span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-pretty text-primary-foreground/90 md:text-lg">
                {content.deck}
              </p>
            </div>

            {/* Boarding strip — the pass's tear-off corner. The ink slab gives
                the card a printed header and the mass to hold the right side
                against the title. */}
            <div
              className={cn(
                passEnter,
                "surface-paper shadow-lift w-full overflow-hidden rounded-2xl motion-safe:delay-150"
              )}
            >
              <div className="flex items-center justify-between gap-3 bg-foreground px-5 py-3 text-background sm:px-6">
                <span
                  className={cn(
                    microLabel,
                    "text-[0.65rem] text-background/85"
                  )}
                >
                  {content.city}
                </span>
                <span className={cn(microLabel, "text-[0.65rem]")}>
                  {`${content.date.day} ${content.date.monthYear}`}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-end justify-between gap-4">
                  <p className={cn(microLabel, "text-foreground/65")}>
                    {soldOut ? content.soldOutLabel : content.ctaLabel}
                  </p>
                  <p className="font-display text-4xl leading-none font-semibold tracking-tight tabular-nums">
                    {content.price}
                  </p>
                </div>

                <div
                  className="my-5 h-[3px] w-full"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to right, color-mix(in oklab, var(--foreground) 22%, transparent) 0 10px, transparent 10px 20px)",
                  }}
                  aria-hidden
                />

                {showSeatCount ? (
                  <div className="mb-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className={cn(microLabel, "text-foreground/65")}>
                        {content.seatsLabel}
                      </span>
                      <span className="text-sm font-semibold text-foreground tabular-nums">
                        {formatSeats(
                          content.seatsRemaining,
                          seatsLeft,
                          capacity
                        )}
                      </span>
                    </div>
                    {showSeatBar ? (
                      <div
                        className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10"
                        aria-hidden
                      >
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${seatsFilledPercent}%` }}
                        />
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {soldOut ? (
                  <p className="text-sm leading-relaxed text-pretty text-foreground/70">
                    {content.soldOutNote}
                  </p>
                ) : (
                  <>
                    <a href="#register" className={inkCtaClassName}>
                      {content.ctaLabel}
                      <HugeiconsIcon
                        icon={ArrowRight01Icon}
                        strokeWidth={2}
                        className="size-4"
                        aria-hidden
                      />
                    </a>
                    <p
                      className={cn(
                        microLabel,
                        "mt-3 text-center text-[0.65rem] text-foreground/60"
                      )}
                    >
                      {content.priceNote}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky-CTA scope: pinned while the explanatory bands are on screen,
          released as the registration band comes into view. No JS. */}
      <div className="relative">
        {/* Stub — torn off the face: date, facts, and the coverage chips. */}
        <section className="relative bg-background text-foreground">
          <Perforation
            className="text-foreground/30"
            notchClassName="bg-primary"
          />

          <div className={cn(shellClassName, "py-10 sm:py-12")}>
            <div className="flex flex-col gap-8 md:flex-row md:items-stretch">
              <div className="flex shrink-0 flex-col justify-center border-b border-foreground/15 pb-6 md:border-r md:border-b-0 md:pr-8 md:pb-0">
                <span className="font-display text-5xl leading-none font-black tracking-tight tabular-nums sm:text-6xl">
                  {content.date.day}
                </span>
                <span
                  className={cn(
                    microLabel,
                    "mt-1 text-sm tracking-[0.16em] text-foreground/70"
                  )}
                >
                  {content.date.monthYear}
                </span>
                <span
                  className={cn(
                    microLabel,
                    "mt-3 text-[0.7rem] text-foreground/60"
                  )}
                >
                  {content.city}
                </span>
                <span className="mt-1 text-sm text-muted-foreground">
                  {content.venueNote}
                </span>
                <span className="text-sm text-muted-foreground">
                  {content.scheduleNote}
                </span>
              </div>

              <dl className="grid flex-1 grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-0">
                {content.facts.map((fact, index) => (
                  <div
                    key={fact.label}
                    className={cn(
                      "flex flex-col gap-2 sm:pr-5",
                      index > 0 && "sm:border-l sm:border-foreground/15 sm:pl-5"
                    )}
                  >
                    <Punch icon={factIcons[fact.icon]} size="sm" />
                    <dt
                      className={cn(
                        microLabel,
                        "text-[0.7rem] text-muted-foreground"
                      )}
                    >
                      {fact.label}
                    </dt>
                    <dd className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2.5 border-t border-foreground/10 pt-5">
              <p
                className={cn(
                  microLabel,
                  "mr-1 text-[0.7rem] text-muted-foreground"
                )}
              >
                {content.tagsLabel}
              </p>
              {content.tags.map((tag) => (
                <span
                  key={tag.label}
                  className="inline-flex items-center gap-2 rounded-full border border-foreground/20 py-1.5 pr-3.5 pl-1.5 text-sm font-medium text-foreground/85"
                >
                  <Punch icon={tagIcons[tag.icon]} size="sm" />
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* The promise, and how the room is actually run. */}
        <section className="bg-background text-foreground">
          <div className={cn(shellClassName, bandClassName)}>
            <HomeReveal>
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
                <div>
                  <h2 className={sectionTitleClassName}>
                    {content.promiseTitle}
                  </h2>
                  <p className="mt-6 text-lg leading-relaxed text-pretty text-foreground/85 md:text-xl">
                    {content.promise}
                  </p>
                  <p className="mt-5 max-w-prose text-base leading-relaxed text-pretty text-foreground/70">
                    {content.sellLead}
                  </p>
                  <p className="mt-6 max-w-prose border-l-2 border-primary py-1 pl-4 text-sm leading-relaxed text-pretty text-foreground/75">
                    {content.programFrame}
                  </p>
                </div>

                {/* Modo is a type-and-ink pass, not a photo essay — the room
                    is described in operating terms instead of pictured. */}
                <div className="min-w-0 border-t border-foreground/15 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16">
                  <h3 className={subTitleClassName}>{content.proof.title}</h3>
                  <ul className="mt-4">
                    {content.proof.points.map((point, index) => (
                      <li
                        key={point.label}
                        className={cn(
                          "flex items-start gap-4 py-5",
                          index > 0 && "border-t border-foreground/12"
                        )}
                      >
                        <Punch
                          icon={proofIcons[point.icon]}
                          size="sm"
                          className="mt-0.5"
                        />
                        <div className="min-w-0">
                          <p className="text-base font-semibold tracking-tight text-pretty">
                            {point.label}
                          </p>
                          <p className="mt-1.5 text-sm leading-relaxed text-pretty text-muted-foreground">
                            {point.note}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </HomeReveal>
          </div>
        </section>

        {/* The day, as a spine: block height tracks minutes, breaks are gaps. */}
        <section className="relative overflow-hidden bg-surface-soft">
          <div
            aria-hidden
            className="main-grid-dots pointer-events-none absolute inset-0 opacity-[0.3]"
          />
          <div className={cn(shellClassName, bandClassName, "relative")}>
            <HomeReveal>
              <Section
                title={content.agendaTitle}
                note={content.agendaNote}
                aside={
                  <p className="mt-6 border-t border-foreground/15 pt-5">
                    <span className="block font-display text-4xl leading-none font-semibold tracking-tight tabular-nums">
                      {content.agendaPracticeTotal}
                    </span>
                    <span
                      className={cn(
                        microLabel,
                        "mt-2 block text-[0.7rem] text-muted-foreground"
                      )}
                    >
                      {content.agendaPracticeLabel}
                    </span>
                  </p>
                }
              >
                <ol className="max-w-3xl">
                  {agenda.map((item, index) => {
                    if (item.kind === "break") {
                      return (
                        <li
                          key={`${item.title}-${index}`}
                          className="my-2 flex items-center gap-3 border-y border-dashed border-current/40 py-2.5 text-muted-foreground"
                        >
                          <HugeiconsIcon
                            icon={breakIcon}
                            strokeWidth={1.8}
                            className="size-4 shrink-0"
                            aria-hidden
                          />
                          <span className={cn(microLabel, "flex-1")}>
                            {item.title}
                          </span>
                          <span className="font-mono text-xs tabular-nums">
                            {item.minutes}m
                          </span>
                        </li>
                      )
                    }

                    const isClose = item.ordinal === null
                    return (
                      <li
                        key={`${item.title}-${index}`}
                        className="flex items-stretch gap-4 py-3.5"
                      >
                        <span
                          aria-hidden
                          className={cn(
                            "w-1.5 shrink-0 rounded-full",
                            isClose ? "bg-foreground/25" : "bg-primary"
                          )}
                        />
                        <span className="flex w-6 shrink-0 justify-center pt-1">
                          {isClose ? (
                            <HugeiconsIcon
                              icon={closeIcon}
                              strokeWidth={1.8}
                              className="size-4 text-muted-foreground"
                              aria-hidden
                            />
                          ) : (
                            <span
                              className="font-mono text-xs text-muted-foreground tabular-nums"
                              aria-hidden
                            >
                              {String(item.ordinal).padStart(2, "0")}
                            </span>
                          )}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-baseline justify-between gap-4">
                            <span className="block font-semibold tracking-tight text-pretty text-foreground">
                              {item.title}
                            </span>
                            <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                              {item.minutes}m
                            </span>
                          </span>
                          {item.detail ? (
                            <span className="mt-1.5 block text-sm leading-relaxed text-pretty text-muted-foreground">
                              {item.detail}
                            </span>
                          ) : null}
                          {item.output ? (
                            /* A filled dot rather than a violet glyph: a thin
                               accent-colored icon only reaches ~2:1 on the
                               light surface. The label carries the meaning,
                               so nothing here rides on color alone. */
                            <span className="mt-2.5 flex items-start gap-2.5 text-xs leading-relaxed text-foreground/80">
                              <span
                                aria-hidden
                                className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary"
                              />
                              <span className="text-pretty">
                                <span className="font-semibold">
                                  {content.agendaOutputLabel}:
                                </span>{" "}
                                {item.output}
                              </span>
                            </span>
                          ) : null}
                        </span>
                      </li>
                    )
                  })}
                </ol>
              </Section>
            </HomeReveal>
          </div>
        </section>

        {/* Fit — the second violet panel. Ink tiles because a violet tile would
            disappear into the band. */}
        <section className="relative overflow-hidden bg-primary text-primary-foreground">
          <HomePaperArcs className="text-primary-foreground/45" />
          <div className={cn(shellClassName, bandClassName, "relative")}>
            <HomeReveal>
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
                <div>
                  <h2 className={sectionTitleClassName}>
                    {content.forWhomTitle}
                  </h2>
                  <ul className="mt-7 space-y-4">
                    {content.forWhom.map((item) => (
                      <li key={item} className="flex items-start gap-3.5">
                        <Punch
                          icon={Tick02Icon}
                          tone="ink"
                          size="sm"
                          className="mt-0.5"
                        />
                        <span className="text-base leading-relaxed text-pretty text-primary-foreground/90">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-primary-foreground/25 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16">
                  <h3
                    className={cn(
                      subTitleClassName,
                      "text-primary-foreground/80"
                    )}
                  >
                    {content.notForWhomTitle}
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {content.notForWhom.map((item) => (
                      <li key={item} className="flex items-start gap-3.5">
                        {/* Outlined, not recolored: polarity survives without
                            relying on color. */}
                        <span
                          aria-hidden
                          className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-primary-foreground/60 text-primary-foreground/85"
                        >
                          <HugeiconsIcon
                            icon={Cancel01Icon}
                            strokeWidth={2.4}
                            className="size-3"
                          />
                        </span>
                        <span className="text-base leading-relaxed text-pretty text-primary-foreground/80">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </HomeReveal>
          </div>
        </section>

        {/* What the ticket buys: four artifacts, then the packing list. */}
        <section className="bg-background text-foreground">
          <div className={cn(shellClassName, bandClassName)}>
            <HomeReveal>
              <h2 className={sectionTitleClassName}>
                {content.deliverablesTitle}
              </h2>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {content.deliverables.map((item, index) => (
                  <li
                    key={item.title}
                    className="flex flex-col rounded-2xl border border-foreground/15 p-5 transition-colors duration-200 hover:border-foreground/30"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <Punch icon={deliverableIcons[item.icon]} />
                      <span
                        className="font-mono text-xs font-semibold text-foreground/30 tabular-nums"
                        aria-hidden
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-5 font-display text-base font-semibold tracking-tight text-pretty">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground">
                      {item.note}
                    </p>
                  </li>
                ))}
              </ul>
            </HomeReveal>

            <HomeReveal>
              <div
                className={cn(
                  railClassName,
                  "mt-14 border-t border-foreground/15 pt-10"
                )}
              >
                <h2 className={subTitleClassName}>
                  {content.requirementsTitle}
                </h2>
                <ul className="grid divide-y divide-foreground/12 rounded-2xl border border-foreground/20 sm:grid-cols-2 sm:divide-y-0">
                  {content.requirements.map((item, index) => (
                    <li
                      key={item.label}
                      className={cn(
                        "flex items-center gap-4 px-5 py-4",
                        index % 2 === 1 &&
                          "sm:border-l sm:border-foreground/12",
                        index > 1 && "sm:border-t sm:border-foreground/12"
                      )}
                    >
                      <Punch icon={requirementIcons[item.icon]} size="sm" />
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold tracking-tight">
                          {item.label}
                        </span>
                        <span className="block text-xs leading-snug text-pretty text-muted-foreground">
                          {item.note}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </HomeReveal>
          </div>
        </section>

        {soldOut ? null : (
          <div className="sticky bottom-0 z-30 lg:hidden">
            <div className="flex items-center justify-between gap-4 border-t border-background/15 bg-foreground px-6 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] text-background sm:px-10">
              <div className="flex flex-col">
                <span className="font-display text-xl leading-none font-semibold tracking-tight">
                  {content.price}
                </span>
                <span className={cn(microLabel, "mt-1 text-background/75")}>
                  {content.passMeta[0]}
                </span>
              </div>
              <a
                href="#register"
                className={cn(
                  ctaBaseClassName,
                  "min-h-11 bg-primary px-5 text-primary-foreground hover:bg-primary/90 focus-visible:ring-background focus-visible:ring-offset-foreground"
                )}
              >
                {content.ctaLabel}
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Registration — the pass closes on the same violet it opened with. */}
      <section
        id="register"
        className="relative scroll-mt-[calc(var(--site-header-offset)+1rem)] overflow-hidden bg-primary text-primary-foreground"
      >
        <Perforation
          className="text-primary-foreground/30"
          notchClassName="bg-background"
        />
        <HomePaperArcs className="text-primary-foreground/20" />
        <HatchEdge className="bottom-0 opacity-40" />

        <div className={cn(shellClassName, bandClassName, "relative")}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_28rem] lg:gap-16">
            <div className="max-w-md">
              <h2 className={sectionTitleClassName}>{content.registerTitle}</h2>
              <p className="mt-5 text-base leading-relaxed text-pretty text-primary-foreground/85">
                {content.registerBody}
              </p>
              <div className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-primary-foreground/25 pt-5">
                <span className="font-display text-5xl leading-none font-semibold tracking-tight tabular-nums">
                  {content.price}
                </span>
                <span className="text-sm text-primary-foreground/85">
                  {content.priceNote}
                </span>
              </div>
              <ul
                className={cn(
                  microLabel,
                  "mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.7rem] text-primary-foreground/85"
                )}
              >
                {content.passMeta.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="surface-paper shadow-lift w-full overflow-hidden rounded-2xl lg:justify-self-end">
              {/* Price is already the anchor on the left, so the slab carries
                  scarcity instead of repeating it. */}
              <div className="flex items-center justify-between gap-3 bg-foreground px-5 py-3.5 text-background sm:px-6">
                <span className={cn(microLabel, "text-background/85")}>
                  {soldOut ? content.soldOutLabel : content.ctaLabel}
                </span>
                {showSeatCount ? (
                  <span className="text-sm font-semibold tabular-nums">
                    {formatSeats(content.seatsRemaining, seatsLeft, capacity)}
                  </span>
                ) : null}
              </div>
              <RegistrationForm
                slug="modo-fundador"
                copy={content.form}
                soldOut={soldOut}
                soldOutLabel={content.soldOutLabel}
                soldOutNote={content.soldOutNote}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Closing band: theme-invariant surface-ink so it never merges with the
          always-dark footer, torn off the violet above it. */}
      <div className="relative">
        <Perforation className="text-on-dark/30" notchClassName="bg-primary" />
        <CanvasRevealBanner
          shellClassName={shellClassName}
          action={
            soldOut ? (
              <p className={cn(microLabel, "max-w-xs text-on-dark/75")}>
                {content.soldOutLabel}
              </p>
            ) : (
              <a
                href="#register"
                className={cn(
                  ctaBaseClassName,
                  "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-on-dark focus-visible:ring-offset-surface-ink"
                )}
              >
                {content.closingCta.buttonLabel}
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  strokeWidth={2}
                  className="size-4"
                  aria-hidden
                />
              </a>
            )
          }
        >
          <p className={cn(microLabel, "text-on-dark/70")}>
            {content.closingCta.meta}
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-balance text-on-dark md:text-4xl">
            {content.closingCta.title}
          </h2>
          <p className="text-base leading-relaxed text-pretty text-on-dark/80">
            {content.closingCta.body}
          </p>
        </CanvasRevealBanner>
      </div>
    </div>
  )
}

export { ModoFundadorPage }
