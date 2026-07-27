import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon, Menu01Icon } from "@hugeicons/core-free-icons"

import type { ChromeContent, Locale, MicrocopyContent } from "@/content"

import { LOCALES } from "@/content"
import { getChromeNavItems } from "@/components/chrome/chrome-nav-items"
import { SiteLogo } from "@/components/chrome/site-logo"
import { ThemeToggle } from "@/components/chrome/theme-toggle"
import { Button, buttonVariants } from "@/components/ui/button"
import { hashFromHref } from "@/lib/locale-links"
import { useScrolled } from "@/lib/use-scrolled"
import { cn } from "@/lib/utils"

type SiteHeaderProps = {
  locale: Locale
  chrome: ChromeContent
  microcopy: MicrocopyContent
  /** When true, show a top-left lockup for pages that do not embed their own brand. */
  showBrandLink?: boolean
}

const navLinkClassName =
  "inline-flex min-h-10 items-center px-1 text-sm font-medium tracking-wide text-on-dark/70 hover:text-on-dark motion-safe:transition-colors motion-safe:duration-150 motion-reduce:transition-none focus-visible:ring-on-dark/50 focus-visible:ring-2 focus-visible:outline-none rounded-sm"

const activeNavLinkClassName = "text-on-dark"

const barSurfaceClassName =
  "rounded-2xl border border-white/12 bg-surface-ink/85 text-on-dark shadow-soft backdrop-blur-md supports-backdrop-filter:bg-surface-ink/70"

const utilityControlClassName =
  "text-on-dark hover:bg-on-dark/10 hover:text-on-dark"

function SiteHeader({
  locale,
  chrome,
  microcopy,
  showBrandLink = false,
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrolled()
  const otherLocale =
    LOCALES.find((candidate) => candidate !== locale) ?? locale
  const chromeNavItems = getChromeNavItems(locale, chrome.nav)
  const closeMenu = () => setMenuOpen(false)

  const themeLabels = {
    cycle: microcopy.themeCycle,
    toLight: microcopy.themeToLight,
    toDark: microcopy.themeToDark,
    toSystem: microcopy.themeToSystem,
  }

  return (
    <header
      data-scrolled={scrolled || menuOpen ? "" : undefined}
      className="pointer-events-none fixed inset-x-0 top-0 z-40 pt-[max(0.75rem,env(safe-area-inset-top))]"
    >
      <a
        href="#main"
        className="bg-background text-foreground focus-visible:ring-ring pointer-events-auto sr-only rounded-sm px-3 py-2 text-sm font-medium focus-visible:not-sr-only focus-visible:absolute focus-visible:top-2 focus-visible:left-2 focus-visible:z-50 focus-visible:ring-2"
      >
        {microcopy.skipToContent}
      </a>

      {showBrandLink ? (
        <Link
          to="/$locale"
          params={{ locale }}
          aria-label="Ai Labs"
          onClick={closeMenu}
          className="pointer-events-auto focus-visible:ring-ring/50 absolute top-[max(0.75rem,env(safe-area-inset-top))] left-4 z-10 rounded-sm focus-visible:ring-2 focus-visible:outline-none sm:left-6"
        >
          <SiteLogo variant="lockup" className="h-6 w-auto" />
        </Link>
      ) : null}

      <div className="relative mx-auto flex w-full max-w-fit flex-col items-center px-4">
        <div
          className={cn(
            "pointer-events-auto flex items-center gap-2 px-2 py-1.5 pl-4 sm:gap-3 sm:px-3 sm:pl-5",
            barSurfaceClassName,
            scrolled || menuOpen ? "border-white/18 shadow-soft-hover" : null
          )}
        >
          <nav className="hidden items-center gap-5 md:flex" aria-label="Primary">
            {chromeNavItems.map((item) => {
              switch (item.kind) {
                case "section":
                  return (
                    <Link
                      key={item.key}
                      to="/$locale"
                      params={{ locale }}
                      hash={item.hash}
                      className={navLinkClassName}
                    >
                      {item.label}
                    </Link>
                  )
                case "route":
                  return (
                    <Link
                      key={item.key}
                      to={item.to}
                      params={item.params}
                      className={navLinkClassName}
                      activeProps={{ className: activeNavLinkClassName }}
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
            <Link
              to="/$locale"
              params={{ locale }}
              hash={hashFromHref(chrome.nav.contact.href)}
              className={navLinkClassName}
            >
              {chrome.nav.contact.label}
            </Link>
          </nav>

          <Button
            variant="ghost"
            size="icon-sm"
            className={cn(
              "min-h-11 min-w-11 md:hidden",
              utilityControlClassName
            )}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? microcopy.menuClose : microcopy.menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <HugeiconsIcon icon={menuOpen ? Cancel01Icon : Menu01Icon} />
          </Button>

          <div
            className="bg-on-dark/15 hidden h-5 w-px shrink-0 md:block"
            aria-hidden
          />

          <div className="flex items-center gap-0.5">
            <ThemeToggle
              labels={themeLabels}
              className={utilityControlClassName}
            />
            <Link
              to="."
              params={{ locale: otherLocale }}
              aria-label={microcopy.languageSwitch}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "min-h-11 min-w-11 text-xs font-semibold tracking-wider uppercase",
                utilityControlClassName
              )}
            >
              {microcopy.languageSwitch}
            </Link>
          </div>
        </div>

        {menuOpen ? (
          <nav
            id="mobile-nav"
            className={cn(
              "pointer-events-auto mt-2 w-[min(calc(100vw-2rem),20rem)] p-3 md:hidden",
              barSurfaceClassName
            )}
          >
            <div className="flex flex-col gap-1">
              {chromeNavItems.map((item) => {
                switch (item.kind) {
                  case "section":
                    return (
                      <Link
                        key={item.key}
                        to="/$locale"
                        params={{ locale }}
                        hash={item.hash}
                        onClick={closeMenu}
                        className={cn(navLinkClassName, "min-h-11 px-3")}
                      >
                        {item.label}
                      </Link>
                    )
                  case "route":
                    return (
                      <Link
                        key={item.key}
                        to={item.to}
                        params={item.params}
                        onClick={closeMenu}
                        className={cn(navLinkClassName, "min-h-11 px-3")}
                        activeProps={{ className: activeNavLinkClassName }}
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
              <Link
                to="/$locale"
                params={{ locale }}
                hash={hashFromHref(chrome.nav.contact.href)}
                onClick={closeMenu}
                className={cn(navLinkClassName, "min-h-11 px-3")}
              >
                {chrome.nav.contact.label}
              </Link>
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  )
}

export { SiteHeader }
export type { SiteHeaderProps }
