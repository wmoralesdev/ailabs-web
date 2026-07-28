/** True when the value parses as an http(s) URL with a non-empty host. */
export function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value.trim())
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      url.hostname.length > 0
    )
  } catch {
    return false
  }
}

/**
 * Coerce common pasted social values into a canonical http(s) URL.
 * Returns undefined for empty input or values that cannot be made into a URL.
 *
 * Accepts:
 * - full http(s) links
 * - scheme-less hosts (`instagram.com/user`, `www.linkedin.com/in/x`)
 * - @handles when `host` is provided (`@user` → `https://{host}/user`)
 */
export function toHttpUrl(
  value: string,
  options?: { host?: string }
): string | undefined {
  const trimmed = value.trim()
  if (!trimmed) {
    return undefined
  }

  const candidates: string[] = []

  if (/^https?:\/\//i.test(trimmed)) {
    candidates.push(trimmed)
  } else if (trimmed.startsWith("@") && options?.host) {
    const handle = trimmed.slice(1).replace(/^\/+/, "")
    if (handle) {
      candidates.push(`https://${options.host}/${handle}`)
    }
  } else if (/^[\w.-]+\.[a-z]{2,}\b/i.test(trimmed)) {
    candidates.push(`https://${trimmed}`)
  }

  for (const candidate of candidates) {
    if (isHttpUrl(candidate)) {
      try {
        return new URL(candidate).href
      } catch {
        return candidate
      }
    }
  }

  return undefined
}
