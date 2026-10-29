import { createFileRoute } from "@tanstack/react-router"

import { reuseSitePage } from "@/lib/reuse-site-page"
import { Route as SiteRoute } from "@/routes/_site/lab"

export const Route = createFileRoute("/en/lab")(reuseSitePage(SiteRoute.options))
