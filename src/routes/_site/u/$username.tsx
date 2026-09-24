import { createFileRoute } from "@tanstack/react-router"

import { PublicProfileView } from "@/components/aperture/public-profile"
import { MainCard } from "@/components/chrome/main-card"
import {
  shareCardAlt,
  shareCardModel,
  shareCardPath,
} from "@/lib/aperture/share-card"
import { absoluteUrl, buildPageMeta } from "@/lib/seo"
import { getPublicProfile } from "@/server/aperture/public"

export const Route = createFileRoute("/_site/u/$username")({
  loader: async ({ context, params }) => ({
    ...context,
    profile: await getPublicProfile({ data: { username: params.username } }),
    username: params.username,
  }),
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }
    const { locale, content, profile } = loaderData
    const copy = content.aperture.profile
    if (!profile) {
      return buildPageMeta({
        locale,
        path: `/u/${loaderData.username}`,
        title: `${copy.notFoundTitle} | ${content.meta.title}`,
        description: copy.notFoundBody,
        noindex: true,
      })
    }
    const card = shareCardModel(profile)
    return buildPageMeta({
      locale,
      path: `/u/${profile.username}`,
      title: `${copy.metaTitleNamed.replace("{name}", profile.displayName)} | ${content.meta.title}`,
      description: copy.metaDescriptionNamed
        .replace("{name}", profile.displayName)
        .replace("{headline}", profile.headline),
      image: {
        url: absoluteUrl(shareCardPath(profile.username)),
        alt: shareCardAlt(copy.shareCardAlt, card),
      },
    })
  },
  component: PublicProfilePage,
})

function PublicProfilePage() {
  const { locale, content, profile } = Route.useLoaderData()
  const copy = content.aperture.profile

  return (
    <MainCard>
      <div className="page-gutter section-y mx-auto w-full max-w-content">
        {profile ? (
          <PublicProfileView
            profile={profile}
            join={content.aperture.join}
            me={content.aperture.me}
            content={copy}
            locale={locale}
          />
        ) : (
          <div className="flex max-w-prose flex-col gap-3">
            <h1 className="font-display text-4xl font-semibold tracking-tight">
              {copy.notFoundTitle}
            </h1>
            <p className="text-lg text-muted-foreground">{copy.notFoundBody}</p>
          </div>
        )}
      </div>
    </MainCard>
  )
}
