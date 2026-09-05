import "@tanstack/react-start/server-only"

import { createHmac, timingSafeEqual } from "node:crypto"

const WOMPI_TOKEN_URL = "https://id.wompi.sv/connect/token"
const WOMPI_API_URL = "https://api.wompi.sv"

type WompiTokenResponse = {
  access_token: string
  expires_in: number
  token_type: string
}

type WompiEnlacePagoResponse = {
  idEnlace: number
  urlQrCodeEnlace: string
  urlEnlace: string
  estaProductivo: boolean
}

export type CreatePaymentLinkInput = {
  commerceLinkId: string
  amount: number
  productName: string
  productDescription: string
  redirectUrl: string
  returnUrl: string
  webhookUrl: string
  notificationEmail?: string
}

let cachedToken: { accessToken: string; expiresAtMs: number } | null = null

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`${name} is not set`)
  }
  return value
}

function getWompiCredentials() {
  return {
    clientId: requireEnv("WOMPI_CLIENT_ID"),
    clientSecret: requireEnv("WOMPI_CLIENT_SECRET"),
  }
}

export function hmacSha256Hex(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload, "utf8").digest("hex")
}

export function safeEqualHex(a: string, b: string): boolean {
  const left = Buffer.from(a, "utf8")
  const right = Buffer.from(b, "utf8")
  if (left.length !== right.length) {
    return false
  }
  return timingSafeEqual(left, right)
}

export function verifyWompiWebhookHash(
  rawBody: string,
  headerHash: string | null
): boolean {
  if (!headerHash) {
    return false
  }
  const clientSecret = process.env.WOMPI_CLIENT_SECRET
  if (!clientSecret) {
    return false
  }
  const expected = hmacSha256Hex(rawBody, clientSecret)
  return safeEqualHex(expected.toLowerCase(), headerHash.toLowerCase())
}

/** Enlace de pago redirect hash: identificadorEnlaceComercio + idTransaccion + idEnlace + monto */
export function verifyPaymentLinkRedirectHash(input: {
  commerceLinkId: string
  transactionId: string
  enlaceId: string
  amount: string
  hash: string
}): boolean {
  const clientSecret = process.env.WOMPI_CLIENT_SECRET
  if (!clientSecret) {
    return false
  }
  const payload =
    input.commerceLinkId + input.transactionId + input.enlaceId + input.amount
  const expected = hmacSha256Hex(payload, clientSecret)
  return safeEqualHex(expected.toLowerCase(), input.hash.toLowerCase())
}

async function getAccessToken(): Promise<string> {
  const now = Date.now()
  if (cachedToken && cachedToken.expiresAtMs > now + 30_000) {
    return cachedToken.accessToken
  }

  const { clientId, clientSecret } = getWompiCredentials()
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
    audience: "wompi_api",
  })

  const response = await fetch(WOMPI_TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Wompi token error (${response.status}): ${text}`)
  }

  const json = (await response.json()) as WompiTokenResponse
  cachedToken = {
    accessToken: json.access_token,
    expiresAtMs: now + json.expires_in * 1000,
  }
  return json.access_token
}

export async function createWompiPaymentLink(
  input: CreatePaymentLinkInput
): Promise<WompiEnlacePagoResponse> {
  const token = await getAccessToken()
  const notificationEmail =
    input.notificationEmail ?? process.env.WOMPI_NOTIFICATION_EMAIL ?? ""

  const payload = {
    identificadorEnlaceComercio: input.commerceLinkId,
    monto: input.amount,
    nombreProducto: input.productName,
    infoProducto: {
      descripcionProducto: input.productDescription,
    },
    configuracion: {
      urlRedirect: input.redirectUrl,
      urlRetorno: input.returnUrl,
      esMontoEditable: false,
      esCantidadEditable: false,
      cantidadPorDefecto: 1,
      urlWebhook: input.webhookUrl,
      emailsNotificacion: notificationEmail || undefined,
      notificarTransaccionCliente: true,
    },
    limitesDeUso: {
      cantidadMaximaPagosExitosos: 1,
    },
  }

  const response = await fetch(`${WOMPI_API_URL}/EnlacePago`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Wompi EnlacePago error (${response.status}): ${text}`)
  }

  return (await response.json()) as WompiEnlacePagoResponse
}

export type WompiWebhookPayload = {
  IdTransaccion?: string
  ResultadoTransaccion?: string
  CodigoAutorizacion?: string
  Monto?: number
  EnlacePago?: {
    Id?: number
    IdentificadorEnlaceComercio?: string
    NombreProducto?: string
  }
  cliente?: {
    Nombre?: string
    Email?: string
  }
}
