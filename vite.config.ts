/// <reference types="vitest" />

import { defineConfig } from "vite";
import { vitePlugin as remix } from "@remix-run/dev";

export default defineConfig({
  plugins: [remix({ appDirectory: "./src/app" })],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
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
    }
  }
});
