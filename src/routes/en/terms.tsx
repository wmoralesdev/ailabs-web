import { createFileRoute } from "@tanstack/react-router"

import { reuseSitePage } from "@/lib/reuse-site-page"
import { Route as SiteRoute } from "@/routes/_site/terms"

export const Route = createFileRoute("/en/terms")(reuseSitePage(SiteRoute.options))
