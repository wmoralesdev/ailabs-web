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
  "link-underline inline-flex min-h-11 shrink-0 items-center gap-1.5 whitespace-nowrap text-small font-semibold text-foreground"
const utilityControlClassName =
  "min-h-11 min-w-11 rounded-full text-foreground hover:bg-surface hover:text-foreground"
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
          <Link to="/" aria-label="Ai Labs" className="press shrink-0">
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
          <button
            type="button"
            disabled={isPending}
            onClick={switchLocale}
            aria-label={microcopy.languageSwitch}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "text-xs font-semibold tracking-wider uppercase",
              utilityControlClassName
            )}
          >
            {microcopy.languageSwitch}
          </button>
          <button
            type="button"
            className="btn ml-1 max-sm:hidden"
            onClick={() => openContact()}
          >
            {nav.contact.label}
          </button>

          <DropdownMenu open={mobileOpen} onOpenChange={setMobileOpen}>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className={cn("lg:hidden", utilityControlClassName)}
                />
              }
              data-contact-focus-fallback
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
                className={cn(menuItemClassName, "font-semibold")}
                onClick={() => openContact()}
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
