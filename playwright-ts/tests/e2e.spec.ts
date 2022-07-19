import { test, expect } from '@playwright/test';
import { PlaywrightDevPage } from './pages/PlaywrightDevPage';

test.describe('End-to-End Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto('https://playwright.dev/');
  });

  test('my e2e test', async ({ page }) => {
    
      // Expect a title "to contain" a substring.
      await expect(page).toHaveTitle(/Playwright/);
    
      // Expect an attribute "to be strictly equal" to the value.
      await expect(page.locator('text=Get Started').first()).toHaveAttribute('href', '/docs/intro');
    
      await page.click('text=Get Started');
      // Expect some text to be visible on the page.
      await expect(page.locator('text=Introduction').first()).toBeVisible();
    });

  test('getting started should contain table of contents (POM)', async ({ page }) => {
    const playwrightDev = new PlaywrightDevPage(page);
    await playwrightDev.getStarted();
    await expect(playwrightDev.tocList).toHaveText([
      'Installation',
      'First test',
      'Configuration file',
      'Writing assertions',
      'Using test fixtures',
      'Using test hooks',
      'VS Code extension',
      'Command line',
      'Configure NPM scripts',
      'Release notes'
    ]);
  });

  test('should show Page Object Model article', async ({ page }) => {
    const playwrightDev = new PlaywrightDevPage(page);
    await playwrightDev.pageObjectModel();
    await expect(page.locator('article')).toContainText('Page Object Model is a common pattern');
  });

});