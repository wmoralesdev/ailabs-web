export const PROJECT_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const

export type ProjectImageType = (typeof PROJECT_IMAGE_TYPES)[number]

export const PROJECT_IMAGE_MAX_BYTES = 2 * 1024 * 1024

const EXTENSIONS: Record<ProjectImageType, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
}

const KEY_PATTERN = /^projects\/(\d+)\/[a-z0-9]{8,}\.(jpg|png|webp)$/

export function isProjectImageType(value: string): value is ProjectImageType {
  return (PROJECT_IMAGE_TYPES as readonly string[]).includes(value)
}

export function extensionForImageType(type: ProjectImageType): string {
  return EXTENSIONS[type]
}

export function parseProjectImageKey(
  key: string
): { memberNumber: number } | null {
  const match = KEY_PATTERN.exec(key)
  if (!match?.[1]) {
    return null
  }
  return { memberNumber: Number(match[1]) }
}

export function isOwnedProjectImageKey(
  key: string,
  memberNumber: number
): boolean {
  const parsed = parseProjectImageKey(key)
  return parsed?.memberNumber === memberNumber
}

export function buildProjectImageKey(
  memberNumber: number,
  type: ProjectImageType,
  id: string
): string {
  return `projects/${memberNumber}/${id}.${extensionForImageType(type)}`
}

export function projectImageUrl(
  publicBase: string | null,
  key: string | null
): string | null {
  if (!publicBase || !key) {
    return null
  }
  return `${publicBase.replace(/\/$/, "")}/${key}`
}
