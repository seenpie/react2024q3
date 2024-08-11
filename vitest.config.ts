import { vitePlugin as remix } from "@remix-run/dev";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  server: {
    open: true
  },
  plugins: [
    !process.env.VITEST
      ? remix({
          appDirectory: "./src/app"
        })
      : react()
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/__tests__/testSetup/testSetup.ts",
    coverage: {
      provider: "v8",
      exclude: [
        "**/.eslintrc.cjs",
        "vite.config.ts",
        "vitest.config.ts",
        "dist",
        "./src/app/entry.client.tsx",
        "./src/app/entry.server.tsx",
        "./src/app/vite-env.d.ts"
      ]
    }
  }
});
