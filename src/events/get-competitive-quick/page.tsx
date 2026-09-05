import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons"

import { SiteLogo } from "@/components/chrome/site-logo"
import { HomePaperArcs } from "@/components/home/home-paper-arcs"
import { HomeReveal } from "@/components/home/home-reveal"
import { CanvasRevealBanner } from "@/components/ui/canvas-reveal-banner"
import type { Locale } from "@/content"
import { getGetCompetitiveQuickContent } from "@/events/get-competitive-quick/content"
import {
  breakIcon,
  closeIcon,
  requirementIcons,
  stackIcons,
} from "@/events/get-competitive-quick/icons"
import { RegistrationForm } from "@/events/get-competitive-quick/registration-form"
import { cn } from "@/lib/utils"

type GetCompetitiveQuickPageProps = {
  locale: Locale
  soldOut: boolean
}

/**
 * Three-tone discipline: ink carries structure, paper is the ground, and violet
 * is reserved for payoff moments (title slab, price slab, icon tiles). Violet
 * never renders as text on paper — brand purple only clears contrast as a fill
 * behind ink.
 *
 * The page reads as an assembly checklist rather than a brochure: hero shows
 * the five-piece stack, then results, then the day, then fit, then the form.
 */
const shellClassName = "mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-12"

const bandClassName = "py-14 lg:py-20"

const heroEnter =
  "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:fill-mode-both motion-safe:duration-500 motion-safe:ease-out"

const microLabel = "font-mono text-xs font-semibold tracking-[0.14em] uppercase"

/** One heading system: section titles are display-black uppercase, subs are semibold. */
const sectionTitleClassName =
  "font-display text-3xl leading-[0.95] font-black tracking-tight uppercase md:text-4xl"

const subTitleClassName =
  "font-display text-xl font-semibold tracking-tight md:text-2xl"

const railClassName =
  "grid gap-8 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-16"

const primaryCtaClassName =
  "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-foreground/60 focus-visible:ring-offset-background inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold tracking-wide transition-[background-color,transform] duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none motion-safe:active:translate-y-px"

