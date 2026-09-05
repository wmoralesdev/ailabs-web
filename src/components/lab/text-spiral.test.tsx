import { act, cleanup, fireEvent, render } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { TextSpiral } from "./text-spiral"

const words = ["Practical AI", "Build together", "Learn by doing"]
const nativeGetAnimations = Object.getOwnPropertyDescriptor(
  Element.prototype,
  "getAnimations"
)
let width = 720
let height = 900
let reducedMotion = false
let visibility: DocumentVisibilityState = "visible"
let nextFrame = 0
const pendingFrames = new Map<number, FrameRequestCallback>()
const mediaListeners = new Set<EventListenerOrEventListenerObject>()
const canvasContexts = new Map<
  HTMLCanvasElement,
  ReturnType<typeof makeContext>
>()
const resizeObservers: MockResizeObserver[] = []
const intersectionObservers: MockIntersectionObserver[] = []

function makeContext() {
  return {
    font: "",
    textAlign: "center",
    textBaseline: "middle",
    fillStyle: "",
    globalAlpha: 1,
    measureText: vi.fn(function (this: { font: string }, text: string) {
      return { width: text.length * Number.parseFloat(this.font) * 0.6 }
    }),
    setTransform: vi.fn(),
    clearRect: vi.fn(),
    fillText: vi.fn(),
    drawImage: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    beginPath: vi.fn(),
    rect: vi.fn(),
    clip: vi.fn(),
  }
}

function bounds(stage = false): DOMRect {
  const scale = stage ? 1.4 : 1
  return {
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    right: width * scale,
    bottom: height * scale,
    width: width * scale,
    height: height * scale,
    toJSON: () => ({}),
  }
}

class MockResizeObserver {
  target: Element | undefined
  disconnect = vi.fn()

  constructor(private callback: ResizeObserverCallback) {
    resizeObservers.push(this)
  }

  observe(target: Element) {
    this.target = target
  }

  emit() {
    this.callback(
      [{ target: this.target, contentRect: bounds() } as ResizeObserverEntry],
      this as unknown as ResizeObserver
    )
  }
}

class MockIntersectionObserver {
  target: Element | undefined
  disconnect = vi.fn()

  constructor(private callback: IntersectionObserverCallback) {
    intersectionObservers.push(this)
  }

  observe(target: Element) {
    this.target = target
  }

  emit(isIntersecting: boolean) {
    this.callback(
      [{ target: this.target, isIntersecting } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver
    )
  }
}

function flushFrame() {
  act(() => {
    const callbacks = [...pendingFrames.values()]
    pendingFrames.clear()
    callbacks.forEach((callback) => callback(performance.now()))
  })
}

function finishAnimations(container: HTMLElement, prefix = "lab-ring-ripple") {
  act(() => {
    for (const element of container.querySelectorAll<HTMLDivElement>("div")) {
      const animationName = element.style.animationName
      if (!animationName.startsWith(prefix)) continue
      const event = new Event("animationend", { bubbles: true })
      Object.defineProperty(event, "animationName", {
        value: animationName,
      })
      element.dispatchEvent(event)
    }
  })
}

function glyphPaints() {
  return [...canvasContexts.values()].reduce(
    (sum, context) => sum + context.fillText.mock.calls.length,
    0
  )
}

function paintOperations() {
  return [...canvasContexts.values()].reduce(
    (sum, context) =>
      sum +
      context.clearRect.mock.calls.length +
      context.fillText.mock.calls.length +
      context.drawImage.mock.calls.length,
    0
  )
}

function canvases(container: HTMLElement) {
  return [...container.querySelectorAll("canvas")]
}

function expectSameCanvases(
  container: HTMLElement,
  expected: HTMLCanvasElement[]
) {
  const actual = canvases(container)
  expect(actual).toHaveLength(expected.length)
  actual.forEach((canvas, index) => expect(canvas).toBe(expected[index]))
}

beforeEach(() => {
  width = 720
  height = 900
  reducedMotion = false
  visibility = "visible"
  nextFrame = 0
  pendingFrames.clear()
  mediaListeners.clear()
  canvasContexts.clear()
  resizeObservers.length = 0
  intersectionObservers.length = 0
  vi.useFakeTimers()
  Object.defineProperty(Element.prototype, "getAnimations", {
    configurable: true,
    value: vi.fn(() => []),
  })

  let seed = 19
  vi.spyOn(Math, "random").mockImplementation(() => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  })
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
    function (this: HTMLElement) {
      return bounds(this.classList.contains("shrink-0"))
    }
  )
  vi.spyOn(document, "visibilityState", "get").mockImplementation(
    () => visibility
  )
  // JSDOM does not expand animation shorthand into its longhand properties.
  vi.spyOn(
    CSSStyleDeclaration.prototype,
    "animationName",
    "get"
  ).mockImplementation(function (this: CSSStyleDeclaration) {
    return (
      this.getPropertyValue("animation-name") || this.animation.split(" ")[0]
    )
  })
  vi.stubGlobal(
    "DOMMatrixReadOnly",
    class {
      // These lifecycle tests click settled rings, whose transform is identity.
      a = 1
      e = 0
      f = 0
    }
  )
  vi.stubGlobal("devicePixelRatio", 1)
  vi.stubGlobal("matchMedia", () => ({
    get matches() {
      return reducedMotion
    },
    addEventListener: (
      _type: string,
      listener: EventListenerOrEventListenerObject
    ) => mediaListeners.add(listener),
    removeEventListener: (
      _type: string,
      listener: EventListenerOrEventListenerObject
    ) => mediaListeners.delete(listener),
  }))
  vi.stubGlobal("ResizeObserver", MockResizeObserver)
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver)
  vi.stubGlobal(
    "requestAnimationFrame",
    vi.fn((callback: FrameRequestCallback) => {
      pendingFrames.set(++nextFrame, callback)
      return nextFrame
    })
  )
  vi.stubGlobal("cancelAnimationFrame", (id: number) =>
    pendingFrames.delete(id)
  )
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
    function (this: HTMLCanvasElement) {
      let context = canvasContexts.get(this)
      if (!context) {
        context = makeContext()
        canvasContexts.set(this, context)
      }
      return context as unknown as CanvasRenderingContext2D
    }
  )
})

