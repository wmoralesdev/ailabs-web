import { createFileRoute } from "@tanstack/react-router"

import { MemberDirectory } from "@/components/aperture/member-directory"
import { apertureShellClassName } from "@/components/aperture/aperture-styles"
import { MainCard } from "@/components/chrome/main-card"
import { buildPageMeta } from "@/lib/seo"
import { listApertureMembers } from "@/server/aperture/public"

export const Route = createFileRoute("/_site/aperture/")({
  loader: async ({ context }) => ({
    ...context,
    members: await listApertureMembers(),
  }),
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }
    const { locale, content } = loaderData
    return buildPageMeta({
      locale,
      path: "/aperture",
      title: `${content.aperture.directory.metaTitle} | ${content.meta.title}`,
      description: content.aperture.directory.metaDescription,
    })
  },
  component: DirectoryPage,
})

function DirectoryPage() {
  const { locale, content, members } = Route.useLoaderData()

  return (
    <MainCard>
      <div className={apertureShellClassName}>
        <MemberDirectory
          members={members}
          join={content.aperture.join}
          content={content.aperture.directory}
          locale={locale}
        />
      </div>
    </MainCard>
  )
}
