import { createFileRoute } from "@tanstack/react-router"

import { reuseSitePage } from "@/lib/reuse-site-page"
import { Route as SiteRoute } from "@/routes/_site/brand"

export const Route = createFileRoute("/en/brand")(
  reuseSitePage(SiteRoute.options)
)
