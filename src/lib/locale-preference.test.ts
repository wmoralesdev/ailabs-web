import { afterEach, describe, expect, it, vi } from "vitest"

const serverResolve = vi.hoisted(() => vi.fn())

vi.mock("@tanstack/react-start", () => {
  const builder = {
    validator: () => builder,
    handler: (fn: () => unknown) =>
      fn.length === 0 ? serverResolve : vi.fn(),
  }
  return { createServerFn: () => builder }
})

vi.mock("@tanstack/react-start/server", () => ({
  getCookie: vi.fn(),
  getRequestHeader: vi.fn(),
  setCookie: vi.fn(),
}))

import { getContent } from "@/content"
import { LOCALE_COOKIE, loadLocaleContext } from "./locale-preference"

function clearLocaleCookie() {
  document.cookie = `${LOCALE_COOKIE}=; Max-Age=0; Path=/`
}

describe("loadLocaleContext", () => {
  afterEach(() => {
    clearLocaleCookie()
    serverResolve.mockReset()
  })

  it("resolves from the browser cookie without calling the server", async () => {
    document.cookie = `${LOCALE_COOKIE}=en; Path=/`

    await expect(loadLocaleContext()).resolves.toEqual({
      locale: "en",
      content: getContent("en"),
    })
    expect(serverResolve).not.toHaveBeenCalled()
  })

  it("asks the server when the cookie is missing or invalid", async () => {
    const fromServer = { locale: "es", content: getContent("es") }
    serverResolve.mockResolvedValue(fromServer)

    await expect(loadLocaleContext()).resolves.toBe(fromServer)

    document.cookie = `${LOCALE_COOKIE}=fr; Path=/`
    await expect(loadLocaleContext()).resolves.toBe(fromServer)
    expect(serverResolve).toHaveBeenCalledTimes(2)
  })
})
