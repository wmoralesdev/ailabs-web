import { defineConfig } from "vitest/config"

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    environment: "node",
    include: ["**/*.db.test.ts"],
    exclude: ["**/node_modules/**"],
    watch: false,
    fileParallelism: false,
    testTimeout: 30000,
  },
})