afterEach(() => {
  cleanup()
  vi.useRealTimers()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  if (nativeGetAnimations) {
    Object.defineProperty(
      Element.prototype,
      "getAnimations",
      nativeGetAnimations
    )
  } else {
    Reflect.deleteProperty(Element.prototype, "getAnimations")
  }
})

describe("text spiral rendering and lifecycle", () => {
  it("preserves painted rings when ResizeObserver first reports unchanged dimensions", () => {
    const { container } = render(<TextSpiral words={words} />)
    flushFrame()
    const initial = canvases(container)
    const initialPaints = paintOperations()
    expect(initial.length).toBeGreaterThan(0)

    act(() => resizeObservers[0].emit())
    flushFrame()

    expectSameCanvases(container, initial)
    expect(paintOperations()).toBe(initialPaints)
  })

  it("coalesces a resize burst into one rebuild on the next animation frame", () => {
    const { container } = render(<TextSpiral words={words} />)
    flushFrame()
    const initial = canvases(container)
    const initialPaints = paintOperations()
    vi.mocked(requestAnimationFrame).mockClear()

    act(() => {
      width = 760
      resizeObservers[0].emit()
      width = 840
      resizeObservers[0].emit()
      height = 960
      resizeObservers[0].emit()
    })

    expectSameCanvases(container, initial)
    expect(paintOperations()).toBe(initialPaints)
    expect(requestAnimationFrame).toHaveBeenCalledTimes(1)

    flushFrame()
    expect(canvases(container)[0]).not.toBe(initial[0])
    expect(paintOperations()).toBeGreaterThan(initialPaints)
    const resized = canvases(container)
    const resizedPaints = paintOperations()
    act(() => resizeObservers[0].emit())
    flushFrame()
    expectSameCanvases(container, resized)
    expect(paintOperations()).toBe(resizedPaints)
  })

  it("keeps rings for an equivalent words array and rebuilds for changed content", () => {
    const { container, rerender } = render(<TextSpiral words={words} />)
    flushFrame()
    const initial = canvases(container)
    const initialPaints = paintOperations()

    rerender(<TextSpiral words={[...words]} />)
    flushFrame()
    expectSameCanvases(container, initial)
    expect(paintOperations()).toBe(initialPaints)

    rerender(<TextSpiral words={["Different words"]} />)
    flushFrame()
    expect(canvases(container)[0]).not.toBe(initial[0])
    expect(paintOperations()).toBeGreaterThan(initialPaints)
  })

  it("allocates fewer canvas pixels than the former full-stage layers", () => {
    const { container } = render(<TextSpiral words={words} />)
    flushFrame()
    const layers = canvases(container)
    const pixels = layers.reduce(
      (sum, canvas) => sum + canvas.width * canvas.height,
      0
    )
    // The existing 720×900 hero used 27 canvases, each covering a 140% stage.
    const formerPixels = 27 * 1008 * 1260
    expect(layers.length).toBeGreaterThan(0)
    expect(pixels).toBeGreaterThan(0)
    expect(pixels).toBeLessThan(formerPixels)
  })

  it("does not repaint outside the viewport and resumes flicker after returning", () => {
    const { container } = render(<TextSpiral words={words} />)
    flushFrame()
    finishAnimations(container)
    act(() => intersectionObservers[0].emit(false))
    const pausedPaints = paintOperations()

    act(() => vi.advanceTimersByTime(3000))
    flushFrame()
    expect(paintOperations()).toBe(pausedPaints)

    act(() => intersectionObservers[0].emit(true))
    act(() => vi.advanceTimersByTime(1040))
    flushFrame()
    expect(paintOperations()).toBeGreaterThan(pausedPaints)
  })

  it("repaints only a small part of the text on each flicker tick", () => {
    const { container } = render(<TextSpiral words={words} />)
    flushFrame()
    finishAnimations(container)
    const initialGlyphPaints = glyphPaints()

    act(() => vi.advanceTimersByTime(520))
    flushFrame()

    const flickerGlyphPaints = glyphPaints() - initialGlyphPaints
    expect(flickerGlyphPaints).toBeGreaterThan(0)
    expect(flickerGlyphPaints).toBeLessThan(initialGlyphPaints / 2)
  })

  it("does not repaint in a hidden tab", () => {
    const { container } = render(<TextSpiral words={words} />)
    flushFrame()
    finishAnimations(container)
    act(() => {
      visibility = "hidden"
      document.dispatchEvent(new Event("visibilitychange"))
    })
    const pausedPaints = paintOperations()
    act(() => vi.advanceTimersByTime(3000))
    flushFrame()
    expect(paintOperations()).toBe(pausedPaints)
  })

  it("waits for a paused click swell to finish before restarting flicker", () => {
    const { container } = render(<TextSpiral words={words} />)
    flushFrame()
    finishAnimations(container)
    const root = container.firstElementChild as HTMLDivElement
    fireEvent.click(root, { clientX: 360, clientY: 450 })
    const beforePause = paintOperations()

    act(() => {
      visibility = "hidden"
      document.dispatchEvent(new Event("visibilitychange"))
      vi.advanceTimersByTime(5000)
      visibility = "visible"
      document.dispatchEvent(new Event("visibilitychange"))
      vi.advanceTimersByTime(1040)
    })
    flushFrame()
    expect(paintOperations()).toBe(beforePause)

    finishAnimations(container, "lab-ring-swell-")
    act(() => vi.advanceTimersByTime(520))
    flushFrame()
    expect(paintOperations()).toBeGreaterThan(beforePause)
  })

  it("renders a static spiral with reduced motion and schedules no flicker", () => {
    reducedMotion = true
    const { container } = render(<TextSpiral words={words} />)
    flushFrame()
    const initialPaints = paintOperations()
    expect(initialPaints).toBeGreaterThan(0)
    expect(container.querySelector('[role="button"]')).toBeNull()

    act(() => vi.advanceTimersByTime(3000))
    flushFrame()
    expect(paintOperations()).toBe(initialPaints)
    expect(vi.getTimerCount()).toBe(0)
  })

  it("cleans observers, native listeners, flicker, hover timeout and pending resize on unmount", () => {
    const removeDocumentListener = vi.spyOn(document, "removeEventListener")
    const { container, unmount } = render(<TextSpiral words={words} />)
    flushFrame()
    finishAnimations(container)
    const root = container.firstElementChild as HTMLDivElement
    const removeRootListener = vi.spyOn(root, "removeEventListener")
    fireEvent.mouseEnter(root)
    act(() => {
      width = 800
      resizeObservers[0].emit()
    })
    expect(vi.getTimerCount()).toBeGreaterThan(0)
    expect(pendingFrames.size).toBeGreaterThan(0)

    unmount()

    expect(resizeObservers[0].disconnect).toHaveBeenCalledOnce()
    expect(intersectionObservers[0].disconnect).toHaveBeenCalledOnce()
    expect(removeDocumentListener).toHaveBeenCalledWith(
      "visibilitychange",
      expect.any(Function)
    )
    expect(removeRootListener).toHaveBeenCalledWith(
      "click",
      expect.any(Function)
    )
    expect(removeRootListener).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function)
    )
    expect(mediaListeners.size).toBe(0)
    expect(vi.getTimerCount()).toBe(0)
    expect(pendingFrames.size).toBe(0)
  })
})
