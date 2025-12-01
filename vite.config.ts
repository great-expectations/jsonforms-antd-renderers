/// <reference types="vitest" />
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// TODO: Fix TypeScript version compatibility with ESLint
// @ts-expect-error ignore -- TypeScript version compatibility issue
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { env } = process

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./test-setup.ts"],
    coverage: {
      provider: "istanbul",
      // @ts-expect-error ignore -- TypeScript version compatibility issue
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      reporter: process.env.GITHUB_ACTIONS
        ? ["cobertura"]
        : ["text", "html", "clover", "json"],
      reportsDirectory: "html/coverage",
      include: ["src/**/*"],
      exclude: ["**/*.stories.tsx", "src/common/StorybookAntDJsonForm.tsx"],
    },
    // @ts-expect-error ignore -- TypeScript version compatibility issue
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    reporters: process.env.GITHUB_ACTIONS
      ? ["github-actions", "verbose"]
      : ["default", "html"],
  },
  build: {
    sourcemap: true,
  },
  // TODO: Fix TypeScript version compatibility with ESLint
  define: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    "process.env": env,
  },
})
