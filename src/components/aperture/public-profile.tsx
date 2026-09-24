import type { ReactNode } from "react"
import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  ArrowUpRight01Icon,
  Calendar03Icon,
  GithubIcon,
  Globe02Icon,
  InstagramIcon,
  Linkedin01Icon,
  Location01Icon,
  NewTwitterIcon,
  Share08Icon,
  SourceCodeIcon,
} from "@hugeicons/core-free-icons"

import {
  ApertureHero,
  ApertureNumeral,
} from "@/components/aperture/aperture-hero"
import {
  apertureOutlinePillClassName,
  aperturePanelClassName,
  apertureQuietLinkClassName,
} from "@/components/aperture/aperture-styles"
import { BuiltWithBar } from "@/components/aperture/built-with-bar"
import { MemberAvatar } from "@/components/aperture/member-avatar"
import type {
  ApertureJoinContent,
  ApertureMeContent,
  ApertureProfileContent,
  Locale,
} from "@/content/types"
import { countryName } from "@/lib/aperture/countries"
import { formatMeDate } from "@/lib/aperture/me-date"
import { formatMemberNumber } from "@/lib/aperture/member-number"
import { shareCardPath } from "@/lib/aperture/share-card"
import { cn } from "@/lib/utils"
import type { PublicProfile } from "@/server/aperture/public"

type LinkField = PublicProfile["links"][number]["field"]

const LINK_LABEL: Record<LinkField, keyof ApertureMeContent["fields"]> = {
  linkedinUrl: "linkedin",
  xUrl: "x",
  githubUrl: "github",
  websiteUrl: "website",
  instagramUrl: "instagram",
}

const LINK_ICON: Record<LinkField, typeof Globe02Icon> = {
  linkedinUrl: Linkedin01Icon,
  xUrl: NewTwitterIcon,
  githubUrl: GithubIcon,
  websiteUrl: Globe02Icon,
  instagramUrl: InstagramIcon,
}

const smallPillClassName =
  "inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border px-3.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"

function displayHref(href: string): string {
  try {
    const url = new URL(href)
    const path = url.pathname === "/" ? "" : url.pathname.replace(/\/$/, "")
    return `${url.host.replace(/^www\./, "")}${path}`
  } catch {
    return href
  }
}

function ProfilePanel({
  title,
  children,
  className,
}: {
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn(aperturePanelClassName, className)}>
      <h2 className="font-display text-lg font-semibold tracking-tight">
        {title}
      </h2>
      {children}
    </section>
  )
}

