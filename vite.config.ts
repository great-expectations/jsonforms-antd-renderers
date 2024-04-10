/// <reference types="vitest" />
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["test-setup.ts"],
    globalSetup: "test-global.ts",
    // globals: true // very happy about being able to turn globals off here!
  },
})
