import { Fragment, useRef, useSyncExternalStore } from "react"
import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import { TextSpiral } from "@/components/lab/text-spiral"
import { SiteLogo } from "@/components/chrome/site-logo"
import { useContact } from "@/components/contact/contact-provider"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  homeDisplayClassName,
  homePillClassName,
} from "@/components/home/home-styles"
import { Eyebrow } from "@/components/ui/eyebrow"
import type { HomeHeroContent, Locale, SiteContent } from "@/content"
import { cn } from "@/lib/utils"
import { useHomeEntrance } from "@/lib/home-motion"

type HomeHeroProps = {
  locale: Locale
  content: SiteContent
  /**
   * When true (home), the secondary hash CTA stays on-page.
   * When false (lab preview), it resolves to `/#…`.
   * The primary CTA opens the shared contact dialog in either route.
   */
  samePageCtas?: boolean
  /** The home uses a compact, typographic hero below the desktop breakpoint. */
  desktopSpiralOnly?: boolean
}

const DESKTOP_QUERY = "(min-width: 1024px)"

function subscribeToDesktop(onChange: () => void) {
  const media = window.matchMedia(DESKTOP_QUERY)
  media.addEventListener("change", onChange)
  return () => media.removeEventListener("change", onChange)
}

function isDesktop() {
  return window.matchMedia(DESKTOP_QUERY).matches
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
}: HomeHeroProps) {
  const hero = content.home.hero
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
        samePageCtas={samePageCtas}
        compactMobile={desktopSpiralOnly}
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

function HomeHeroCopy({
  hero,
  samePageCtas,
  compactMobile,
}: {
  hero: HomeHeroContent
  samePageCtas: boolean
  compactMobile: boolean
}) {
  const { openContact } = useContact()

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
          <p
            data-home-entrance
            className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {hero.body}
          </p>
          <div
            data-home-entrance
            className="flex flex-wrap items-center gap-3 pt-1"
          >
            <Button
              type="button"
              onClick={() => openContact("discovery")}
              className={cn(
                homePillClassName,
                "h-auto min-h-12 w-fit text-left whitespace-normal"
              )}
            >
              {hero.primaryCta.label}
              <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
            </Button>
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
        </div>
      </div>
    </div>
  )
}

export { HomeHero }
export type { HomeHeroProps }
