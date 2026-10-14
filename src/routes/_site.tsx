import {
  Link,
  Outlet,
  createFileRoute,
  useRouterState,
} from "@tanstack/react-router"

import { SiteFooter } from "@/components/chrome/site-footer"
import { SiteHeader } from "@/components/chrome/site-header"
import { ContactProvider } from "@/components/contact/contact-provider"
import { MainCard } from "@/components/chrome/main-card"

const chromeShellClassName = "flex min-h-dvh flex-col"
const mainClassName = "flex flex-1 flex-col"

export const Route = createFileRoute("/_site")({
  component: SiteLayout,
  notFoundComponent: SiteNotFound,
})

function pageOwnsBrand(routeId: string): boolean {
  return (
    routeId === "/_site/" ||
    routeId === "/_site/redeem" ||
    routeId === "/_site/community" ||
    routeId === "/_site/campus-leader" ||
    routeId === "/_site/aperture/join" ||
    routeId === "/_site/lab" ||
    routeId.startsWith("/_site/events")
  )
}

function SiteLayout() {
  const { locale, content } = Route.useRouteContext()
  const showBrandLink = useRouterState({
    select: (state) =>
      !state.matches.some((match) => pageOwnsBrand(match.routeId)),
  })
  const hideChromeFooter = useRouterState({
    select: (state) =>
      state.matches.some((match) => match.routeId === "/_site/lab"),
  })

  return (
    <ContactProvider contact={content.home.contact} locale={locale}>
      <div className={chromeShellClassName}>
        <SiteHeader
          locale={locale}
          chrome={content.chrome}
          microcopy={content.microcopy}
          showBrandLink={showBrandLink}
        />
        <main id="main" tabIndex={-1} className={mainClassName}>
          <Outlet />
        </main>
        {hideChromeFooter ? null : (
          <SiteFooter
            locale={locale}
            footer={content.chrome.footer}
            legalPublished={content.legal.status === "published"}
          />
        )}
      </div>
    </ContactProvider>
  )
}

function SiteNotFound() {
  const { content } = Route.useRouteContext()
  const { microcopy } = content

  return (
    <MainCard>
      <section className="section-y page-gutter">
        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          {microcopy.notFoundTitle}
        </h1>
        <p className="mt-4 max-w-prose text-lg text-muted-foreground">
          {microcopy.notFoundBody}
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex h-11 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:brightness-95 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          {microcopy.notFoundCtaHome}
        </Link>
      </section>
    </MainCard>
  )
}
