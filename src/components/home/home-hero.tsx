import { Fragment, useRef } from "react"
import type { CSSProperties } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import { useContact } from "@/components/contact/contact-provider"
import { HomeCtaLink } from "@/components/home/home-cta-link"
import type { HomeHeroContent, Locale, NavItem, SiteContent } from "@/content"
import { EVENT_PHOTOS } from "@/content/event-photos"
import { useHomeEntrance } from "@/lib/home-motion"

if (typeof window !== "undefined") gsap.registerPlugin(useGSAP)

type HomeHeroLinkAction = {
  label: string
  href: string
  external?: boolean
  newTabLabel?: string
}

type HomeHeroProps = {
  locale: Locale
  content: SiteContent
  /** Reuse this hero with another page's copy. Omit to use the home hero. */
  hero?: HomeHeroContent
  /** When set, the primary control is this link instead of the contact dialog. */
  primaryAction?: HomeHeroLinkAction
  /** Quiet text link under the hero actions. Omit on the home. */
  textLink?: NavItem
  /** On the home, hash CTAs stay on the page; elsewhere they lead home. */
  samePageCtas?: boolean
}

/**
 * The tide: the seam stops being a ruler-straight line and swells like water.
 * Draws clip-path polygons for the ink above and the field below, following
 * the scroll-driven rise. Returns a cleanup.
 */
function tide(
  root: HTMLElement,
  above: HTMLElement,
  below: ReadonlyArray<HTMLElement>,
  level: { rise: number },
  restOf: () => number
): () => void {
  const points = 28
  let visible = true
  const io = new IntersectionObserver(([entry]) => {
    visible = Boolean(entry?.isIntersecting)
  })
  io.observe(root)
  root.dataset.tide = ""

  const tick = (time: number) => {
    if (!visible) return
    const w = root.clientWidth
    const h = root.clientHeight
    const rest = restOf()
    const seam = h - (rest + (h - rest) * level.rise)
    const amp = Math.min(14, h * 0.018)
    const ys: string[] = []
    for (let i = 0; i <= points; i++) {
      const u = i / points
      const y =
        seam +
        amp * Math.sin(u * Math.PI * 2.4 + time * 0.9) +
        amp * 0.45 * Math.sin(u * Math.PI * 5.2 - time * 1.4) +
        amp * 0.7 * Math.sin(time * 0.45)
      ys.push(`${(u * w).toFixed(1)}px ${y.toFixed(1)}px`)
    }
    above.style.clipPath = `polygon(0 0, ${w}px 0, ${[...ys].reverse().join(", ")})`
    const water = `polygon(${ys.join(", ")}, ${w}px ${h}px, 0 ${h}px)`
    for (const layer of below) layer.style.clipPath = water
  }

  gsap.ticker.add(tick)
  return () => {
    gsap.ticker.remove(tick)
    io.disconnect()
    delete root.dataset.tide
    above.style.clipPath = ""
    for (const layer of below) layer.style.clipPath = ""
  }
}

/**
 * Waterline hero. Two flat fields meet at a halftone seam: paper above, the
 * Ai Labs purple below. A real event photo is printed across the seam and
 * changes ink where it crosses it. Scrolling raises the water until the photo
 * is submerged, and a slow tide keeps the seam moving while it is on screen.
 *
 * The copy is graphite in both fields, so it reads wherever the seam falls.
 * Without JavaScript or with reduced motion the seam rests, straight.
 */
