import { createFileRoute } from "@tanstack/react-router"

import { reuseSitePage } from "@/lib/reuse-site-page"
import { Route as SiteRoute } from "@/routes/_site/consultoria-de-ia-el-salvador"

export const Route = createFileRoute("/en/consultoria-de-ia-el-salvador")(
  reuseSitePage(SiteRoute.options)
)
