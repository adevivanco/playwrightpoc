const { test, expect, chromium } = require('@playwright/test');
const { HomePage } = require('../pom/pages/HomePage');
const { LoginPage } = require('../pom/pages/LoginPage');


test.describe('end to end tests of workouts app', () => {

    let browser = null;
    let context = null;
    let page = null;
    let homePage = null;
    let loginPage = null

    test.beforeEach(async() => {
        browser = await chromium.launch({ headless: true});
        context = await browser.newContext();
        page = await context.newPage();

        homePage = new HomePage(page);
        loginPage = new LoginPage(page);

    });

    test.afterAll(async() => {
        await context.close();
        await browser.close();
    });


    test('User is redirected to login page on empty session (context)', async ({ page }) => {
        await homePage.goto();
        await loginPage.validateUrlEqualsTo("http://localhost:3000/login")
     });

     test('User logs in and is redirected to homepage', async ({ page }) => {
        await loginPage.goto();
        await loginPage.enterEmail("andresdev@gmail.com");
        await loginPage.enterPassword("Test@1234");
        await loginPage.clickLoginButton();
        await homePage.validateUrlEqualsTo('http://localhost:3000/')
        await homePage.validateCreateWorkoutExistance('Add Workout');
     });
    

     test('User logs in and sees homepage with existing workouts created before login in', async ({ page }) => {
        await loginPage.goto();
        await loginPage.enterEmail("andresdev@gmail.com");
        await loginPage.enterPassword("Test@1234");
        await loginPage.clickLoginButton();
        await homePage.validateWorkouts();
     });

});


