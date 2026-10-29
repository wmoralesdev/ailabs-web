import { createFileRoute } from "@tanstack/react-router"

import { reuseSitePage } from "@/lib/reuse-site-page"
import { Route as SiteRoute } from "@/routes/_site/privacy"

export const Route = createFileRoute("/en/privacy")(
  reuseSitePage(SiteRoute.options)
)
