import { HomeHero } from "@/components/home/home-hero"
import type { Locale, SiteContent } from "@/content"

type LabHeroProps = {
  locale: Locale
  content: SiteContent
}

/** Lab preview of the landing spiral hero (hash CTAs point at home). */
function LabHero({ locale, content }: LabHeroProps) {
  return <HomeHero locale={locale} content={content} samePageCtas={false} />
}

export { LabHero }
