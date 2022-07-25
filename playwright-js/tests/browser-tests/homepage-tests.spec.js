const { test, page, expect,  chromium} = require('@playwright/test');
const { HomePage } = require('../../pom/pages/HomePage');
const { LoginPage } = require('../../pom/pages/LoginPage');

test.describe('end to end tests of workouts app', () => {
    const email = 'andresdev@gmail.com';
    const password = 'Test@1234';
    let browser = null;
    let context = null;
    let page = null;
    let homePage = null;
    let loginPage = null

    test.beforeAll(async() => {
        browser = await chromium.launch({ headless: true});
        context = await browser.newContext();
        page = await context.newPage();
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.enterEmail(email);
        await loginPage.enterPassword(password);
        await loginPage.clickLoginButton();
        
        await context.storageState({ path: 'workouts-storage.json' });
    })

    test.afterAll(async() => {
        await context.close();
        await browser.close();
    });

    // validate main page (the user doesn't need to login since the storage state is saved)
     test('User goes to homepage with existing workouts created before', async ({ page }) => {
        await homePage.validateAtLeastOneWorkoutExists();
        await homePage.validateWorkoutBuddyHeaderLinkExistance();

     });

    // validate log out button (the user doesn't need to login since the storage state is saved
    test('User goes to homepage and validate log out button existence', async ({ page }) => {
        await homePage.validateAtLeastOneWorkoutExists();
        await homePage.validateLogoutButton();
    });
  
});


