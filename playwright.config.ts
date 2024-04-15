import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: process.env.CI ? 2 : 2,
  reporter: [
    [
      'allure-playwright',
      {
        detail: true,
        outputFolder: 'allure-results',
        suiteTitle: true,
      },
    ],
    ['line'],
  ],
  use: {
    trace: 'off',
  },

  projects: [
    {
      name: 'Google Chrome',
      use: {
        viewport: { width: 1920, height: 1080 },
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
      },
    },
  ],
});
