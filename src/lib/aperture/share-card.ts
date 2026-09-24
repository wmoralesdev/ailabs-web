import { formatMemberNumber } from "@/lib/aperture/member-number"

export const SHARE_CARD_WIDTH = 1200
export const SHARE_CARD_HEIGHT = 630

export type ShareCardModel = {
  number: string
  displayName: string
  headline: string
  username: string
}

export function shareCardPath(username: string): string {
  return `/api/og/u/${username}`
}

export function shareCardModel(profile: {
  number: number
  displayName: string
  headline: string
  username: string
}): ShareCardModel {
  return {
    number: formatMemberNumber(profile.number),
    displayName: profile.displayName,
    headline: profile.headline,
    username: profile.username,
  }
}

export function shareCardAlt(template: string, model: ShareCardModel): string {
  return template
    .replace("{name}", model.displayName)
    .replace("{number}", model.number)
}
