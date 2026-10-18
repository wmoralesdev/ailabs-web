import { Link, createFileRoute } from "@tanstack/react-router"

import { MainCard } from "@/components/chrome/main-card"
import { Eyebrow } from "@/components/ui/eyebrow"
import { buildPageMeta } from "@/lib/seo"

export const Route = createFileRoute("/_site/events/")({
  loader: ({ context }) => context,
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }
    const { locale, content } = loaderData
    const { events } = content
    return buildPageMeta({
      locale,
      path: "/events",
      title: events.headline,
      description: events.intro,
    })
  },
  component: EventsIndexPage,
})

const eventLinkClassName =
  "w-fit font-display text-xl font-semibold tracking-tight text-foreground underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"

function EventsIndexPage() {
  const { content } = Route.useRouteContext()
  const { events } = content

  return (
    <MainCard>
      <article className="page-gutter section-y mx-auto flex w-full max-w-content flex-col gap-10">
        <header className="flex max-w-prose flex-col gap-4">
          <Eyebrow>{events.label}</Eyebrow>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {events.headline}
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            {events.intro}
          </p>
        </header>
        <ul className="flex max-w-prose flex-col gap-8">
          {events.items.map((item) => {
            const slug = /^\/events\/([^/]+)$/.exec(item.href)?.[1]
            const name = slug ? (
              <Link
                to="/events/$slug"
                params={{ slug }}
                className={eventLinkClassName}
              >
                {item.name}
              </Link>
            ) : (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={eventLinkClassName}
              >
                {item.name}
              </a>
            )

            return (
              <li key={item.id} className="flex flex-col gap-2">
                {name}
                <p className="text-base leading-relaxed text-muted-foreground">
                  {item.summary}
                </p>
              </li>
            )
          })}
        </ul>
      </article>
    </MainCard>
  )
}
