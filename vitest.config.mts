import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

/**
 * Unit-level tests only. The browser-level ones live in ./e2e and run under
 * Playwright, because jsdom has no layout and no real pointer — it cannot tell
 * you whether a click reached a tile, only whether a handler ran.
 */
export default defineConfig({
  // `jsx: "preserve"` in tsconfig.json is what Next needs, but Vitest has to
  // compile the JSX itself. Automatic runtime has to be stated explicitly, or
  // the transform falls back to classic and every test dies on "React is not
  // defined".
  plugins: [react({ jsxRuntime: "automatic" })],
  esbuild: { jsx: "automatic", jsxImportSource: "react" },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["./src/test/setup.ts"],
    restoreMocks: true,
  },
});
