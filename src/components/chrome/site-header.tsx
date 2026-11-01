import { useEffect, useState } from "react"
import { Link, useRouterState } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowDown01Icon,
  Cancel01Icon,
  Menu01Icon,
} from "@hugeicons/core-free-icons"

import type { ChromeContent, Locale, MicrocopyContent } from "@/content"
import { LOCALES } from "@/content"
import { getChromeNavItems } from "@/components/chrome/chrome-nav-items"
import { SiteLogo } from "@/components/chrome/site-logo"
import { ThemeToggle } from "@/components/chrome/theme-toggle"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { alternatePath } from "@/lib/locale-path"
import { homePath } from "@/lib/locale-links"
import { useScrolled } from "@/lib/use-scrolled"
import { cn } from "@/lib/utils"

type SiteHeaderProps = {
  locale: Locale
  chrome: ChromeContent
  microcopy: MicrocopyContent
  showBrandLink?: boolean
}

const navLinkClassName =
  "link-underline inline-flex min-h-11 shrink-0 items-center gap-1.5 whitespace-nowrap text-small font-semibold text-foreground"
const utilityControlClassName =
  "min-h-11 min-w-11 rounded-full text-foreground hover:bg-surface hover:text-foreground"
const menuItemClassName = "min-h-11 cursor-pointer px-3 text-sm"

/**
 * Flat sticky bar: lockup, a Services menu with the three service pages,
 * Events, theme, language, and the booking CTA.
 */
function SiteHeader({
  locale,
  chrome,
  microcopy,
  showBrandLink = false,
}: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const scrolled = useScrolled()
  const location = useRouterState({
    select: (state) => state.location,
  })
  const otherLocale =
    LOCALES.find((candidate) => candidate !== locale) ?? locale
  const alternate = alternatePath(location.pathname)
  const languageHref = `${alternate.path}${location.searchStr}${
    location.hash ? `#${location.hash}` : ""
  }`
  const nav = getChromeNavItems(chrome.nav, locale)
  const primaryLabel = microcopy.primaryNavigation
  const homeTo = homePath(locale)

  useEffect(() => {
    const breakpoint = window.matchMedia("(min-width: 1024px)")
    const closeMenu = () => setMobileOpen(false)
    breakpoint.addEventListener("change", closeMenu)
    return () => breakpoint.removeEventListener("change", closeMenu)
  }, [])

  return (
    <header
      data-scrolled={scrolled || mobileOpen ? "" : undefined}
      className="group/header sticky top-0 z-40 bg-background/92 pt-[env(safe-area-inset-top)] backdrop-blur-md transition-[box-shadow] duration-200 data-scrolled:shadow-[0_1px_0_var(--border)] supports-backdrop-filter:bg-background/80"
    >
      <a
        href="#main"
        className="btn sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-3 focus-visible:left-3 focus-visible:z-50"
      >
        {microcopy.skipToContent}
      </a>
      <div className="page-gutter mx-auto flex h-[4.5rem] max-w-content items-center justify-between gap-4">
        {showBrandLink ? (
          <Link
            to={homeTo as never}
            aria-label="Ai Labs"
            className="press shrink-0"
          >
            <SiteLogo variant="lockup" className="h-7" />
          </Link>
        ) : (
          <span />
        )}

        <div className="flex items-center gap-1 sm:gap-2">
          <nav
            className="mr-4 hidden items-center gap-7 lg:flex"
            aria-label={primaryLabel}
          >
            <DropdownMenu open={servicesOpen} onOpenChange={setServicesOpen}>
              <DropdownMenuTrigger
                render={<button type="button" className={navLinkClassName} />}
              >
                {nav.services.label}
                <HugeiconsIcon
                  icon={ArrowDown01Icon}
                  strokeWidth={2}
                  className={cn(
                    "size-4 transition-transform duration-200",
                    servicesOpen && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="site-community-menu w-64 p-2"
                align="start"
                sideOffset={14}
              >
                {nav.services.items.map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    className={menuItemClassName}
                    render={<Link to={item.to as never} />}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to={nav.events.to as never} className={navLinkClassName}>
              {nav.events.label}
            </Link>
          </nav>

          <ThemeToggle
            labels={{
              cycle: microcopy.themeCycle,
              toLight: microcopy.themeToLight,
              toDark: microcopy.themeToDark,
              toSystem: microcopy.themeToSystem,
            }}
            className={utilityControlClassName}
          />
          <a
            href={languageHref}
            hrefLang={otherLocale}
            lang={otherLocale}
            aria-label={microcopy.languageSwitch}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "text-xs font-semibold tracking-wider uppercase",
              utilityControlClassName
            )}
          >
            {microcopy.languageSwitch}
          </a>
          <Link to={nav.contact.to as never} className="btn ml-1 max-sm:hidden">
            {nav.contact.label}
          </Link>

          <DropdownMenu open={mobileOpen} onOpenChange={setMobileOpen}>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className={cn("lg:hidden", utilityControlClassName)}
                />
              }
              aria-label={mobileOpen ? microcopy.menuClose : microcopy.menuOpen}
            >
              <HugeiconsIcon
                icon={mobileOpen ? Cancel01Icon : Menu01Icon}
                className="size-5"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="site-community-menu w-[min(calc(100vw-2rem),20rem)] p-2 lg:hidden"
              align="end"
              sideOffset={14}
              aria-label={primaryLabel}
            >
              {nav.services.items.map((item) => (
                <DropdownMenuItem
                  key={item.href}
                  className={menuItemClassName}
                  render={<Link to={item.to as never} />}
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem
                className={menuItemClassName}
                render={<Link to={nav.events.to as never} />}
              >
                {nav.events.label}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className={cn(menuItemClassName, "font-semibold")}
                render={<Link to={nav.contact.to as never} />}
              >
                {nav.contact.label}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export { SiteHeader }
export type { SiteHeaderProps }
