import { createFileRoute } from "@tanstack/react-router"

import { reuseSitePage } from "@/lib/reuse-site-page"
import { Route as SiteRoute } from "@/routes/_site/redeem"

export const Route = createFileRoute("/en/redeem")(
  reuseSitePage(SiteRoute.options)
)
