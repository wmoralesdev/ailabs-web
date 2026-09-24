import { AwsClient } from "aws4fetch"

import {
  buildProjectImageKey,
  isProjectImageType,
  PROJECT_IMAGE_MAX_BYTES,
  projectImageUrl,
} from "@/lib/aperture/project-image"
import type { ProjectImageType } from "@/lib/aperture/project-image"

export type R2Config = {
  accountId: string
  accessKeyId: string
  secretAccessKey: string
  bucket: string
  publicBase: string
}

export function readR2Config(
  env: NodeJS.ProcessEnv = process.env
): R2Config | null {
  const accountId = env.R2_ACCOUNT_ID
  const accessKeyId = env.R2_ACCESS_KEY_ID
  const secretAccessKey = env.R2_SECRET_ACCESS_KEY
  const bucket = env.R2_BUCKET_NAME
  const publicBase = env.R2_PUBLIC_BASE_URL
  if (
    !accountId ||
    !accessKeyId ||
    !secretAccessKey ||
    !bucket ||
    !publicBase
  ) {
    return null
  }
  return { accountId, accessKeyId, secretAccessKey, bucket, publicBase }
}

export function publicProjectImageUrl(key: string | null): string | null {
  return projectImageUrl(readR2Config()?.publicBase ?? null, key)
}

function objectUrl(config: R2Config, key: string): string {
  return `https://${config.bucket}.${config.accountId}.r2.cloudflarestorage.com/${key}`
}

function clientOf(config: R2Config): AwsClient {
  return new AwsClient({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    service: "s3",
    region: "auto",
  })
}

export async function presignProjectImagePut(
  memberNumber: number,
  contentType: string,
  byteLength: number,
  id: string
): Promise<
  | { status: "ok"; uploadUrl: string; key: string; publicUrl: string }
  | { status: "unavailable" }
  | { status: "invalid" }
> {
  const config = readR2Config()
  if (!config) {
    return { status: "unavailable" }
  }
  if (
    !isProjectImageType(contentType) ||
    !Number.isInteger(byteLength) ||
    byteLength < 1 ||
    byteLength > PROJECT_IMAGE_MAX_BYTES
  ) {
    return { status: "invalid" }
  }
  const key = buildProjectImageKey(memberNumber, contentType, id)
  const signed = await clientOf(config).sign(
    new Request(objectUrl(config, key), {
      method: "PUT",
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(byteLength),
      },
    }),
    { aws: { signQuery: true } }
  )
  return {
    status: "ok",
    uploadUrl: signed.url,
    key,
    publicUrl: projectImageUrl(config.publicBase, key) ?? "",
  }
}

export async function deleteProjectImage(key: string | null): Promise<void> {
  const config = readR2Config()
  if (!config || !key) {
    return
  }
  const signed = await clientOf(config).sign(
    new Request(objectUrl(config, key), { method: "DELETE" }),
    { aws: { signQuery: true } }
  )
  await fetch(signed.url, { method: "DELETE" })
}

export type { ProjectImageType }
