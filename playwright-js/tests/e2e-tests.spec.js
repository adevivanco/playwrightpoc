const { test, expect, chromium } = require('@playwright/test');
const { HomePage } = require('../pom/pages/HomePage');


test.describe('end to end tests of workouts app', () => {

    let browser = null;
    let context = null;
    let page = null;
    let homePage = null;

    test.beforeEach(async() => {
        browser = await chromium.launch({ headless: true});
        context = await browser.newContext();
        page = await context.newPage();

        homePage = new HomePage(page);
        await homePage.goto();
    });

    test.afterAll(async() => {
        await context.close();
        await browser.close();
    });

    test('homepage has React App in title and Add Workout button', async ({ page }) => {
        await homePage.validatePageTitleEquals(/React App/);
        await homePage.validateCreateWorkoutExistance('Add Workout');
     });

        // assertions and locators
    test('homepage has header with Workout Buddy link', async ({ page }) => {
        await homePage.validateWorkoutBuddyHeaderLinkExistance();
    });
    
    test('homepage has correct URL', async ({ page }) => {
        await homePage.validateWorkoutBuddyHeaderLinkExistance();
    });
    

});


