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
import { cn } from "@/lib/utils"
import { SiteLogo } from "@/components/chrome/site-logo"
import { useContact } from "@/components/contact/contact-provider"
import { listUpcomingWorkshops } from "@/events/catalog"
import {
  hashFromHref,
  isHashHref,
  isInternalHref,
  routeForHref,
} from "@/lib/locale-links"

type SiteFooterProps = {
  locale: Locale
  footer: FooterContent
  legalPublished: boolean
}

/** Always-night footer: night field + snow ink, the same in both themes. */
const footerLinkClassName =
  "link-underline inline-flex min-h-9 items-center text-[0.9375rem] text-night-soft transition-colors hover:text-snow"

function FooterLink({ link }: { link: NavItem; locale: Locale }) {
  const { openContact } = useContact()
  if (link.href === "#contact") {
    return (
      <button
        type="button"
        className={footerLinkClassName}
        onClick={() => openContact(link.contactInterest)}
      >
        {link.label}
      </button>
    )
  }
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

  const eventMatch = /^\/events\/([^/]+)$/.exec(link.href)
  if (eventMatch?.[1]) {
    return (
      <Link
        to="/events/$slug"
        params={{ slug: eventMatch[1] }}
        className={footerLinkClassName}
      >
        {link.label}
      </Link>
    )
  }

  if (isInternalHref(link.href)) {
    return (
      <Link to={routeForHref(link.href)} className={footerLinkClassName}>
        {link.label}
      </Link>
    )
  }

  if (isHashHref(link.href)) {
    return (
      <Link
        to="/"
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
      className={cn(footerLinkClassName, "gap-2")}
    >
      <HugeiconsIcon
        icon={SOCIAL_ICONS[social.icon]}
        strokeWidth={1.8}
        className="size-4"
        aria-hidden="true"
      />
      {social.label}
    </a>
  )
}

/** Brand phrase printed big at the foot of every page; not localized UI copy. */
const FOOTER_WATERMARK = "get curious"

function SiteFooter({ locale, footer, legalPublished }: SiteFooterProps) {
  // Promote only events with a confirmed date. TBD event pages stay accessible.
  const upcoming = listUpcomingWorkshops().filter(
    (workshop) => workshop.endsOn !== null
  )
  const columns = [
    ...footer.columns,
    ...(upcoming.length > 0
      ? [
          {
            title: footer.eventsTitle,
            links: upcoming.map((workshop) => ({
              label: workshop.title,
              href: `/events/${workshop.slug}`,
            })),
          },
        ]
      : []),
  ].filter((column) => column.links.length > 0)

  return (
    // Revealed from under the page where it fits in the viewport; a taller
    // footer pinned to the bottom would poke out above the page instead.
    <footer className="surface-night relative z-0 overflow-clip pb-[env(safe-area-inset-bottom)] [@media(min-width:768px)_and_(min-height:54rem)]:sticky [@media(min-width:768px)_and_(min-height:54rem)]:bottom-0">
      <div className="page-gutter mx-auto max-w-content pt-14 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col items-start gap-5 lg:col-span-4">
            <SiteLogo variant="lockup" onDark className="h-8" />
            <p className="max-w-xs text-[0.9375rem] leading-relaxed text-night-soft">
              {footer.brandLine}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8">
            {columns.map((column) => (
              <div
                key={column.title}
                id={"id" in column ? column.id : undefined}
              >
                <h2 className="text-[0.9375rem] font-semibold text-snow">
                  {column.title}
                </h2>
                <ul className="mt-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink link={link} locale={locale} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {footer.socials.length > 0 ? (
              <div>
                <h2 className="text-[0.9375rem] font-semibold text-snow">
                  {footer.socialTitle}
                </h2>
                <ul className="mt-2">
                  {footer.socials.map((social) => (
                    <li key={social.href}>
                      <SocialLink social={social} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-snow/12 pt-5 text-small text-night-soft">
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
            <p>{formatCopyright(footer.copyright)}</p>
            {legalPublished ? (
              <ul className="flex flex-wrap items-center gap-x-5">
                {footer.legalLinks.map((link) => (
                  <li key={link.href}>
                    <FooterLink link={link} locale={locale} />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <p className="flex items-center gap-2">
            <HugeiconsIcon
              icon={Location01Icon}
              strokeWidth={1.8}
              className="size-4"
              aria-hidden="true"
            />
            {footer.locationLine}
          </p>
        </div>
      </div>
      <p
        aria-hidden="true"
        className="display mt-6 -mb-[0.12em] px-[var(--space-gutter)] text-[17.5vw] leading-[0.82] whitespace-nowrap text-snow select-none lg:text-[min(17.5vw,16rem)]"
      >
        {FOOTER_WATERMARK}
      </p>
    </footer>
  )
}

export { SiteFooter }
export type { SiteFooterProps }
