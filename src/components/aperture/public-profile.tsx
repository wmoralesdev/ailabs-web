import type { ReactNode } from "react"
import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  ArrowUpRight01Icon,
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
  apertureOutlinePillClassName,
  apertureQuietLinkClassName,
  apertureSectionClassName,
  apertureSectionTitleClassName,
  apertureTextLinkClassName,
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

function displayHref(href: string): string {
  try {
    const url = new URL(href)
    const path = url.pathname === "/" ? "" : url.pathname.replace(/\/$/, "")
    return `${url.host.replace(/^www\./, "")}${path}`
  } catch {
    return href
  }
}

function ProfileSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className={apertureSectionClassName}>
      <h2 className={apertureSectionTitleClassName}>{title}</h2>
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

  const asideSections = [
    profile.upFor.length > 0 ? (
      <ProfileSection key="up-for" title={content.upForTitle}>
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
      </ProfileSection>
    ) : null,
    profile.links.length > 0 ? (
      <ProfileSection key="links" title={content.linksTitle}>
        <ul className="-mx-2 flex flex-col">
          {profile.links.map((link) => (
            <li key={link.field}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-12 items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <HugeiconsIcon
                  icon={LINK_ICON[link.field]}
                  strokeWidth={1.8}
                  className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
                />
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
      </ProfileSection>
    ) : null,
    profile.events.length > 0 ? (
      <ProfileSection key="events" title={content.eventsTitle}>
        <ul className="flex flex-col gap-4">
          {profile.events.map((event) => (
            <EventItem key={event.id} event={event} locale={locale} />
          ))}
        </ul>
      </ProfileSection>
    ) : null,
  ].filter(Boolean)

  return (
    <article className="flex flex-col gap-10 px-1 pt-2 md:gap-14 md:px-4 md:pt-6">
      <header className="flex flex-col gap-8">
        <div className="flex items-center justify-between gap-3">
          <Link to="/aperture" className={apertureQuietLinkClassName}>
            <HugeiconsIcon
              icon={ArrowLeft01Icon}
              strokeWidth={2}
              className="size-4"
            />
            {content.backToDirectory}
          </Link>
          <p className="text-sm text-muted-foreground">
            {content.memberLabel}{" "}
            <span className="font-display font-semibold text-foreground tabular-nums">
              #{formatMemberNumber(profile.number)}
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8 lg:gap-12">
          <MemberAvatar
            name={profile.displayName}
            src={profile.avatarUrl}
            size="portrait"
          />
          <div className="flex min-w-0 flex-1 flex-col gap-5 sm:pt-2">
            <div className="flex flex-col gap-2">
              <h1 className="font-display text-4xl leading-[1.05] font-semibold tracking-tight text-balance break-words text-foreground sm:text-5xl lg:text-6xl">
                {profile.displayName}
              </h1>
              <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span>@{profile.username}</span>
                <span className="font-medium text-foreground">
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
              </p>
            </div>
            <p className="max-w-[60ch] text-lg leading-relaxed text-foreground md:text-xl">
              {profile.headline}
            </p>
            {profile.bio ? (
              <p className="max-w-[65ch] text-base leading-relaxed whitespace-pre-line text-muted-foreground">
                {profile.bio}
              </p>
            ) : null}
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
          </div>
        </div>
      </header>

      {profile.projects.length > 0 ? (
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <ProjectsSection profile={profile} content={content} />
          {asideSections.length > 0 ? (
            <aside className="flex flex-col gap-8">{asideSections}</aside>
          ) : null}
        </div>
      ) : asideSections.length > 0 ? (
        <aside
          className={cn(
            "grid items-start gap-8 md:grid-cols-2 md:gap-10",
            asideSections.length > 2 && "xl:grid-cols-3"
          )}
        >
          {asideSections}
        </aside>
      ) : null}
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
    <section className="flex min-w-0 flex-col">
      <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
        {content.projectsTitle}
      </h2>
      <ul className="mt-2 flex flex-col divide-y divide-border">
        {profile.projects.map((project) => (
          <ProjectItem key={project.id} project={project} content={content} />
        ))}
      </ul>
      <p className="border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
        {content.builtWithDisclaimer}
      </p>
    </section>
  )
}

function ProjectItem({
  project,
  content,
}: {
  project: PublicProfile["projects"][number]
  content: ApertureProfileContent
}) {
  return (
    <li className="grid gap-5 py-7 md:grid-cols-[minmax(0,1fr)_15rem] md:gap-10">
      <div className="flex min-w-0 flex-col gap-3">
        {project.imageUrl ? (
          <div className="relative mb-2 aspect-video w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-muted">
            <img
              src={project.imageUrl}
              alt=""
              loading="lazy"
              className="absolute inset-0 size-full object-cover"
            />
          </div>
        ) : null}
        <h3 className="font-display text-xl leading-tight font-semibold tracking-tight text-foreground">
          {project.title}
        </h3>
        <p className="max-w-[60ch] text-sm leading-relaxed text-muted-foreground md:text-base">
          {project.summary}
        </p>
        {project.url || project.repoUrl ? (
          <div className="flex flex-wrap gap-x-6">
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={apertureTextLinkClassName}
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
                className={apertureTextLinkClassName}
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
      <div className="md:pt-1">
        <BuiltWithBar parts={project.builtWith} title={content.builtWithTitle} />
      </div>
    </li>
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
