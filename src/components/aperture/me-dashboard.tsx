"use client"

import { Fragment } from "react"
import type { ReactNode } from "react"
import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, Share08Icon } from "@hugeicons/core-free-icons"

import {
  apertureOutlinePillClassName,
  aperturePanelClassName,
  apertureSectionClassName,
  apertureSectionTitleClassName,
} from "@/components/aperture/aperture-styles"
import { MeProjects } from "@/components/aperture/me-projects"
import { MeSettings } from "@/components/aperture/me-settings"
import { homePillClassName } from "@/components/home/home-styles"
import { Eyebrow } from "@/components/ui/eyebrow"
import type {
  ApertureJoinContent,
  ApertureMeContent,
  Locale,
} from "@/content/types"
import { formatMemberNumber } from "@/lib/aperture/member-number"
import { shareCardPath } from "@/lib/aperture/share-card"
import { formatMeDate } from "@/lib/aperture/me-date"
import { cn } from "@/lib/utils"
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
    <div className="flex flex-col gap-10 px-1 md:gap-14 md:px-4">
      <header className="flex flex-col gap-5 pt-2 md:pt-4">
        <Eyebrow>{content.numberLabel.replace("{number}", number)}</Eyebrow>
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-4xl leading-[1.05] font-semibold tracking-tight break-words text-foreground sm:text-5xl">
            {dashboard.profile.displayName}
          </h1>
          <p className="text-sm text-muted-foreground">@{dashboard.username}</p>
        </div>
        <p className="max-w-[60ch] text-lg leading-relaxed text-foreground">
          {dashboard.profile.headline}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/u/$username"
            params={{ username: dashboard.username }}
            className={cn(homePillClassName, "w-fit")}
          >
            {content.viewProfileCta}
            <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
          </Link>
          <a
            href={shareCardPath(dashboard.username)}
            target="_blank"
            rel="noopener noreferrer"
            className={apertureOutlinePillClassName}
          >
            <HugeiconsIcon
              icon={Share08Icon}
              strokeWidth={2}
              className="size-4"
            />
            {content.shareCta}
          </a>
        </div>
      </header>

      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <MeProjects
          dashboard={dashboard}
          content={content}
          onDashboard={onDashboard}
        />
        <aside className="flex flex-col gap-8">
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
        </aside>
      </div>

      <div className={cn(aperturePanelClassName, "p-6 md:p-10")}>
        <MeSettings
          dashboard={dashboard}
          join={join}
          content={content}
          locale={locale}
          onDashboard={onDashboard}
        />
      </div>
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
    <section className={apertureSectionClassName}>
      <h2 className={apertureSectionTitleClassName}>{title}</h2>
      {items.length === 0 ? (
        <p className="text-sm leading-relaxed text-muted-foreground">{empty}</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {items.map((item) => (
            <Fragment key={itemKey(item)}>{render(item)}</Fragment>
          ))}
        </ul>
      )}
    </section>
  )
}

function EventRow({ event, locale }: { event: MeEvent; locale: Locale }) {
  const detail = [
    event.startsAt ? formatMeDate(event.startsAt, locale) : null,
    event.venue,
  ].filter(Boolean)

  return (
    <li className="flex min-w-0 flex-col gap-0.5">
      <span className="text-sm font-medium text-foreground">{event.name}</span>
      {detail.length > 0 ? (
        <span className="text-xs text-muted-foreground tabular-nums">
          {detail.join(", ")}
        </span>
      ) : null}
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
    <li className="flex min-w-0 flex-col gap-1.5 rounded-2xl bg-card p-4 ring-1 ring-border">
      <span className="text-xs font-medium text-muted-foreground">
        {content.poolLabels[credit.pool]}
      </span>
      <code className="truncate font-mono text-sm font-semibold text-foreground select-all">
        {credit.code}
      </code>
      <span className="text-sm text-muted-foreground">{credit.eventName}</span>
      {credit.expiresAt ? (
        <span className="text-xs text-muted-foreground tabular-nums">
          {content.expiresLabel.replace(
            "{date}",
            formatMeDate(credit.expiresAt, locale)
          )}
        </span>
      ) : null}
    </li>
  )
}
