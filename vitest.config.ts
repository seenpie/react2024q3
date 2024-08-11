import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  server: {
    open: true
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/__tests__/testSetup/testSetup.ts",
    coverage: {
      provider: "v8",
      exclude: [
        "**/.eslintrc.cjs",
        "vitest.config.ts",
        "next.config.mjs",
        ".next",
        "dist",
        "**/*.test.{js,jsx,ts,tsx}"
      ]
    },
    alias: {
      "@": resolve(__dirname, "src")
    }
  }
});
