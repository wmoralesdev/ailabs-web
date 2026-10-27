import { Fragment, useRef } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import { useContact } from "@/components/contact/contact-provider"
import { HalftoneCanvas } from "@/components/halftone/halftone-canvas"
import { HomeCtaLink } from "@/components/home/home-cta-link"
import type { HomeHeroContent, Locale, NavItem, SiteContent } from "@/content"
import { useHomeEntrance } from "@/lib/home-motion"

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
 * Typographic hero beside the Ai Labs mark printed as a live halftone. The
 * whole section is the pointer surface: the cursor drags ink through the dot
 * screen and it melts into the mark where they meet. No photo and no loop:
 * the dots only move when someone moves.
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
  useHomeEntrance(root, "hero", locale)
  // Hash CTAs belong to the home; from another page they go there.
  const secondaryHref =
    hero.secondaryCta.href.startsWith("#") && !samePageCtas
      ? `/${hero.secondaryCta.href}`
      : hero.secondaryCta.href

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      data-halftone-surface
      className="relative isolate overflow-clip bg-background [--ht-accent:var(--color-purple-ink)] [--ht-faint:color-mix(in_srgb,var(--color-ink)_10%,transparent)] [--ht-ink:var(--color-ink)]"
    >
      <HalftoneCanvas
        src="/brand/ailabs-iso-dark.svg"
        cell={11}
        className="absolute inset-0 -z-10"
      />

      <div className="page-gutter mx-auto grid w-full max-w-content gap-10 pt-12 pb-16 sm:pt-16 lg:min-h-[min(52rem,calc(100svh-var(--site-header-height)))] lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-16">
        <div className="flex flex-col items-start gap-7 lg:col-span-7">
          <h1
            id="hero-title"
            className="display max-w-[21ch] text-[clamp(2.375rem,1.5rem+3.2vw,4.25rem)] text-balance"
          >
            {hero.headline.split(" ").map((word, index) => (
              <Fragment key={`${index}-${word}`}>
                {index > 0 ? " " : null}
                <span data-home-word className="inline-block">
                  {word}
                </span>
              </Fragment>
            ))}
          </h1>
          {hero.directAnswer ? (
            <p
              data-home-entrance
              className="max-w-[40ch] text-lead leading-snug text-muted-foreground"
            >
              {hero.directAnswer}
            </p>
          ) : null}
          <div
            data-home-entrance
            className="flex flex-wrap items-center gap-x-6 gap-y-2"
          >
            {primaryAction ? (
              <a
                href={primaryAction.href}
                {...(primaryAction.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="btn"
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
            <a href={secondaryHref} className="text-action">
              {hero.secondaryCta.label}
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                strokeWidth={2}
                className="size-4"
              />
            </a>
          </div>
          {textLink ? (
            <div data-home-entrance>
              <HomeCtaLink cta={textLink} locale={locale} variant="quiet" />
            </div>
          ) : null}
        </div>

        {/* Where the printed mark sits; the canvas reads this box. */}
        <div
          data-halftone-slot
          aria-hidden="true"
          className="mx-auto aspect-[278/324] w-[min(72vw,22rem)] lg:col-span-5 lg:w-full lg:max-w-[28rem]"
        />
      </div>
    </section>
  )
}

function HeroContactButton({ label }: { label: string }) {
  const { openContact } = useContact()

  return (
    <button
      type="button"
      onClick={() => openContact("discovery")}
      className="btn"
    >
      {label}
      <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
    </button>
  )
}

export { HomeHero }
export type { HomeHeroProps }
