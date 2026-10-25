import { defineConfig, devices } from "@playwright/test";

/**
 * Browser-level tests for the parts of the board jsdom cannot answer: does a
 * real click land on the tile a player sees, does the picture actually change,
 * does Enter activate a focused tile.
 *
 * These tests run against a production build, not the dev server. Set
 * E2E_BASE_URL to point them at a server you started yourself; otherwise this
 * builds and starts one on port 3210.
 *
 * IMPORTANT: `next build` and `next dev` share `.next`, so stop `npm run dev`
 * before running this suite.
 */
const PORT = 3210;
const BASE_URL = process.env.E2E_BASE_URL ?? `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : [["list"]],
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: `npm run build && npm run start -- -p ${PORT}`,
        url: BASE_URL,
        reuseExistingServer: false,
        timeout: 240_000,
      },
});
