import { prisma } from "@/lib/prisma"
import { verifyWompiWebhookHash } from "@/server/wompi"
import type { WompiWebhookPayload } from "@/server/wompi"

/**
 * Server-only Wompi webhook applicator. Kept out of createServerFn modules so
 * Prisma/node crypto never leak into the client route graph.
 */
export async function applyWompiWebhook(
  rawBody: string,
  headerHash: string | null
): Promise<{ ok: boolean; status: number }> {
  if (!verifyWompiWebhookHash(rawBody, headerHash)) {
    return { ok: false, status: 401 }
  }

  let payload: WompiWebhookPayload
  try {
    payload = JSON.parse(rawBody) as WompiWebhookPayload
  } catch {
    return { ok: false, status: 400 }
  }

  const commerceLinkId = payload.EnlacePago?.IdentificadorEnlaceComercio
  if (!commerceLinkId) {
    return { ok: false, status: 400 }
  }

  const registration = await prisma.workshopRegistration.findUnique({
    where: { commerceLinkId },
  })
  if (!registration) {
    return { ok: false, status: 404 }
  }

  const approved =
    payload.ResultadoTransaccion === "ExitosaAprobada" ||
    payload.ResultadoTransaccion === "Exitosa"

  if (!approved) {
    await prisma.workshopRegistration.update({
      where: { id: registration.id },
      data: { status: "FAILED" },
    })
    return { ok: true, status: 200 }
  }

  if (registration.status === "PAID") {
    return { ok: true, status: 200 }
  }

  await prisma.workshopRegistration.update({
    where: { id: registration.id },
    data: {
      status: "PAID",
      paidAt: new Date(),
      wompiTransactionId:
        payload.IdTransaccion ?? registration.wompiTransactionId,
      wompiAuthorizationCode:
        payload.CodigoAutorizacion ?? registration.wompiAuthorizationCode,
      wompiEnlaceId: payload.EnlacePago?.Id ?? registration.wompiEnlaceId,
    },
  })

  return { ok: true, status: 200 }
}
