const { test, expect } = require('@playwright/test');
const { MainPage } = require('../pom/pages/MainPage');

// first test

test.describe('end to end tests of workouts app', () => {
    test.beforeEach(async ({ page }) => {
        const mainPage = new MainPage(page);
        // Go to the starting url before each test.
        await mainPage.goto();
    });

    test('homepage has React App in title and Add Workout button', async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.validatePageTitleEquals(/React App/);
        await mainPage.validateCreateWorkoutExistance('Add Workout');
     });

        // assertions and locators
    test('homepage has header with Workout Buddy link', async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.validateWorkoutBuddyHeaderLinkExistance();
    });
    
    test('homepage has correct URL', async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.validateWorkoutBuddyHeaderLinkExistance();
    });
    

});


