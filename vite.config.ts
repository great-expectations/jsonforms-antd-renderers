/// <reference types="vitest" />
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["test-setup.ts"],
    coverage: {
      provider: "istanbul",
      reporter: process.env.GITHUB_ACTIONS
        ? ["cobertura"]
        : ["text", "html", "clover", "json"],
      reportsDirectory: "html/coverage",
      include: ["src/**/*"],
      exclude: ["**/*.stories.tsx", "src/common/StorybookAntDJsonForm.tsx"],
    },
    reporters: process.env.GITHUB_ACTIONS
      ? ["junit", "github-actions"]
      : ["default", "html"],
  },
})
