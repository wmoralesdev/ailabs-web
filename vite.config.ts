import { defineConfig } from "vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import { nitro } from "nitro/vite"
import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [devtools(), tailwindcss(), tanstackStart(), nitro(), viteReact()],
  // @resvg/resvg-js ships a native .node addon used only by the server-side
  // share-card renderer. Keep it out of the browser dependency optimizer, which
  // cannot parse a native binary as a module.
  optimizeDeps: { exclude: ["@resvg/resvg-js"] },
})

export default config
