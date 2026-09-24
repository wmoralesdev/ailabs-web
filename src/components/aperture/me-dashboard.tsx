"use client"

import { Fragment } from "react"
import type { ReactNode } from "react"
import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  Calendar03Icon,
  Share08Icon,
} from "@hugeicons/core-free-icons"

import {
  ApertureHero,
  ApertureNumeral,
} from "@/components/aperture/aperture-hero"
import {
  apertureOutlinePillClassName,
  aperturePanelClassName,
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
    <div className="flex flex-col gap-6 md:gap-8">
      <ApertureHero
        aside={
          <div className="flex gap-10 lg:gap-14">
            <ApertureNumeral
              value={String(dashboard.events.length)}
              label={content.eventsTitle}
            />
            <ApertureNumeral
              value={String(dashboard.credits.length)}
              label={content.creditsTitle}
            />
          </div>
        }
      >
        <Eyebrow>{content.numberLabel.replace("{number}", number)}</Eyebrow>
        <h1 className="font-display text-4xl leading-[1.02] font-semibold tracking-tight break-words sm:text-5xl">
          {dashboard.profile.displayName}
        </h1>
        <div className="flex flex-col gap-1">
          <p className="text-base text-muted-foreground">
            @{dashboard.username}
          </p>
          <p className="max-w-xl text-lg leading-relaxed text-foreground">
            {dashboard.profile.headline}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/u/$username"
            params={{ username: dashboard.username }}
            className={cn(homePillClassName, "w-fit")}
          >
            /u/{dashboard.username}
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
      </ApertureHero>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_26rem]">
        <div className="flex min-w-0 flex-col gap-6">
          <div className={aperturePanelClassName}>
            <MeProjects
              dashboard={dashboard}
              content={content}
              onDashboard={onDashboard}
            />
          </div>
          <div className={aperturePanelClassName}>
            <MeSettings
              dashboard={dashboard}
              join={join}
              content={content}
              locale={locale}
              onDashboard={onDashboard}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
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
        </div>
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
    <section className={aperturePanelClassName}>
      <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border px-4 py-5 text-sm leading-relaxed text-muted-foreground">
          {empty}
        </p>
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
    <li className="flex items-start gap-3 rounded-2xl bg-muted/50 p-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-background text-foreground">
        <HugeiconsIcon
          icon={Calendar03Icon}
          strokeWidth={1.8}
          className="size-4.5"
        />
      </span>
      <span className="flex min-w-0 flex-col pt-0.5">
        <span className="text-sm font-medium text-foreground">
          {event.name}
        </span>
        <span className="text-xs text-muted-foreground">
          {[
            event.startsAt ? formatMeDate(event.startsAt, locale) : null,
            event.venue,
          ]
            .filter(Boolean)
            .join(", ")}
        </span>
      </span>
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
    <li className="flex flex-col gap-2 rounded-2xl bg-muted/50 p-4">
      <div className="flex min-w-0 flex-col gap-1">
        <span className="w-fit rounded-full bg-background px-2.5 py-0.5 text-xs font-medium text-foreground">
          {content.poolLabels[credit.pool]}
        </span>
        <code className="truncate font-mono text-sm font-semibold text-foreground select-all">
          {credit.code}
        </code>
        <span className="text-sm text-muted-foreground">
          {credit.eventName}
        </span>
      </div>
      {credit.expiresAt ? (
        <p className="text-xs text-muted-foreground">
          {content.expiresLabel.replace(
            "{date}",
            formatMeDate(credit.expiresAt, locale)
          )}
        </p>
      ) : null}
    </li>
  )
}
