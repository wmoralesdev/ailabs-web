import { Link, Outlet } from "@tanstack/react-router"

import { SiteFooter } from "@/components/chrome/site-footer"
import { SiteHeader } from "@/components/chrome/site-header"
import { MainCard } from "@/components/chrome/main-card"
import { BOOKING_PAGE_PATH } from "@/content/booking"
import { useLocaleContext } from "@/lib/locale-context"
import { homePath } from "@/lib/locale-links"
import { localizedPath } from "@/lib/locale-path"

const chromeShellClassName = "flex min-h-dvh flex-col"
// Main sits above the sticky footer so the footer is revealed as it scrolls away.
const mainClassName = "relative z-10 flex flex-1 flex-col bg-background"

function SiteLayout() {
  const { locale, content } = useLocaleContext()

  return (
    <div className={chromeShellClassName}>
      <SiteHeader
        locale={locale}
        chrome={content.chrome}
        microcopy={content.microcopy}
        showBrandLink
      />
      <main id="main" tabIndex={-1} className={mainClassName}>
        <Outlet />
      </main>
      <SiteFooter
        locale={locale}
        footer={content.chrome.footer}
        legalPublished={content.legal.status === "published"}
      />
    </div>
  )
}

function SiteNotFound() {
  const { locale, content } = useLocaleContext()
  const { microcopy } = content

  return (
    <MainCard>
      <section className="section-y page-gutter">
        <title>{content.meta.title}</title>
        <meta name="robots" content="noindex, nofollow" />
        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          {microcopy.notFoundTitle}
        </h1>
        <p className="mt-4 max-w-prose text-lg text-muted-foreground">
          {microcopy.notFoundBody}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link to={homePath(locale) as never} className="btn">
            {microcopy.notFoundCtaHome}
          </Link>
          <Link
            to={localizedPath(locale, BOOKING_PAGE_PATH) as never}
            className="text-action"
          >
            {microcopy.notFoundCtaBooking}
          </Link>
        </div>
      </section>
    </MainCard>
  )
}

export { SiteLayout, SiteNotFound }
