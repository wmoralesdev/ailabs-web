import { useDeferredValue, useMemo, useState } from "react"
import type { ReactNode } from "react"
import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  Search01Icon,
  UserSearch01Icon,
} from "@hugeicons/core-free-icons"

import { MemberAvatar } from "@/components/aperture/member-avatar"
import { homePillClassName } from "@/components/home/home-styles"
import { Eyebrow } from "@/components/ui/eyebrow"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import type {
  ApertureDirectoryContent,
  ApertureJoinContent,
  ApertureMemberRole,
  Locale,
} from "@/content/types"
import { countryName } from "@/lib/aperture/countries"
import { formatMemberNumber } from "@/lib/aperture/member-number"
import { MEMBER_ROLES } from "@/lib/aperture/profile-input"
import { cn } from "@/lib/utils"
import type { DirectoryMember } from "@/server/aperture/public"

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase()
}

function matches(member: DirectoryMember, query: string): boolean {
  if (!query) {
    return true
  }
  return [member.displayName, member.username, member.headline].some((field) =>
    normalize(field).includes(query)
  )
}

const chipClassName =
  "inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"

export function MemberDirectory({
  members,
  join,
  content,
  locale,
}: {
  members: ReadonlyArray<DirectoryMember>
  join: ApertureJoinContent
  content: ApertureDirectoryContent
  locale: Locale
}) {
  const [query, setQuery] = useState("")
  const [role, setRole] = useState<ApertureMemberRole | null>(null)
  const deferredQuery = useDeferredValue(query)

  const presentRoles = useMemo(
    () =>
      MEMBER_ROLES.filter((option) => members.some((m) => m.role === option)),
    [members]
  )
  const visible = useMemo(() => {
    const needle = normalize(deferredQuery.trim())
    return members.filter(
      (member) => (!role || member.role === role) && matches(member, needle)
    )
  }, [members, deferredQuery, role])
  const filtered = Boolean(query.trim()) || role !== null

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-6 px-1 pt-4 md:flex-row md:items-end md:justify-between md:gap-10 md:pt-8">
        <div className="flex max-w-2xl flex-col gap-3">
          <Eyebrow>{content.label}</Eyebrow>
          <h1 className="font-display text-4xl leading-none font-semibold tracking-tight text-foreground sm:text-5xl">
            {content.headline}
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            {content.body}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <p className="flex items-baseline gap-2 text-sm text-muted-foreground">
            <span className="font-display text-3xl leading-none font-semibold text-foreground tabular-nums">
              {members.length}
            </span>
            {content.countLabel}
          </p>
          <Link to="/aperture/join" className={homePillClassName}>
            {content.joinCta}
            <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
          </Link>
        </div>
      </header>

      {members.length === 0 ? (
        <EmptyState title={content.empty} />
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <InputGroup
              size="xl"
              className="bg-card data-[size=xl]:h-12 data-[size=xl]:rounded-full lg:max-w-sm"
            >
              <InputGroupAddon>
                <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
              </InputGroupAddon>
              <InputGroupInput
                type="search"
                aria-label={content.searchLabel}
                placeholder={content.searchPlaceholder}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </InputGroup>
            <div
              role="group"
              aria-label={content.roleFilterLabel}
              className="flex flex-wrap gap-2"
            >
              {[null, ...presentRoles].map((option) => {
                const active = role === option
                return (
                  <button
                    key={option ?? "all"}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setRole(option)}
                    className={cn(
                      chipClassName,
                      active
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-card text-foreground hover:border-foreground/30"
                    )}
                  >
                    {option ? join.roleOptions[option] : content.allRoles}
                  </button>
                )
              })}
            </div>
          </div>

          <p
            aria-live="polite"
            className="text-sm text-muted-foreground tabular-nums empty:hidden"
          >
            {filtered
              ? content.resultsCount
                  .replace("{count}", String(visible.length))
                  .replace("{total}", String(members.length))
              : null}
          </p>

          {visible.length === 0 ? (
            <EmptyState title={content.noResults}>
              {filtered ? (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("")
                    setRole(null)
                  }}
                  className={cn(
                    chipClassName,
                    "border-border bg-card text-foreground hover:border-foreground/30"
                  )}
                >
                  {content.clearFilters}
                </button>
              ) : null}
            </EmptyState>
          ) : (
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((member) => (
                <li key={member.username} className="min-w-0">
                  <MemberRow member={member} join={join} locale={locale} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

function MemberRow({
  member,
  join,
  locale,
}: {
  member: DirectoryMember
  join: ApertureJoinContent
  locale: Locale
}) {
  return (
    <Link
      to="/u/$username"
      params={{ username: member.username }}
      className="group flex min-h-15 items-center gap-3 rounded-2xl bg-card py-2.5 pr-4 pl-2.5 text-card-foreground ring-1 ring-transparent transition-[box-shadow,background-color] duration-150 hover:ring-border focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      <MemberAvatar name={member.displayName} src={member.avatarUrl} />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-semibold text-foreground">
          {member.displayName}
        </span>
        <span className="truncate text-xs text-muted-foreground">
          {join.roleOptions[member.role]}
          <span aria-hidden="true"> · </span>
          {countryName(member.countryCode, locale)}
        </span>
      </span>
      <span className="shrink-0 text-xs font-medium text-muted-foreground tabular-nums transition-colors group-hover:text-foreground">
        #{formatMemberNumber(member.number)}
      </span>
    </Link>
  )
}

function EmptyState({
  title,
  children,
}: {
  title: string
  children?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border bg-card/60 px-6 py-14 text-center">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-muted text-foreground">
        <HugeiconsIcon icon={UserSearch01Icon} strokeWidth={2} />
      </span>
      <p className="max-w-sm text-base text-muted-foreground">{title}</p>
      {children}
    </div>
  )
}
