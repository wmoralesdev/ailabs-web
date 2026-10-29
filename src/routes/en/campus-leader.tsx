import { createFileRoute } from "@tanstack/react-router"

import { reuseSitePage } from "@/lib/reuse-site-page"
import { Route as SiteRoute } from "@/routes/_site/campus-leader"

export const Route = createFileRoute("/en/campus-leader")(
  reuseSitePage(SiteRoute.options)
)
