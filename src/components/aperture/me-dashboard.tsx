"use client"

import { Fragment } from "react"
import type { ReactNode } from "react"
import { Link } from "@tanstack/react-router"

import { MeProjects } from "@/components/aperture/me-projects"
import { MeSettings } from "@/components/aperture/me-settings"
import type {
  ApertureJoinContent,
  ApertureMeContent,
  Locale,
} from "@/content/types"
import { formatMemberNumber } from "@/lib/aperture/member-number"
import { formatMeDate } from "@/lib/aperture/me-date"
import type { MeCredit, MeDashboard, MeEvent } from "@/server/aperture/me"

export function MeDashboardView({
  dashboard,
  join,
  content,
  locale,
  onDashboard,
}: {
  dashboard: MeDashboard
  join: ApertureJoinContent
  content: ApertureMeContent
  locale: Locale
  onDashboard: (dashboard: MeDashboard) => void
}) {
  const number = formatMemberNumber(dashboard.number)

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-2">
        <p className="font-mono text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
          {content.numberLabel.replace("{number}", number)}
        </p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {dashboard.profile.displayName}
        </h1>
        <p className="text-base text-muted-foreground">
          @{dashboard.username} · {dashboard.profile.headline}
        </p>
        <Link
          to="/u/$username"
          params={{ username: dashboard.username }}
          className="w-fit text-sm font-medium text-foreground underline underline-offset-4"
        >
          /u/{dashboard.username}
        </Link>
      </header>

      <MeList
        title={content.eventsTitle}
        empty={content.eventsEmpty}
        items={dashboard.events}
        itemKey={(event) => event.id}
        render={(event) => <EventRow event={event} locale={locale} />}
      />

      <MeList
        title={content.creditsTitle}
        empty={content.creditsEmpty}
        items={dashboard.credits}
        itemKey={(credit) => `${credit.pool}-${credit.code}`}
        render={(credit) => (
          <CreditRow credit={credit} content={content} locale={locale} />
        )}
      />

      <MeProjects
        dashboard={dashboard}
        content={content}
        onDashboard={onDashboard}
      />

      <MeSettings
        dashboard={dashboard}
        join={join}
        content={content}
        locale={locale}
        onDashboard={onDashboard}
      />
    </div>
  )
}

function MeList<TItem>({
  title,
  empty,
  items,
  itemKey,
  render,
}: {
  title: string
  empty: string
  items: ReadonlyArray<TItem>
  itemKey: (item: TItem) => string
  render: (item: TItem) => ReactNode
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">{empty}</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <Fragment key={itemKey(item)}>{render(item)}</Fragment>
          ))}
        </ul>
      )}
    </section>
  )
}

function EventRow({ event, locale }: { event: MeEvent; locale: Locale }) {
  return (
    <li className="rounded-2xl border border-border/60 bg-background/70 p-4">
      <p className="font-medium text-foreground">{event.name}</p>
      <p className="text-sm text-muted-foreground">
        {[
          event.startsAt ? formatMeDate(event.startsAt, locale) : null,
          event.venue,
        ]
          .filter(Boolean)
          .join(" · ")}
      </p>
    </li>
  )
}

function CreditRow({
  credit,
  content,
  locale,
}: {
  credit: MeCredit
  content: ApertureMeContent
  locale: Locale
}) {
  return (
    <li className="flex flex-col gap-1 rounded-2xl border border-border/60 bg-background/70 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-col gap-1">
        <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {content.poolLabels[credit.pool]}
        </span>
        <code className="truncate font-mono text-sm text-foreground">
          {credit.code}
        </code>
        <span className="text-sm text-muted-foreground">
          {credit.eventName}
        </span>
      </div>
      {credit.expiresAt ? (
        <p className="text-sm text-muted-foreground">
          {content.expiresLabel.replace(
            "{date}",
            formatMeDate(credit.expiresAt, locale)
          )}
        </p>
      ) : null}
    </li>
  )
}
