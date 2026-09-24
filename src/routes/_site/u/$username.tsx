import { createFileRoute, Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, UserSearch01Icon } from "@hugeicons/core-free-icons"

import { PublicProfileView } from "@/components/aperture/public-profile"
import { apertureShellClassName } from "@/components/aperture/aperture-styles"
import { MainCard } from "@/components/chrome/main-card"
import { homePillClassName } from "@/components/home/home-styles"
import {
  shareCardAlt,
  shareCardModel,
  shareCardPath,
} from "@/lib/aperture/share-card"
import { absoluteUrl, buildPageMeta } from "@/lib/seo"
import { cn } from "@/lib/utils"
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
    <MainCard textured={false}>
      <div className={apertureShellClassName}>
        {profile ? (
          <PublicProfileView
            profile={profile}
            join={content.aperture.join}
            me={content.aperture.me}
            content={copy}
            locale={locale}
          />
        ) : (
          <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 rounded-3xl border border-dashed border-border bg-card/60 px-6 py-16 text-center">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-muted text-foreground">
              <HugeiconsIcon icon={UserSearch01Icon} strokeWidth={2} />
            </span>
            <div className="flex max-w-md flex-col gap-2">
              <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                {copy.notFoundTitle}
              </h1>
              <p className="text-base text-muted-foreground md:text-lg">
                {copy.notFoundBody}
              </p>
            </div>
            <Link to="/aperture" className={cn(homePillClassName, "w-fit")}>
              {copy.backToDirectory}
              <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
            </Link>
          </div>
        )}
      </div>
    </MainCard>
  )
}