function HomeHero({
  locale,
  content,
  hero = content.home.hero,
  primaryAction,
  textLink,
  samePageCtas = true,
}: HomeHeroProps) {
  const root = useRef<HTMLElement>(null)
  const aboveRef = useRef<HTMLDivElement>(null)
  const belowRef = useRef<HTMLDivElement>(null)
  const restRef = useRef<HTMLDivElement>(null)
  const twinRef = useRef<HTMLDivElement>(null)
  useHomeEntrance(root, "hero", locale)
  // Hash CTAs belong to the home; from another page they go there.
  const secondaryHref =
    hero.secondaryCta.href.startsWith("#") && !samePageCtas
      ? `/${hero.secondaryCta.href}`
      : hero.secondaryCta.href

  useGSAP(
    () => {
      const el = root.current
      const above = aboveRef.current
      const below = belowRef.current
      const rest = restRef.current
      const twin = twinRef.current
      if (!el || !above || !below || !rest || !twin) return
      if (typeof window.matchMedia !== "function") return
      if (typeof IntersectionObserver !== "function") return
      // Registered here, not at import: ScrollTrigger reads matchMedia on
      // registration, which test and server environments lack.
      gsap.registerPlugin(ScrollTrigger)
      const media = gsap.matchMedia()
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const level = { rise: 0 }
        gsap.to(level, {
          rise: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom 10%",
            scrub: true,
          },
        })
        return tide(el, above, [below, twin], level, () => rest.offsetHeight)
      })
      return () => media.revert()
    },
    { scope: root }
  )

  const photo = EVENT_PHOTOS[hero.photo.name]
  const printStyle = {
    "--ht": `url(/halftone/${hero.photo.name})`,
    "--print-ratio": `${photo.height / photo.width}`,
  } as CSSProperties

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      style={printStyle}
      className="hero-water relative isolate overflow-clip bg-background text-ink [--print-w:min(76vw,24rem)] [--rest:calc(var(--print-w)*var(--print-ratio)*0.5)] lg:min-h-[max(38rem,calc(100svh-var(--site-header-height)))] lg:[--print-w:min(36vw,calc((100svh-var(--site-header-height))*0.86/var(--print-ratio)))] lg:[--rest:32%]"
    >
      {/* Measures the resting water line for the tide. */}
      <div
        ref={restRef}
        aria-hidden="true"
        className="pointer-events-none invisible absolute bottom-0 h-(--rest) w-px"
      />

      {/* Above the water: purple ink on paper. */}
      <div
        ref={aboveRef}
        aria-hidden="true"
        className="absolute inset-0 [clip-path:inset(0_0_var(--water)_0)]"
      >
        <div className="hero-print hero-print-paper bg-snow" />
        <div className="hero-print bg-print-ink" />
      </div>

      {/* Below the water: graphite ink on the purple field, in either theme. */}
      <div
        ref={belowRef}
        aria-hidden="true"
        className="absolute inset-0 bg-purple [clip-path:inset(var(--seam)_0_0_0)]"
      >
        <div className="hero-print bg-on-purple" />
      </div>

      {/* Halftone seam: rows of growing dots, like ink bleeding on newsprint. */}
      <div
        aria-hidden="true"
        className="seam-strip pointer-events-none absolute inset-x-0 top-(--seam) -translate-y-full [--dot-size:4px] [--dot:var(--color-purple)]"
      >
        <div className="dot-screen h-1 [--dot-r:12%]" />
        <div className="dot-screen h-1 [--dot-r:20%]" />
        <div className="dot-screen h-1 [--dot-r:28%]" />
        <div className="dot-screen h-1 [--dot-r:36%]" />
      </div>

      <span role="img" aria-label={hero.photo.alt} className="sr-only" />

      <HeroCopy
        hero={hero}
        locale={locale}
        secondaryHref={secondaryHref}
        primaryAction={primaryAction}
        textLink={textLink}
      />

      {/*
       * The copy again in graphite, clipped to the water, so it reads on the
       * purple field in the dark theme too. Decorative and inert: the real copy
       * underneath keeps the semantics and takes the clicks.
       */}
      <div
        ref={twinRef}
        aria-hidden="true"
        inert
        className="pointer-events-none absolute inset-0 text-on-purple [clip-path:inset(var(--seam)_0_0_0)]"
      >
        <HeroCopy
          decorative
          hero={hero}
          locale={locale}
          secondaryHref={secondaryHref}
          primaryAction={primaryAction}
          textLink={textLink}
        />
      </div>
    </section>
  )
}

type HeroCopyProps = {
  hero: HomeHeroContent
  locale: Locale
  secondaryHref: string
  primaryAction?: HomeHeroLinkAction
  textLink?: NavItem
  /** The twin printed in the water: no heading, ids or live controls. */
  decorative?: boolean
}

function HeroCopy({
  hero,
  locale,
  secondaryHref,
  primaryAction,
  textLink,
  decorative = false,
}: HeroCopyProps) {
  const Heading = decorative ? "p" : "h1"
  return (
    <div className="page-gutter relative mx-auto flex h-full w-full max-w-content flex-col lg:min-h-[inherit] lg:justify-between lg:pr-[calc(var(--print-w)+3rem)]">
      <Heading
        id={decorative ? undefined : "hero-title"}
        className="display max-w-[16ch] pt-10 text-[clamp(2.5rem,9.6vw,3.5rem)] text-balance sm:pt-14 lg:max-w-[17ch] lg:pt-[clamp(2.5rem,8svh,5.5rem)] lg:text-[clamp(3.5rem,5.4vw,5.75rem)]"
      >
        {hero.headline.split(" ").map((word, index) => (
          <Fragment key={`${index}-${word}`}>
            {index > 0 ? " " : null}
            <span data-home-word className="inline-block">
              {word}
            </span>
          </Fragment>
        ))}
      </Heading>

      <div className="flex flex-col items-start gap-6 pt-6 pb-[calc(var(--print-w)*var(--print-ratio)+1.5rem)] lg:max-w-[34rem] lg:pt-10 lg:pb-[clamp(2rem,6svh,3.5rem)]">
        {hero.directAnswer ? (
          <p
            data-home-entrance
            className="max-w-[36ch] text-lead leading-snug font-medium"
          >
            {hero.directAnswer}
          </p>
        ) : null}
        <div
          data-home-entrance
          className="flex flex-wrap items-center gap-x-6 gap-y-2"
        >
          {decorative ? (
            <span className="btn btn-ink">
              {primaryAction?.label ?? hero.primaryCta.label}
              <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
            </span>
          ) : primaryAction ? (
            <a
              href={primaryAction.href}
              {...(primaryAction.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="btn btn-ink"
            >
              {primaryAction.label}
              {primaryAction.newTabLabel ? (
                <span className="sr-only"> {primaryAction.newTabLabel}</span>
              ) : null}
              <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
            </a>
          ) : (
            <HeroContactButton label={hero.primaryCta.label} />
          )}
          {decorative ? (
            <span className="text-action">
              {hero.secondaryCta.label}
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                strokeWidth={2}
                className="size-4"
              />
            </span>
          ) : (
            <a href={secondaryHref} className="text-action">
              {hero.secondaryCta.label}
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                strokeWidth={2}
                className="size-4"
              />
            </a>
          )}
        </div>
        {textLink ? (
          <div data-home-entrance>
            {decorative ? (
              <span className="text-action">{textLink.label}</span>
            ) : (
              <HomeCtaLink cta={textLink} locale={locale} variant="quiet" />
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

function HeroContactButton({ label }: { label: string }) {
  const { openContact } = useContact()

  return (
    <button
      type="button"
      onClick={() => openContact("discovery")}
      className="btn btn-ink"
    >
      {label}
      <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
    </button>
  )
}

export { HomeHero }
export type { HomeHeroProps }
