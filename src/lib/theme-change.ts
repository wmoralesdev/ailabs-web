/**
 * Calls `fn` whenever the resolved theme flips. ThemeProvider toggles the
 * `light` / `dark` class on <html>, so canvases that read their ink from CSS
 * can repaint.
 */
export function onThemeChange(fn: () => void): () => void {
  const root = document.documentElement
  let dark = root.classList.contains("dark")
  const observer = new MutationObserver(() => {
    const next = root.classList.contains("dark")
    if (next === dark) return
    dark = next
    fn()
  })
  observer.observe(root, { attributes: true, attributeFilter: ["class"] })
  return () => observer.disconnect()
}
