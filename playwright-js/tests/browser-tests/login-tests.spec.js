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
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
    })

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
        await loginPage.enterEmail(email);
        await loginPage.enterPassword(password);
        await loginPage.clickLoginButton();
        await loginPage.validateUrlEqualsTo('http://localhost:3000/')
     });
    
});


