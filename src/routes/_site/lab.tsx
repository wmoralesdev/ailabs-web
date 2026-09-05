import { createFileRoute } from "@tanstack/react-router"

import { LabHero } from "@/components/lab/lab-hero"

export const Route = createFileRoute("/_site/lab")({
  head: () => ({
    meta: [
      { title: "Lab · Text spiral" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LabPage,
})

function LabPage() {
  const { locale, content } = Route.useRouteContext()

  return (
    <>
      <h1 className="sr-only">Community words spiral lab</h1>
      <LabHero locale={locale} content={content} />
    </>
  )
}
