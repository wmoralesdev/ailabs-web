import { createFileRoute } from "@tanstack/react-router"

import { reuseSitePage } from "@/lib/reuse-site-page"
import { Route as SiteRoute } from "@/routes/_site/events/$slug"

export const Route = createFileRoute("/en/events/$slug")(
  reuseSitePage(SiteRoute.options)
)