export function PublicProfileView({
  profile,
  join,
  me,
  content,
  locale,
}: {
  profile: PublicProfile
  join: ApertureJoinContent
  me: ApertureMeContent
  content: ApertureProfileContent
  locale: Locale
}) {
  const location = [profile.city, countryName(profile.countryCode, locale)]
    .filter(Boolean)
    .join(", ")
  const hasMain = Boolean(profile.bio) || profile.projects.length > 0

  const aside = (
    <>
      {profile.upFor.length > 0 ? (
        <ProfilePanel title={content.upForTitle}>
          <ul className="flex flex-wrap gap-2">
            {profile.upFor.map((option) => (
              <li
                key={option}
                className="rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-foreground"
              >
                {join.upForOptions[option]}
              </li>
            ))}
          </ul>
        </ProfilePanel>
      ) : null}

      {profile.links.length > 0 ? (
        <ProfilePanel title={content.linksTitle}>
          <ul className="-mx-2 flex flex-col">
            {profile.links.map((link) => (
              <li key={link.field}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-foreground">
                    <HugeiconsIcon
                      icon={LINK_ICON[link.field]}
                      strokeWidth={1.8}
                      className="size-4.5"
                    />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {me.fields[LINK_LABEL[link.field]].label}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {displayHref(link.href)}
                    </span>
                  </span>
                  <HugeiconsIcon
                    icon={ArrowUpRight01Icon}
                    strokeWidth={2}
                    className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
                  />
                </a>
              </li>
            ))}
          </ul>
        </ProfilePanel>
      ) : null}

      {profile.events.length > 0 ? (
        <ProfilePanel title={content.eventsTitle}>
          <ul className="flex flex-col gap-3">
            {profile.events.map((event) => (
              <EventItem key={event.id} event={event} locale={locale} />
            ))}
          </ul>
        </ProfilePanel>
      ) : null}
    </>
  )

  return (
    <article className="flex flex-col gap-6 md:gap-8">
      <ApertureHero
        aside={
          <ApertureNumeral
            value={`#${formatMemberNumber(profile.number)}`}
            label={content.memberLabel}
          />
        }
      >
        <Link to="/aperture" className={apertureQuietLinkClassName}>
          <HugeiconsIcon
            icon={ArrowLeft01Icon}
            strokeWidth={2}
            className="size-4"
          />
          {content.backToDirectory}
        </Link>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
          <MemberAvatar
            name={profile.displayName}
            src={profile.avatarUrl}
            size="lg"
          />
          <div className="flex min-w-0 flex-col gap-1">
            <h1 className="font-display text-4xl leading-[1.02] font-semibold tracking-tight break-words sm:text-5xl lg:text-6xl">
              {profile.displayName}
            </h1>
            <p className="text-base text-muted-foreground">
              @{profile.username}
            </p>
          </div>
        </div>
        <p className="max-w-xl text-lg leading-relaxed text-foreground md:text-xl">
          {profile.headline}
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span className="rounded-full bg-foreground/10 px-3 py-1 font-medium text-foreground">
            {join.roleOptions[profile.role]}
          </span>
          {location ? (
            <span className="inline-flex items-center gap-1.5">
              <HugeiconsIcon
                icon={Location01Icon}
                strokeWidth={2}
                className="size-4 shrink-0"
              />
              {location}
            </span>
          ) : null}
        </div>
        <a
          href={shareCardPath(profile.username)}
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
      </ApertureHero>

      {hasMain ? (
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem]">
          <div className="flex min-w-0 flex-col gap-6">
            {profile.bio ? (
              <ProfilePanel title={content.aboutTitle}>
                <p className="max-w-prose text-base leading-relaxed whitespace-pre-line text-foreground">
                  {profile.bio}
                </p>
              </ProfilePanel>
            ) : null}
            {profile.projects.length > 0 ? (
              <ProjectsSection profile={profile} content={content} />
            ) : null}
          </div>
          <div className="flex flex-col gap-6">{aside}</div>
        </div>
      ) : (
        <div className="grid items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
          {aside}
        </div>
      )}
    </article>
  )
}

function ProjectsSection({
  profile,
  content,
}: {
  profile: PublicProfile
  content: ApertureProfileContent
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="px-1 font-display text-2xl font-semibold tracking-tight text-foreground">
        {content.projectsTitle}
      </h2>
      <ul className="grid gap-4 md:grid-cols-2">
        {profile.projects.map((project) => (
          <li
            key={project.id}
            className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card text-card-foreground"
          >
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt=""
                loading="lazy"
                className="aspect-video w-full border-b border-border object-cover"
              />
            ) : null}
            <div className="flex flex-1 flex-col gap-5 p-6">
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-xl leading-tight font-semibold tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.summary}
                </p>
              </div>
              <BuiltWithBar
                parts={project.builtWith}
                title={content.builtWithTitle}
              />
              {project.url || project.repoUrl ? (
                <div className="mt-auto flex flex-wrap gap-2 pt-1">
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={smallPillClassName}
                    >
                      {content.projectLinkCta}
                      <HugeiconsIcon
                        icon={ArrowUpRight01Icon}
                        strokeWidth={2}
                        className="size-4"
                      />
                    </a>
                  ) : null}
                  {project.repoUrl ? (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={smallPillClassName}
                    >
                      <HugeiconsIcon
                        icon={SourceCodeIcon}
                        strokeWidth={2}
                        className="size-4"
                      />
                      {content.repoLinkCta}
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
      <p className="px-1 text-xs leading-relaxed text-muted-foreground">
        {content.builtWithDisclaimer}
      </p>
    </section>
  )
}

function EventItem({
  event,
  locale,
}: {
  event: PublicProfile["events"][number]
  locale: Locale
}) {
  const detail = [
    event.startsAt ? formatMeDate(event.startsAt, locale) : null,
    event.venue,
  ].filter(Boolean)

  return (
    <li className="flex items-start gap-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground">
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
        {detail.length > 0 ? (
          <span className="text-xs text-muted-foreground">
            {detail.join(", ")}
          </span>
        ) : null}
      </span>
    </li>
  )
}
