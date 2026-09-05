import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { Link } from "@tanstack/react-router"

import type { Locale, NavItem } from "@/content"
import { isInternalHref, routeForHref } from "@/lib/locale-links"
import { cn } from "@/lib/utils"
import { homePillClassName } from "@/components/home/home-styles"

type HomeCtaVariant = "pill" | "quiet"

type HomeCtaLinkProps = {
  cta: NavItem
  locale: Locale
  /** `quiet` keeps a secondary CTA from competing with the section's primary. */
  variant?: HomeCtaVariant
  className?: string
}

const homeQuietCtaClassName =
  "inline-flex min-h-11 w-fit items-center gap-1 rounded-sm text-sm font-medium text-muted-foreground underline decoration-transparent underline-offset-4 hover:text-foreground hover:decoration-current focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none motion-safe:transition-colors motion-safe:duration-150"

/**
 * CTA for home sections. Resolves the locale-agnostic hrefs stored in content
 * so section CTAs can point at routes (`/community`) and not just hashes.
 *
 * Hash hrefs stay plain anchors: home sections only ever render on the home
 * route, and routing them through `Link` would mark them `aria-current="page"`.
 */
function HomeCtaLink({
  cta,
  locale: _locale,
  variant = "pill",
  className,
}: HomeCtaLinkProps) {
  const linkClassName = cn(
    variant === "pill" ? cn(homePillClassName, "w-fit") : homeQuietCtaClassName,
    className
  )
  const body = (
    <>
      {cta.label}
      <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
    </>
  )

  if (cta.href.startsWith("http")) {
    return (
      <a
        href={cta.href}
        target="_blank"
        rel="noreferrer"
        className={linkClassName}
      >
        {body}
      </a>
    )
  }

  if (isInternalHref(cta.href)) {
    return (
      <Link to={routeForHref(cta.href)} className={linkClassName}>
        {body}
      </Link>
    )
  }

  return (
    <a href={cta.href} className={linkClassName}>
      {body}
    </a>
  )
}

export { HomeCtaLink }
export type { HomeCtaLinkProps, HomeCtaVariant }
