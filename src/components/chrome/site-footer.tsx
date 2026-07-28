import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  InstagramIcon,
  Linkedin01Icon,
  Location01Icon,
  NewTwitterIcon,
  TiktokIcon,
} from "@hugeicons/core-free-icons"

import type { FooterContent, FooterSocial, Locale, NavItem } from "@/content"

import { formatCopyright } from "@/content"
import { SiteLogo } from "@/components/chrome/site-logo"
import {
  hashFromHref,
  isHashHref,
  isInternalHref,
  routeForHref,
} from "@/lib/locale-links"

type SiteFooterProps = {
  locale: Locale
  footer: FooterContent
}

/** Always-dark footer: graphite + on-dark only — no theme or purple tokens. */
const footerLinkClassName =
  "inline-flex min-h-11 items-center rounded-sm text-sm text-on-dark/65 underline-offset-4 transition-colors hover:text-on-dark hover:underline focus-visible:ring-2 focus-visible:ring-on-dark/40 focus-visible:outline-none"

function FooterLink({ link, locale }: { link: NavItem; locale: Locale }) {
  if (link.href.startsWith("http")) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noreferrer"
        className={footerLinkClassName}
      >
        {link.label}
      </a>
    )
  }

  if (isInternalHref(link.href)) {
    return (
      <Link
        to={routeForHref(link.href)}
        params={{ locale }}
        className={footerLinkClassName}
      >
        {link.label}
      </Link>
    )
  }

  if (isHashHref(link.href)) {
    return (
      <Link
        to="/$locale"
        params={{ locale }}
        hash={hashFromHref(link.href)}
        className={footerLinkClassName}
      >
        {link.label}
      </Link>
    )
  }

  return (
    <a href={link.href} className={footerLinkClassName}>
      {link.label}
    </a>
  )
}

const SOCIAL_ICONS: Record<FooterSocial["icon"], typeof Linkedin01Icon> = {
  linkedin: Linkedin01Icon,
  instagram: InstagramIcon,
  tiktok: TiktokIcon,
  x: NewTwitterIcon,
}

function SocialLink({ social }: { social: FooterSocial }) {
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noreferrer"
      aria-label={social.label}
      className="inline-flex size-11 items-center justify-center rounded-full border border-on-dark/15 text-on-dark/65 transition-colors hover:border-on-dark/35 hover:text-on-dark focus-visible:ring-2 focus-visible:ring-on-dark/40 focus-visible:outline-none"
    >
      <HugeiconsIcon
        icon={SOCIAL_ICONS[social.icon]}
        strokeWidth={1.8}
        className="size-4.5"
      />
    </a>
  )
}

/** Decorative watermark — brand phrase, not localized UI copy. */
const FOOTER_WATERMARK = "get curious"

function SiteFooter({ locale, footer }: SiteFooterProps) {
  const columns = footer.columns.filter((column) => column.links.length > 0)

  return (
    <footer className="bg-graphite text-on-dark relative overflow-hidden">
      <p
        aria-hidden="true"
        className="font-display pointer-events-none absolute inset-x-0 bottom-6 select-none text-center text-[clamp(4.5rem,18vw,12rem)] leading-none font-semibold tracking-tight text-on-dark/[0.035] lowercase sm:bottom-8"
      >
        {FOOTER_WATERMARK}
      </p>

      <div className="page-gutter max-w-content section-y relative mx-auto pb-16 sm:pb-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col items-start gap-6 text-left lg:col-span-5">
            <SiteLogo variant="lockup" onDark className="self-start" />
            <p className="max-w-sm text-sm leading-relaxed text-on-dark/65 md:text-[0.9375rem]">
              {footer.brandLine}
            </p>
            {footer.socials.length > 0 ? (
              <ul className="flex flex-wrap items-center gap-2.5">
                {footer.socials.map((social) => (
                  <li key={social.href}>
                    <SocialLink social={social} />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:col-span-7">
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="text-sm font-semibold text-on-dark">
                  {column.title}
                </h2>
                <ul className="mt-3.5 flex flex-col gap-0.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink link={link} locale={locale} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-on-dark/12 pt-6">
          <p className="text-sm text-on-dark/55">
            {formatCopyright(footer.copyright)}
          </p>
          <p className="flex items-center gap-2 text-sm text-on-dark/55">
            <HugeiconsIcon
              icon={Location01Icon}
              strokeWidth={1.8}
              className="size-4 text-on-dark/45"
              aria-hidden="true"
            />
            {footer.locationLine}
          </p>
        </div>
      </div>
    </footer>
  )
}

export { SiteFooter }
export type { SiteFooterProps }