/** Violet fill behind an ink glyph — the only contrast-safe way to tint an icon. */
function IconTile({
  icon,
  className,
  size = "md",
}: {
  icon: typeof CheckmarkCircle02Icon
  className?: string
  size?: "sm" | "md"
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground",
        size === "sm" ? "size-6" : "size-9",
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

function GetCompetitiveQuickPage({
  locale,
  soldOut,
}: GetCompetitiveQuickPageProps) {
  const content = getGetCompetitiveQuickContent(locale)

  // Duration bars are relative to the longest block, so the day's shape reads
  // by length instead of by number alone.
  const longestBlock = content.agenda.reduce(
    (max, item) => Math.max(max, item.minutes),
    1
  )

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
      <section className="relative overflow-hidden">
        <HomePaperArcs className="text-foreground/[0.07] dark:text-foreground/[0.12]" />

        <div
          className={cn(
            shellClassName,
            "relative z-10 flex min-h-[min(100dvh,46rem)] flex-col pt-[calc(var(--site-header-offset)+0.75rem)] pb-12 lg:pb-16"
          )}
        >
          <header className="flex items-start justify-between gap-6">
            <div className="flex flex-col gap-3">
              <Link
                to="/"
                aria-label="Ai Labs"
                className="-my-2 inline-flex w-fit rounded-sm py-2 focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              >
                <SiteLogo variant="lockup" className="h-7 w-auto" />
              </Link>
              <p
                className={cn(
                  microLabel,
                  "flex flex-col text-muted-foreground"
                )}
              >
                {content.eyebrow.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
            </div>
            <p
              className={cn(
                microLabel,
                "hidden text-right text-muted-foreground sm:block"
              )}
            >
              {content.audience.map((line) => (
                <span key={line} className="block whitespace-nowrap">
                  {line}
                </span>
              ))}
            </p>
          </header>

          {/* Hero budget: staircase title, one deck line, one CTA, and the
              five-piece stack shown rather than listed. */}
          <div className="mt-12 grid flex-1 items-end gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1.1fr)_25rem] lg:gap-12">
            <div className="@container max-w-2xl min-w-0">
              <h1 className="font-display text-[clamp(2.5rem,12.5cqw,4.75rem)] leading-[0.85] font-black tracking-[-0.04em] uppercase">
                <span className={cn("block", heroEnter)}>
                  {content.title[0]}
                </span>
                <span
                  className={cn(
                    "block translate-x-[0.1em]",
                    heroEnter,
                    "motion-safe:delay-75"
                  )}
                >
                  {content.title[1]}
                </span>
                <span
                  className={cn(
                    "mt-1 block w-fit translate-x-[0.2em]",
                    heroEnter,
                    "motion-safe:delay-150"
                  )}
                >
                  <span className="inline-block bg-primary px-[0.1em] pt-[0.08em] pb-[0.18em] text-primary-foreground">
                    {content.title[2]}
                  </span>
                </span>
              </h1>
              <p
                className={cn(
                  "mt-7 max-w-md text-base leading-relaxed text-foreground/80 md:text-lg",
                  heroEnter,
                  "motion-safe:delay-200"
                )}
              >
                {content.deck}
              </p>

              <div
                className={cn(
                  "mt-8 flex flex-wrap items-center gap-x-5 gap-y-3",
                  heroEnter,
                  "motion-safe:delay-300"
                )}
              >
                {soldOut ? (
                  <p
                    className={cn(
                      microLabel,
                      "rounded-full border border-foreground/30 px-5 py-3 text-foreground/85"
                    )}
                  >
                    {content.soldOutLabel}
                  </p>
                ) : (
                  <a href="#register" className={primaryCtaClassName}>
                    {content.ctaLabel}
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      strokeWidth={2}
                      className="size-4"
                      aria-hidden
                    />
                  </a>
                )}
                <p className={cn(microLabel, "text-muted-foreground")}>
                  {content.priceLabel} · {content.form.eyebrow}
                </p>
              </div>
            </div>

            <div
              className={cn(
                "w-full lg:justify-self-end",
                heroEnter,
                "motion-safe:delay-300"
              )}
            >
              <ul className="overflow-hidden rounded-xl border-2 border-foreground bg-background">
                <li className="flex items-baseline justify-between gap-3 bg-foreground px-5 py-3 text-background">
                  <span className={cn(microLabel, "text-background/85")}>
                    {content.stackTitle}
                  </span>
                  <span className="font-display text-2xl leading-none font-black tracking-tight tabular-nums">
                    {content.stack.length}
                  </span>
                </li>
                {content.stack.map((item, index) => (
                  <li
                    key={item.label}
                    className={cn(
                      "flex items-center gap-3.5 px-5 py-3",
                      index > 0 && "border-t border-foreground/15"
                    )}
                  >
                    <IconTile icon={stackIcons[item.icon]} />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold tracking-tight">
                        {item.label}
                      </span>
                      <span className="block text-xs leading-snug text-muted-foreground">
                        {item.note}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {content.stackNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky-CTA scope: pinned while the explanatory sections are on screen,
          released as the registration form comes into view. No JS. */}
      <div className="relative">
        {/* Ticket band — poster footer: date, facts, violet price slab. */}
        <section className="border-y-2 border-foreground">
          <div className="mx-auto grid max-w-6xl lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto]">
            <div className="flex flex-col justify-center border-b-2 border-foreground px-6 py-7 sm:px-10 lg:border-r-2 lg:border-b-0 lg:px-12">
              <span className="font-display text-4xl leading-none font-black tracking-tight sm:text-5xl">
                {content.dateLabel}
              </span>
              <span className="mt-2 text-sm leading-snug text-muted-foreground">
                {content.dateNote}
              </span>
              <span className="mt-3 text-sm text-muted-foreground">
                {content.venueNote}
              </span>
              <span className="text-sm text-muted-foreground">
                {content.scheduleNote}
              </span>
            </div>

            <div className="flex flex-col justify-center border-b-2 border-foreground px-6 py-7 sm:px-10 lg:border-r-2 lg:border-b-0 lg:px-8">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 sm:gap-x-0">
                {content.facts.map((fact, index) => (
                  <div
                    key={fact.label}
                    className={cn(
                      "flex flex-col gap-1 sm:px-4",
                      index > 0 && "sm:border-l sm:border-foreground/20"
                    )}
                  >
                    <dt className={cn(microLabel, "text-muted-foreground")}>
                      {fact.label}
                    </dt>
                    <dd className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 border-t border-foreground/20 pt-4">
                <span className={cn(microLabel, "text-muted-foreground")}>
                  {content.includesLabel}
                </span>
                <p className="mt-1 font-display text-lg font-semibold tracking-tight sm:text-xl">
                  {content.bundle}
                </p>
              </div>
            </div>

            {/* The price slab doubles as the desktop mid-page CTA. */}
            <a
              href="#register"
              className="focus-visible:-ring-offset-2 flex flex-row items-center justify-between gap-4 bg-primary px-8 py-7 text-primary-foreground transition-colors duration-200 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-foreground focus-visible:outline-none sm:justify-end sm:gap-6 lg:min-w-[12rem] lg:flex-col lg:items-end lg:justify-center"
            >
              <span className="font-display text-5xl leading-none font-black tracking-tight sm:text-6xl">
                {content.priceLabel}
              </span>
              <span className={cn(microLabel, "tracking-[0.16em]")}>
                {soldOut ? content.soldOutLabel : content.ticketLabel}
              </span>
            </a>
          </div>
        </section>

        {/* Block 1 — results. Headline outcomes on the left rail, the concrete
            receipts on the right, so the previously empty third carries load. */}
        <section className="relative overflow-hidden bg-surface-soft">
          <div
            aria-hidden
            className="main-grid-dots pointer-events-none absolute inset-0 opacity-[0.35]"
          />
          <div className={cn(shellClassName, bandClassName, "relative")}>
            <HomeReveal>
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
                <div>
                  <h2 className={sectionTitleClassName}>
                    {content.outcomesTitle}
                  </h2>
                  <ol className="mt-6 space-y-5">
                    {content.outcomes.map((item, index) => (
                      <li key={item} className="flex items-baseline gap-4">
                        <span
                          className="inline-flex shrink-0 items-center justify-center rounded bg-foreground px-2 py-1 font-mono text-sm font-bold text-background tabular-nums"
                          aria-hidden
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-xl leading-tight font-semibold tracking-tight md:text-2xl lg:text-[1.75rem]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="border-foreground/20 lg:border-l lg:pl-16">
                  <h3 className={cn(subTitleClassName, "lg:mt-1")}>
                    {content.deliverablesTitle}
                  </h3>
                  <ul className="mt-5 space-y-3.5">
                    {content.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <IconTile
                          icon={CheckmarkCircle02Icon}
                          size="sm"
                          className="mt-0.5"
                        />
                        <span className="text-sm leading-relaxed text-foreground/85 md:text-base">
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

        {/* Block 2 — the day. Timeline with proportional blocks and real gaps
            at the breaks, plus what to bring. */}
        <section>
          <div className={cn(shellClassName, bandClassName)}>
            <HomeReveal>
              <div className={railClassName}>
                <div>
                  <h2 className={sectionTitleClassName}>
                    {content.agendaTitle}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {content.agendaNote}
                  </p>
                </div>

                <ol className="max-w-3xl">
                  {agenda.map((item, index) => {
                    if (item.kind === "break") {
                      return (
                        <li
                          key={`${item.title}-${index}`}
                          className="my-3 flex items-center gap-3 border-y border-dashed border-current/40 py-2 text-muted-foreground"
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

                    return (
                      <li
                        key={`${item.title}-${index}`}
                        className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-x-4 border-t border-foreground/15 py-4"
                      >
                        {item.ordinal === null ? (
                          <HugeiconsIcon
                            icon={closeIcon}
                            strokeWidth={1.8}
                            className="size-4 translate-y-0.5 text-muted-foreground"
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
                        <span className="text-sm text-foreground/85 md:text-base">
                          {item.title}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground tabular-nums">
                          {item.minutes}m
                        </span>
                        <span
                          aria-hidden
                          className="col-start-2 mt-2 block h-1 w-full overflow-hidden rounded-full bg-foreground/10"
                        >
                          <span
                            className="block h-full rounded-full bg-primary"
                            style={{
                              width: `${(item.minutes / longestBlock) * 100}%`,
                            }}
                          />
                        </span>
                      </li>
                    )
                  })}
                </ol>
              </div>
            </HomeReveal>

            <HomeReveal>
              <div
                className={cn(
                  railClassName,
                  "mt-12 border-t border-foreground/15 pt-10"
                )}
              >
                <h3 className={subTitleClassName}>
                  {content.requirementsTitle}
                </h3>
                <ul className="flex flex-wrap gap-2.5">
                  {content.requirements.map((item) => (
                    <li
                      key={item.label}
                      className="inline-flex items-center gap-2.5 rounded-full border border-foreground/25 py-2 pr-4 pl-2.5 text-sm text-foreground/85"
                    >
                      <IconTile
                        icon={requirementIcons[item.icon]}
                        size="sm"
                        className="rounded-full"
                      />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            </HomeReveal>
          </div>
        </section>

        {/* Block 3 — fit. Promise up top, then a real yes/no split. */}
        <section className="border-t border-foreground/15">
          <div className={cn(shellClassName, bandClassName)}>
            <HomeReveal>
              <div className={railClassName}>
                <h2 className={sectionTitleClassName}>
                  {content.promiseTitle}
                </h2>
                <div className="max-w-2xl">
                  <p className="text-lg leading-relaxed text-foreground/85 md:text-xl">
                    {content.promise}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-foreground/70">
                    {content.sellLead}
                  </p>
                  {/* Pricing rationale reads as a called-out note, not fine print. */}
                  <p className="mt-6 border-l-2 border-primary py-1 pl-4 text-sm leading-relaxed text-foreground/75">
                    {content.programFrame}
                  </p>
                </div>
              </div>
            </HomeReveal>

            <HomeReveal>
              <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
                <div>
                  <h3 className={subTitleClassName}>{content.forWhomTitle}</h3>
                  <ul className="mt-5 space-y-3.5">
                    {content.forWhom.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <IconTile
                          icon={CheckmarkCircle02Icon}
                          size="sm"
                          className="mt-0.5"
                        />
                        <span className="text-sm leading-relaxed text-foreground/85 md:text-base">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-foreground/20 lg:border-l lg:pl-16">
                  <h3 className={cn(subTitleClassName, "text-foreground/70")}>
                    {content.notForWhomTitle}
                  </h3>
                  <ul className="mt-5 space-y-3.5">
                    {content.notForWhom.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        {/* Outlined tile, not a recolored one: the polarity is
                            carried by shape so it survives without color. */}
                        <span
                          aria-hidden
                          className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-md border-2 border-dashed border-foreground/35 text-foreground/55"
                        >
                          <HugeiconsIcon
                            icon={Cancel01Icon}
                            strokeWidth={2.4}
                            className="size-3"
                          />
                        </span>
                        <span className="text-sm leading-relaxed text-foreground/70 md:text-base">
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

        {soldOut ? null : (
          <div className="sticky bottom-0 z-30 lg:hidden">
            <div className="flex items-center justify-between gap-4 border-t border-background/15 bg-foreground px-6 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] text-background sm:px-10">
              <div className="flex flex-col">
                <span className="font-display text-xl leading-none font-black tracking-tight">
                  {content.priceLabel}
                </span>
                <span className={cn(microLabel, "mt-1 text-background/70")}>
                  {content.ticketLabel}
                </span>
              </div>
              <a
                href="#register"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold tracking-wide text-primary-foreground transition-[background-color,transform] duration-200 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-background focus-visible:outline-none motion-safe:active:translate-y-px"
              >
                {content.ctaLabel}
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Registration — the form only appears once the page has made its case. */}
      <section
        id="register"
        className="relative scroll-mt-[calc(var(--site-header-offset)+1rem)] overflow-hidden bg-surface-soft"
      >
        <HomePaperArcs className="text-foreground/[0.06] dark:text-foreground/[0.1]" />
        <div className={cn(shellClassName, bandClassName, "relative")}>
          <HomeReveal>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_28rem] lg:gap-16">
              <div className="max-w-md">
                <h2 className={sectionTitleClassName}>{content.ctaLabel}</h2>
                <p className="mt-5 text-base leading-relaxed text-foreground/75">
                  {content.closingCta.body}
                </p>
              </div>

              <div className="w-full overflow-hidden rounded-xl border-2 border-foreground bg-background lg:justify-self-end">
                <div className="flex items-baseline justify-between gap-3 bg-foreground px-5 py-3 text-background">
                  <span className={cn(microLabel, "text-background/85")}>
                    {content.ticketLabel}
                  </span>
                  <span className="font-display text-2xl leading-none font-black tracking-tight">
                    {content.priceLabel}
                  </span>
                </div>
                <RegistrationForm
                  slug="get-competitive-quick"
                  copy={content.form}
                  soldOut={soldOut}
                  soldOutLabel={content.soldOutLabel}
                />
              </div>
            </div>
          </HomeReveal>
        </div>
      </section>

      {/* Closing band: theme-invariant surface-ink so it never merges with the
          always-dark footer, with a violet rule marking the seam. */}
      <CanvasRevealBanner
        className="border-y-2 border-primary"
        shellClassName={shellClassName}
        action={
          soldOut ? (
            <p className={cn(microLabel, "max-w-xs text-on-dark/70")}>
              {content.soldOutLabel}
            </p>
          ) : (
            <a
              href="#register"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold tracking-wide text-primary-foreground transition-[background-color,transform] duration-200 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-on-dark focus-visible:outline-none motion-safe:active:translate-y-px"
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
        <p className={cn(microLabel, "text-on-dark/55")}>{content.dateNote}</p>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-on-dark md:text-4xl">
          {content.closingCta.title}
        </h2>
        <p className="text-base leading-relaxed text-on-dark/75">
          {content.closingCta.body}
        </p>
      </CanvasRevealBanner>
    </div>
  )
}

export { GetCompetitiveQuickPage }
