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
      },
    },
  ],
});
