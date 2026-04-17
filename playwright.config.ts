import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  retries: 1,
  workers: 5,
  reporter: "html",
  use: {
    trace: "on-first-retry",
    browserName: "chromium",
    headless: true,
    screenshot: "only-on-failure",
  },
});
