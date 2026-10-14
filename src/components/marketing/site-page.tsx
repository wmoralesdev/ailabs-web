import { Link } from "@tanstack/react-router"

import type { EventsPage, LinksPage, MarketingPage, NavItem } from "@/content"
import { useContact } from "@/components/contact/contact-provider"
import { MainCard } from "@/components/chrome/main-card"
import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/ui/eyebrow"
import { isInternalHref, routeForHref } from "@/lib/locale-links"
import { homePillClassName } from "@/components/home/home-styles"
import { cn } from "@/lib/utils"

const textLinkClassName =
  "inline-flex min-h-11 items-center text-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"

function ContentLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        className={textLinkClassName}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    )
  }

  const eventMatch = /^\/events\/([^/]+)$/.exec(href)
  if (eventMatch?.[1]) {
    return (
      <Link
        to="/events/$slug"
        params={{ slug: eventMatch[1] }}
        className={textLinkClassName}
      >
        {children}
      </Link>
    )
  }

  if (isInternalHref(href)) {
    return (
      <Link to={routeForHref(href)} className={textLinkClassName}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} className={textLinkClassName}>
      {children}
    </a>
  )
}

function RelatedLinks({
  label,
  links,
}: {
  label: string
  links: ReadonlyArray<NavItem>
}) {
  return (
    <nav aria-label={label} className="mt-12 border-t border-border pt-8">
      <h2 className="text-sm font-semibold text-foreground">{label}</h2>
      <ul className="mt-2 flex flex-col">
        {links.map((link) => (
          <li key={link.href}>
            <ContentLink href={link.href}>{link.label}</ContentLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function MarketingPageView({ page }: { page: MarketingPage }) {
  const { openContact } = useContact()

  return (
    <MainCard>
      <article className="page-gutter section-y mx-auto w-full max-w-content">
        <header className="flex max-w-prose flex-col gap-4">
          <Eyebrow>{page.eyebrow}</Eyebrow>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {page.title}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {page.lead}
          </p>
        </header>
        <div className="mt-12 flex max-w-prose flex-col gap-10">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-3 text-base leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
        <Button
          type="button"
          onClick={() => openContact(page.interest)}
          className={cn(homePillClassName, "mt-12 h-auto min-h-12 w-fit")}
        >
          {page.cta}
        </Button>
        <RelatedLinks label={page.relatedLabel} links={page.related} />
      </article>
    </MainCard>
  )
}

function EventsPageView({ page }: { page: EventsPage }) {
  return (
    <MainCard>
      <article className="page-gutter section-y mx-auto w-full max-w-content">
        <header className="flex max-w-prose flex-col gap-4">
          <Eyebrow>{page.eyebrow}</Eyebrow>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {page.title}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {page.lead}
          </p>
        </header>
        <EventGroup label={page.upcomingLabel} events={page.upcoming} />
        <EventGroup label={page.pastLabel} events={page.past} />
      </article>
    </MainCard>
  )
}

function EventGroup({
  label,
  events,
}: {
  label: string
  events: EventsPage["upcoming"]
}) {
  return (
    <section className="mt-12 max-w-prose">
      <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
        {label}
      </h2>
      <ul className="mt-4 flex flex-col divide-y divide-border border-y border-border">
        {events.map((event) => (
          <li key={event.name} className="py-4">
            <h3 className="font-medium text-foreground">{event.name}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {event.detail}
            </p>
            {event.href ? (
              <ContentLink href={event.href}>
                {event.linkLabel ?? event.href}
              </ContentLink>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  )
}

function LinksPageView({ page }: { page: LinksPage }) {
  return (
    <MainCard>
      <article className="page-gutter section-y mx-auto w-full max-w-content">
        <header className="flex max-w-prose flex-col gap-4">
          <Eyebrow>{page.eyebrow}</Eyebrow>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {page.title}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {page.lead}
          </p>
        </header>
        <ul className="mt-10 flex max-w-prose flex-col divide-y divide-border border-y border-border">
          {page.links.map((link) => (
            <li
              key={link.href}
              className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <a
                href={link.href}
                className={textLinkClassName}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
              <p className="text-sm text-muted-foreground">{link.detail}</p>
            </li>
          ))}
        </ul>
      </article>
    </MainCard>
  )
}

export { EventsPageView, LinksPageView, MarketingPageView }
