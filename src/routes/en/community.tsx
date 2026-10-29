import { createFileRoute } from "@tanstack/react-router"

import { reuseSitePage } from "@/lib/reuse-site-page"
import { Route as SiteRoute } from "@/routes/_site/community"

export const Route = createFileRoute("/en/community")(
  reuseSitePage(SiteRoute.options)
)
