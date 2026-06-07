import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  retries: 1,
  reporter: "html",
  projects: [
    {
      name: "e2e",
      testMatch: /.*(?<!\.api)\.spec\.ts/,      
      use: {
        browserName: "chromium",
        headless: true,
        baseURL: "http://37.27.17.198:8084",
        screenshot: "only-on-failure",
        trace: "on-first-retry",
      },
    },
    {
      name: "api",
      testMatch: "**/*.api.spec.ts",
      use: {
        baseURL: "https://jsonplaceholder.typicode.com",
      },
    },
  ],
  workers: 5,
});