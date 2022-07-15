import type { PlaywrightTestConfig } from '@playwright/test';
const config: PlaywrightTestConfig = {
  testDir: '../tests-examples',
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
  },
};
export default config;