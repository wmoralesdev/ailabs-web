import { createFileRoute, getRouteApi } from "@tanstack/react-router"

import { LabHero } from "@/components/lab/lab-hero"

const localeRoute = getRouteApi("/$locale")

export const Route = createFileRoute("/$locale/lab")({
  head: () => ({
    meta: [
      { title: "Lab · Text spiral" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LabPage,
})

function LabPage() {
  const { locale, content } = localeRoute.useRouteContext()

  return (
    <>
      <h1 className="sr-only">Community words spiral lab</h1>
      <LabHero locale={locale} content={content} />
    </>
  )
}
