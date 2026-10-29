import { createFileRoute } from "@tanstack/react-router"

import { reuseSitePage } from "@/lib/reuse-site-page"
import { Route as SiteRoute } from "@/routes/_site/automatizacion-ia-el-salvador"

export const Route = createFileRoute("/en/automatizacion-ia-el-salvador")(
  reuseSitePage(SiteRoute.options)
)
