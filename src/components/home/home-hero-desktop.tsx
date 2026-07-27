import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import type {
  ChromeContent,
  HomeHeroContent,
  Locale,
  MicrocopyContent,
} from "@/content"
import { LOCALES } from "@/content"
import { getChromeNavItems } from "@/components/chrome/chrome-nav-items"
import { SiteLogo } from "@/components/chrome/site-logo"
import { ThemeToggle } from "@/components/chrome/theme-toggle"
import { HomeHeroStipple } from "@/components/home/home-hero-stipple"
import { HomeMediaCarousel } from "@/components/home/home-media-carousel"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  homeCardClassName,
  homeDisplayClassName,
  homeHeroNavLinkClassName,
  homePillClassName,
  homeShellClassName,
} from "@/components/home/home-styles"

const heroLabelClassName =
  "border-on-dark/25 bg-on-dark/10 text-on-dark inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase"

type HomeHeroDesktopProps = {
  locale: Locale
  hero: HomeHeroContent
  chrome: ChromeContent
  microcopy: MicrocopyContent
  className?: string
}

function HomeHeroDesktop({
  locale,
  hero,
  chrome,
  microcopy,
  className,
}: HomeHeroDesktopProps) {
  const otherLocale =
    LOCALES.find((candidate) => candidate !== locale) ?? locale
  const chromeNavItems = getChromeNavItems(locale, chrome.nav)

  return (
    <section
      className={cn(
        homeShellClassName,
        "min-h-dvh flex-col pt-4 pb-10 md:pt-6 md:pb-14",
        className
      )}
    >
      <a
        href="#main"
        className="bg-background text-foreground focus-visible:ring-ring sr-only rounded-sm px-3 py-2 text-sm font-medium focus-visible:not-sr-only focus-visible:absolute focus-visible:top-2 focus-visible:left-2 focus-visible:z-50 focus-visible:ring-2"
      >
        {microcopy.skipToContent}
      </a>

      <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-1 gap-5">
        <div
          className={cn(
            homeCardClassName,
            "home-hero-invert bg-surface-ink relative flex h-full min-h-0 flex-col p-6 sm:p-8 md:p-10",
            "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500"
          )}
        >
          {/* Twinkle after card enter (~500ms) so first viewport stays ≤2 autos */}
          <HomeHeroStipple animationDelayMs={600} />
          <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-between">
            <div className="flex items-center justify-between gap-4">
              <Link
                to="/$locale"
                params={{ locale }}
                aria-label="Ai Labs"
                className="focus-visible:ring-ring/50 rounded-sm focus-visible:ring-2 focus-visible:outline-none"
              >
                <SiteLogo variant="lockup" onDark />
              </Link>
            </div>

            <div className="flex max-w-xl flex-col gap-5 py-10 md:py-14">
              <p className={heroLabelClassName}>{hero.label}</p>
              <h1 className={cn(homeDisplayClassName, "leading-[0.95]")}>
                {hero.headline}
              </h1>
              <p className="text-muted-foreground max-w-md text-base leading-relaxed md:text-lg">
                {hero.body}
              </p>
              <a
                href={hero.primaryCta.href}
                className={cn(homePillClassName, "w-fit")}
              >
                {hero.primaryCta.label}
                <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
              </a>
            </div>

            <div className="flex items-end justify-end">
              <div className="text-right">
                <p className="font-display text-foreground text-3xl font-semibold tracking-tight md:text-4xl">
                  {hero.proof.value}
                </p>
                <p className="text-muted-foreground text-sm">
                  {hero.proof.label}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            homeCardClassName,
            "bg-surface-ink relative h-full min-h-0",
            "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:delay-100 motion-safe:duration-500"
          )}
        >
          <HomeMediaCarousel
            images={hero.mediaSrcs}
            alt={hero.mediaAlt}
            intervalMs={4500}
          />
          {/* Above carousel (z-1), below nav/stats (z-10) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-surface-ink/70 via-surface-ink/20 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.2)_22%,transparent_45%)]"
          />

          <div className="relative z-10 flex h-full flex-col p-6 sm:p-8 md:p-10">
            <div className="flex items-center justify-between gap-4">
              <nav
                aria-label="Pillars"
                className="flex min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-2 ps-3 md:gap-5 md:ps-3.5"
              >
                {chromeNavItems.map((item) => {
                  switch (item.kind) {
                    case "section":
                      return (
                        <a
                          key={item.key}
                          href={item.href}
                          className={homeHeroNavLinkClassName}
                        >
                          {item.label}
                        </a>
                      )
                    case "route":
                      return (
                        <Link
                          key={item.key}
                          to={item.to}
                          params={item.params}
                          className={homeHeroNavLinkClassName}
                        >
                          {item.label}
                        </Link>
                      )
                    default: {
                      const _exhaustive: never = item
                      return _exhaustive
                    }
                  }
                })}
              </nav>

              <div className="flex shrink-0 items-center gap-1 [&_button]:text-on-dark [&_button]:hover:bg-on-dark/10 [&_button]:hover:text-on-dark">
                <ThemeToggle
                  labels={{
                    cycle: microcopy.themeCycle,
                    toLight: microcopy.themeToLight,
                    toDark: microcopy.themeToDark,
                    toSystem: microcopy.themeToSystem,
                  }}
                />
                <Link
                  to="."
                  params={{ locale: otherLocale }}
                  aria-label={microcopy.languageSwitch}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "text-on-dark hover:bg-on-dark/10 hover:text-on-dark min-h-11 min-w-11 text-xs font-semibold tracking-wider uppercase"
                  )}
                >
                  {microcopy.languageSwitch}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { HomeHeroDesktop }
export type { HomeHeroDesktopProps }
