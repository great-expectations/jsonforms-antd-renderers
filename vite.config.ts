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
      reporter: ["cobertura"],
      include: ["src/**/*"],
      exclude: ["**/*.stories.tsx", "src/common/StorybookAntDJsonForm.tsx"],
    },
    // globals: true // very happy about being able to turn globals off here!
  },
})
