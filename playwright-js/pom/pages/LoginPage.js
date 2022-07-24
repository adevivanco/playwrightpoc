const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

exports.LoginPage = class LoginPage extends BasePage {

    constructor(page) {
        super();
        this.page = page;
        this.firsHeaderLinkLocator =  page.locator('text=Workout Buddy');
        this.emailInputLocator = page.locator('div.pages > form.login > input[type=email]');
        this.passwordInputLocator = page.locator('div.pages > form.login > input[type=password]');
        this.loginButtonLocator = page.locator('div.pages > form.login > button');
    }

    async goto() {
        await this.page.goto('http://localhost:3000/login');
    }

    async enterEmail(email) {
        await expect(this.emailInputLocator).toBeEnabled();
        await this.emailInputLocator.fill(email);
    }

    async enterPassword(password) {
        await expect(this.passwordInputLocator).toBeEnabled();
        await this.passwordInputLocator.fill(password);
    }

    async clickLoginButton() {
        await expect(this.loginButtonLocator).toBeEnabled();
        await this.loginButtonLocator.click();
    }
    
}