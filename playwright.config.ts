import { defineConfig, devices } from "@playwright/test";

/**
 * Visual / structural check harness for the portfolio.
 * Run: `npm run test:visual` (auto-starts the dev server if one isn't running).
 * Screenshots land in `test-results/`; the HTML report in `playwright-report/`.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
