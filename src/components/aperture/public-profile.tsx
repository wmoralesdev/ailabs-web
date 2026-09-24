import type {
  ApertureJoinContent,
  ApertureMeContent,
  ApertureProfileContent,
  Locale,
} from "@/content/types"
import { countryName } from "@/lib/aperture/countries"
import { formatMeDate } from "@/lib/aperture/me-date"
import { formatMemberNumber } from "@/lib/aperture/member-number"
import { BuiltWithBar } from "@/components/aperture/built-with-bar"
import type { PublicProfile } from "@/server/aperture/public"

const LINK_LABEL: Record<
  PublicProfile["links"][number]["field"],
  keyof ApertureMeContent["fields"]
> = {
  linkedinUrl: "linkedin",
  xUrl: "x",
  githubUrl: "github",
  websiteUrl: "website",
  instagramUrl: "instagram",
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

  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
        {profile.avatarUrl ? (
          <img
            src={profile.avatarUrl}
            alt=""
            className="size-20 rounded-2xl border border-border object-cover"
          />
        ) : null}
        <div className="flex min-w-0 flex-col gap-2">
          <p className="font-mono text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            #{formatMemberNumber(profile.number)}
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {profile.displayName}
          </h1>
          <p className="text-base text-muted-foreground">
            @{profile.username} · {join.roleOptions[profile.role]}
          </p>
          <p className="text-lg text-foreground">{profile.headline}</p>
          {location ? (
            <p className="text-sm text-muted-foreground">{location}</p>
          ) : null}
        </div>
      </header>

      {profile.bio ? (
        <p className="max-w-prose text-base leading-relaxed text-foreground">
          {profile.bio}
        </p>
      ) : null}

      {profile.upFor.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {profile.upFor.map((option) => (
            <li
              key={option}
              className="rounded-full border border-border bg-background px-3 py-1 text-sm text-foreground"
            >
              {join.upForOptions[option]}
            </li>
          ))}
        </ul>
      ) : null}

      {profile.links.length > 0 ? (
        <section className="flex flex-col gap-2">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            {content.linksTitle}
          </h2>
          <ul className="flex flex-col gap-2">
            {profile.links.map((link) => (
              <li key={link.field}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-foreground underline underline-offset-4"
                >
                  {me.fields[LINK_LABEL[link.field]].label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {profile.projects.length > 0 ? (
        <section className="flex flex-col gap-4">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            {content.projectsTitle}
          </h2>
          <ul className="flex flex-col gap-4">
            {profile.projects.map((project) => (
              <li
                key={project.id}
                className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-background/70 p-4"
              >
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-foreground">{project.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {project.summary}
                  </p>
                </div>
                <BuiltWithBar parts={project.builtWith} />
                <div className="flex flex-wrap gap-3">
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-foreground underline underline-offset-4"
                    >
                      {me.fields.url.label}
                    </a>
                  ) : null}
                  {project.repoUrl ? (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-foreground underline underline-offset-4"
                    >
                      {me.fields.repoUrl.label}
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground">
            {content.builtWithDisclaimer}
          </p>
        </section>
      ) : null}

      {profile.events.length > 0 ? (
        <section className="flex flex-col gap-3">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            {content.eventsTitle}
          </h2>
          <ul className="flex flex-col gap-2">
            {profile.events.map((event) => (
              <li
                key={event.id}
                className="rounded-2xl border border-border/60 bg-background/70 p-4"
              >
                <p className="font-medium text-foreground">{event.name}</p>
                <p className="text-sm text-muted-foreground">
                  {[
                    event.startsAt
                      ? formatMeDate(event.startsAt, locale)
                      : null,
                    event.venue,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  )
}
