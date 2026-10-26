import { Fragment, useRef, useSyncExternalStore } from "react"
import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import { SiteLogo } from "@/components/chrome/site-logo"
import { useContact } from "@/components/contact/contact-provider"
import { HomeCtaLink } from "@/components/home/home-cta-link"
import { TextSpiral } from "@/components/lab/text-spiral"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  homeDisplayClassName,
  homePillClassName,
} from "@/components/home/home-styles"
import { Eyebrow } from "@/components/ui/eyebrow"
import type { HomeHeroContent, Locale, NavItem, SiteContent } from "@/content"
import { cn } from "@/lib/utils"
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
  /**
   * When true (home), the secondary hash CTA stays on-page.
   * When false (lab preview), it resolves to `/#…`.
   * The primary CTA opens the shared contact dialog unless `primaryAction` is set.
   */
  samePageCtas?: boolean
  /** The home uses a compact, typographic hero below the desktop breakpoint. */
  desktopSpiralOnly?: boolean
  /** Reuse this hero with another page's copy. Omit to use the home hero. */
  hero?: HomeHeroContent
  /** When set, the primary control is this link instead of the contact dialog. */
  primaryAction?: HomeHeroLinkAction
  /** Quiet text link under the hero actions. Omit on the home. */
  textLink?: NavItem
}

const DESKTOP_QUERY = "(min-width: 1024px)"

function subscribeToDesktop(onChange: () => void) {
  if (typeof window.matchMedia !== "function") {
    return () => {}
  }
  const media = window.matchMedia(DESKTOP_QUERY)
  media.addEventListener("change", onChange)
  return () => media.removeEventListener("change", onChange)
}

function isDesktop() {
  return (
    typeof window.matchMedia === "function" &&
    window.matchMedia(DESKTOP_QUERY).matches
  )
}

function serverDesktopSnapshot() {
  return false
}

function resolveCtaHref(href: string, samePageCtas: boolean): string {
  if (href.startsWith("#")) {
    return samePageCtas ? href : `/${href}`
  }
  if (href.startsWith("/")) {
    return href
  }
  return href
}

function HomeHero({
  locale,
  content,
  samePageCtas = true,
  desktopSpiralOnly = false,
  hero = content.home.hero,
  primaryAction,
  textLink,
}: HomeHeroProps) {
  const root = useRef<HTMLElement>(null)
  const desktop = useSyncExternalStore(
    subscribeToDesktop,
    isDesktop,
    serverDesktopSnapshot
  )
  useHomeEntrance(root, "hero", locale)

  return (
    <section
      ref={root}
      className={cn(
        "grid min-h-dvh grid-cols-1 bg-background text-foreground lg:grid-cols-2",
        desktopSpiralOnly && "min-h-0 lg:min-h-dvh"
      )}
    >
      <HomeHeroCopy
        hero={hero}
        locale={locale}
        samePageCtas={samePageCtas}
        compactMobile={desktopSpiralOnly}
        primaryAction={primaryAction}
        textLink={textLink}
      />
      <div
        data-home-spiral
        className={cn(
          "relative min-h-[50vh] w-full bg-surface-ink lg:min-h-0",
          desktopSpiralOnly && "hidden lg:block"
        )}
      >
        {(!desktopSpiralOnly || desktop) && (
          <TextSpiral
            words={hero.spiralWords}
            interactionLabel={content.microcopy.textSpiralAction}
            className="absolute inset-0 h-full w-full"
          />
        )}
      </div>
    </section>
  )
}

function HomeHeroContactButton({ label }: { label: string }) {
  const { openContact } = useContact()

  return (
    <Button
      type="button"
      onClick={() => openContact("discovery")}
      className={cn(
        homePillClassName,
        "h-auto min-h-12 w-fit text-left whitespace-normal"
      )}
    >
      {label}
      <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
    </Button>
  )
}

function HomeHeroPrimaryLink({ action }: { action: HomeHeroLinkAction }) {
  return (
    <a
      href={action.href}
      {...(action.external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={cn(
        homePillClassName,
        "h-auto min-h-12 w-fit text-left whitespace-normal"
      )}
    >
      {action.label}
      {action.newTabLabel ? (
        <span className="sr-only"> {action.newTabLabel}</span>
      ) : null}
      <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
    </a>
  )
}

function HomeHeroCopy({
  hero,
  locale,
  samePageCtas,
  compactMobile,
  primaryAction,
  textLink,
}: {
  hero: HomeHeroContent
  locale: Locale
  samePageCtas: boolean
  compactMobile: boolean
  primaryAction?: HomeHeroLinkAction
  textLink?: NavItem
}) {
  return (
    <div
      className={cn(
        "flex w-full min-w-0 flex-col gap-12 border-b border-border bg-background px-6 pt-[calc(var(--site-header-offset)+0.5rem)] pb-10 sm:px-10 sm:pb-12 lg:border-r lg:border-b-0 lg:px-12 xl:px-16",
        compactMobile && "max-lg:gap-10 max-lg:pb-12"
      )}
    >
      <div>
        <Link
          to="/"
          aria-label="Ai Labs"
          className="inline-flex rounded-sm focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <SiteLogo variant="lockup" />
        </Link>
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col justify-center py-4 lg:py-12",
          compactMobile && "max-lg:py-0"
        )}
      >
        <div
          className={cn(
            "flex max-w-xl flex-col gap-5",
            compactMobile && "max-lg:max-w-2xl"
          )}
        >
          <div data-home-entrance>
            <Eyebrow>{hero.label}</Eyebrow>
          </div>
          <h1
            data-home-entrance
            className={cn(
              homeDisplayClassName,
              "text-4xl leading-[1.05] normal-case sm:text-5xl md:text-5xl xl:text-6xl",
              compactMobile &&
                "max-lg:text-[clamp(2.125rem,9.5vw,3rem)] max-lg:leading-[1.08] max-lg:text-balance"
            )}
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
              className="max-w-xl text-base leading-relaxed text-foreground md:text-lg"
            >
              {hero.directAnswer}
            </p>
          ) : null}
          {hero.body ? (
            <p
              data-home-entrance
              className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              {hero.body}
            </p>
          ) : null}
          <div
            data-home-entrance
            className="flex flex-wrap items-center gap-3 pt-1"
          >
            {primaryAction ? (
              <HomeHeroPrimaryLink action={primaryAction} />
            ) : (
              <HomeHeroContactButton label={hero.primaryCta.label} />
            )}
            <a
              href={resolveCtaHref(hero.secondaryCta.href, samePageCtas)}
              className={cn(
                buttonVariants({ variant: "outline", size: "xl" }),
                "h-auto min-h-12 rounded-full px-5 whitespace-normal",
                compactMobile &&
                  "home-action max-lg:gap-2 max-lg:rounded-sm max-lg:border-transparent max-lg:bg-transparent max-lg:px-0 max-lg:text-foreground max-lg:underline-offset-4 max-lg:hover:bg-transparent max-lg:hover:text-purple max-lg:hover:underline dark:max-lg:bg-transparent"
              )}
            >
              {hero.secondaryCta.label}
              {compactMobile && (
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  strokeWidth={2}
                  className="lg:hidden"
                />
              )}
            </a>
          </div>
          {textLink ? (
            <HomeCtaLink cta={textLink} locale={locale} variant="quiet" />
          ) : null}
        </div>
      </div>
    </div>
  )
}

export { HomeHero }
export type { HomeHeroProps }
