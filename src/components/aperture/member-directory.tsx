import { Link } from "@tanstack/react-router"

import { homePillClassName } from "@/components/home/home-styles"
import type {
  ApertureDirectoryContent,
  ApertureJoinContent,
  Locale,
} from "@/content/types"
import { countryName } from "@/lib/aperture/countries"
import { formatMemberNumber } from "@/lib/aperture/member-number"
import { cn } from "@/lib/utils"
import type { DirectoryMember } from "@/server/aperture/public"

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
  return (
    <div className="flex flex-col gap-8">
      <header className="flex max-w-prose flex-col gap-3">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          {content.headline}
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          {content.body}
        </p>
        <Link to="/aperture/join" className={cn(homePillClassName, "w-fit")}>
          {content.joinCta}
        </Link>
      </header>

      {members.length === 0 ? (
        <p className="text-sm text-muted-foreground">{content.empty}</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {members.map((member) => (
            <li key={member.username}>
              <Link
                to="/u/$username"
                params={{ username: member.username }}
                className="flex h-full flex-col gap-2 rounded-2xl border border-border bg-card p-5 text-card-foreground transition-colors hover:border-foreground/20 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <p className="font-mono text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  #{formatMemberNumber(member.number)}
                </p>
                <p className="font-display text-xl font-semibold tracking-tight">
                  {member.displayName}
                </p>
                <p className="text-sm text-muted-foreground">
                  @{member.username} · {join.roleOptions[member.role]}
                </p>
                <p className="text-sm text-foreground">{member.headline}</p>
                <p className="text-xs text-muted-foreground">
                  {countryName(member.countryCode, locale)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
