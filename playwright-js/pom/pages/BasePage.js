const { expect } = require('@playwright/test');


exports.BasePage = class BasePage {

    constructor(page) {
        this.page = page;
    }

    async validatePageTitleEquals (title) {
        await expect(this.page).toHaveTitle(title); 
    }
}