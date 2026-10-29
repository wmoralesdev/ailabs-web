import { createFileRoute } from "@tanstack/react-router"

import { SiteLayout, SiteNotFound } from "@/components/chrome/site-layout"

export const Route = createFileRoute("/_site")({
  component: SiteLayout,
  notFoundComponent: SiteNotFound,
})
