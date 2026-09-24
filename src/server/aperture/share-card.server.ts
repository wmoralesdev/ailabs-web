import { prisma } from "@/lib/prisma"
import { shareCardModel } from "@/lib/aperture/share-card"
import { loadPublicProfile } from "@/server/aperture/public-profile"
import { renderShareCardPng } from "@/server/aperture/share-card"

export async function shareCardResponse(username: string): Promise<Response> {
  const profile = await loadPublicProfile(prisma, username)
  if (!profile) {
    return new Response("Not found", { status: 404 })
  }
  const png = await renderShareCardPng(shareCardModel(profile))
  return new Response(Buffer.from(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
