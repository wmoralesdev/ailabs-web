import { defineConfig } from "vitest/config"
import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [tailwindcss(), viteReact()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    // Avoid Vite FS watchers that hit EMFILE under the full app plugin graph.
    watch: false,
    fileParallelism: false,
    exclude: [
      "**/node_modules/**",
      "**/e2e/**",
      "**/*.spec.ts",
      "**/*.db.test.ts",
    ],
  },
})
