import { createFileRoute } from "@tanstack/react-router"

import { MemberDirectory } from "@/components/aperture/member-directory"
import { MainCard } from "@/components/chrome/main-card"
import { Eyebrow } from "@/components/ui/eyebrow"
import { buildFaqJsonLd, buildPageMeta, SITE_NAME } from "@/lib/seo"
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
    const directory = content.aperture.directory
    const page = buildPageMeta({
      locale,
      path: "/aperture",
      title: `${directory.metaTitle} | ${SITE_NAME}`,
      description: directory.metaDescription,
    })
    return {
      ...page,
      scripts: [
        buildFaqJsonLd([
          { question: directory.headline, answer: directory.body },
        ]),
      ],
    }
  },
  component: DirectoryPage,
})

function DirectoryPage() {
  const { locale, content, members } = Route.useLoaderData()

  return (
    <MainCard>
      <div className="page-gutter section-y mx-auto flex w-full max-w-content flex-col gap-8">
        <Eyebrow>{content.aperture.directory.label}</Eyebrow>
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
