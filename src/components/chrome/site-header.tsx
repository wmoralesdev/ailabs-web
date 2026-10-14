import { useEffect, useState, useTransition } from "react"
import { Link, useRouter, useRouterState } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowDown01Icon,
  Cancel01Icon,
  Menu01Icon,
} from "@hugeicons/core-free-icons"

import type { ChromeContent, Locale, MicrocopyContent } from "@/content"
import { LOCALES } from "@/content"
import { getChromeNavItems } from "@/components/chrome/chrome-nav-items"
import { useContact } from "@/components/contact/contact-provider"
import { SiteLogo } from "@/components/chrome/site-logo"
import { ThemeToggle } from "@/components/chrome/theme-toggle"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { setLocalePreference } from "@/lib/locale-preference"
import { useScrolled } from "@/lib/use-scrolled"
import { cn } from "@/lib/utils"

type SiteHeaderProps = {
  locale: Locale
  chrome: ChromeContent
  microcopy: MicrocopyContent
  showBrandLink?: boolean
}

const navLinkClassName =
  "inline-flex min-h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-sm px-1 text-sm font-medium text-on-dark/80 transition-colors duration-150 hover:text-on-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-dark/50"
const barSurfaceClassName =
  "rounded-2xl border border-white/12 bg-surface-ink/85 text-on-dark shadow-soft backdrop-blur-md supports-backdrop-filter:bg-surface-ink/70"
const utilityControlClassName =
  "text-on-dark hover:bg-on-dark/10 hover:text-on-dark"
const menuItemClassName = "min-h-11 cursor-pointer px-3 text-sm"

function SiteHeader({
  locale,
  chrome,
  microcopy,
  showBrandLink = false,
}: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [communityOpen, setCommunityOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const { openContact } = useContact()
  const router = useRouter()
  const scrolled = useScrolled()
  const onHome = useRouterState({
    select: (state) => state.location.pathname === "/",
  })
  const otherLocale =
    LOCALES.find((candidate) => candidate !== locale) ?? locale
  const nav = getChromeNavItems(chrome.nav)
  const primaryLabel = microcopy.primaryNavigation

  useEffect(() => {
    const breakpoint = window.matchMedia("(min-width: 1024px)")
    const closeMenus = () => {
      setMobileOpen(false)
      setCommunityOpen(false)
    }
    breakpoint.addEventListener("change", closeMenus)
    return () => breakpoint.removeEventListener("change", closeMenus)
  }, [])

  function switchLocale() {
    setMobileOpen(false)
    setCommunityOpen(false)
    startTransition(async () => {
      await setLocalePreference({ data: { locale: otherLocale } })
      await router.invalidate()
    })
  }

  const servicesLink = onHome ? (
    <a href={nav.services.href}>{nav.services.label}</a>
  ) : (
    <Link to="/" hash={nav.services.hash}>
      {nav.services.label}
    </Link>
  )

  return (
    <header
      data-scrolled={scrolled || mobileOpen ? "" : undefined}
      className="pointer-events-none fixed inset-x-0 top-0 z-40 pt-[max(0.75rem,env(safe-area-inset-top))]"
    >
      <a
        href="#main"
        className="pointer-events-auto sr-only rounded-sm bg-background px-3 py-2 text-sm font-medium text-foreground focus-visible:not-sr-only focus-visible:absolute focus-visible:top-2 focus-visible:left-2 focus-visible:z-50 focus-visible:ring-2 focus-visible:ring-ring"
      >
        {microcopy.skipToContent}
      </a>
      {showBrandLink && (
        <Link
          to="/"
          aria-label="Ai Labs"
          className="pointer-events-auto absolute top-[max(0.75rem,env(safe-area-inset-top))] left-4 z-10 rounded-sm focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none sm:left-6"
        >
          <SiteLogo variant="lockup" className="h-6 w-auto" />
        </Link>
      )}
      <div className="relative mx-auto flex w-full max-w-fit flex-col items-center px-4">
        <div
          className={cn(
            "pointer-events-auto flex items-center gap-2 px-2 py-1.5 sm:gap-3 sm:px-3 lg:pl-5",
            barSurfaceClassName,
            scrolled && "shadow-soft-hover border-white/18"
          )}
        >
          <nav
            className="hidden items-center gap-6 lg:flex"
            aria-label={primaryLabel}
          >
            {onHome ? (
              <a href={nav.services.href} className={navLinkClassName}>
                {nav.services.label}
              </a>
            ) : (
              <Link
                to="/"
                hash={nav.services.hash}
                className={navLinkClassName}
              >
                {nav.services.label}
              </Link>
            )}
            <DropdownMenu open={communityOpen} onOpenChange={setCommunityOpen}>
              <DropdownMenuTrigger className={navLinkClassName}>
                {nav.community.label}
                <HugeiconsIcon
                  icon={ArrowDown01Icon}
                  className="size-3.5"
                  aria-hidden="true"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="site-community-menu min-w-56 p-1.5"
                sideOffset={14}
              >
                {nav.community.items.map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    className={menuItemClassName}
                    render={<Link to={item.to} />}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <button
              type="button"
              className={cn(navLinkClassName, "text-on-dark")}
              onClick={() => openContact()}
            >
              {nav.contact.label}
            </button>
          </nav>
          <DropdownMenu open={mobileOpen} onOpenChange={setMobileOpen}>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className={cn(
                    "min-h-11 min-w-11 lg:hidden",
                    utilityControlClassName
                  )}
                />
              }
              data-contact-focus-fallback
              aria-label={mobileOpen ? microcopy.menuClose : microcopy.menuOpen}
            >
              <HugeiconsIcon icon={mobileOpen ? Cancel01Icon : Menu01Icon} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="site-community-menu w-[min(calc(100vw-2rem),20rem)] p-2 lg:hidden"
              align="start"
              sideOffset={14}
              aria-label={primaryLabel}
            >
              <DropdownMenuItem
                className={menuItemClassName}
                render={servicesLink}
              >
                {nav.services.label}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel className="px-3 pt-2 text-xs text-muted-foreground">
                  {nav.community.label}
                </DropdownMenuLabel>
                {nav.community.items.map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    className={menuItemClassName}
                    render={<Link to={item.to} />}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className={cn(menuItemClassName, "font-medium")}
                onClick={() => openContact()}
              >
                {nav.contact.label}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            className="hidden h-5 w-px shrink-0 bg-on-dark/15 lg:block"
            aria-hidden="true"
          />
          <div className="flex items-center gap-0.5">
            <ThemeToggle
              labels={{
                cycle: microcopy.themeCycle,
                toLight: microcopy.themeToLight,
                toDark: microcopy.themeToDark,
                toSystem: microcopy.themeToSystem,
              }}
              className={utilityControlClassName}
            />
            <button
              type="button"
              disabled={isPending}
              onClick={switchLocale}
              aria-label={microcopy.languageSwitch}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "min-h-11 min-w-11 text-xs font-semibold tracking-wider uppercase",
                utilityControlClassName
              )}
            >
              {microcopy.languageSwitch}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export { SiteHeader }
export type { SiteHeaderProps }
