const { test, expect } = require('@playwright/test');

// first test
test('homepage has React App in title and Add Workout button', async ({ page }) => {
    await page.goto('http://localhost:3000/');
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/React App/);
  
    // create a locator
    const workoutButtonLocator = page.locator('div.home > form.create > button');
  
    // Expect a locator to have text "to be strictly equal" to the value.
    await expect(workoutButtonLocator).toHaveText('Add Workout');
  
  });

  // assertions and locators
  test('homepage has header with Workout Buddy link', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // create a locator
    const firsHeaderLinkLocator = page.locator('text=Workout Buddy');

    // Expect an attribute "to be strictly equal" to the value.
    await expect(firsHeaderLinkLocator).toHaveAttribute('href', '');
  
  });
  
  // using test hooks
  test.describe("navigation", () => {
    test.beforeEach(async ({ page }) => {
      // Go to the starting url before each test.
      await page.goto("http://localhost:3000/");
    });
  
    test("main navigation", async ({ page }) => {
      // Assertions use the expect API.
      await expect(page).toHaveURL("http://localhost:3000/");
    });
  });