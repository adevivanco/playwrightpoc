const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

exports.HomePage = class HomePage extends BasePage {

  constructor(page) {
    super();
    this.page = page;
    this.firsHeaderLinkLocator =  page.locator('text=Workout Buddy');
    this.workoutButtonLocator = page.locator('div.home > form.create > button');
  }

  async goto() {
    await this.page.goto('http://localhost:3000');
  }

  async validateWorkoutBuddyHeaderLinkExistance () {
    await expect(this.firsHeaderLinkLocator).toHaveAttribute('href', '');
  }

  async validateCreateWorkoutExistance(buttonName) {
    await expect(this.workoutButtonLocator).toHaveText(buttonName);
  }

  async validateUrlEqualsTo(url) {
    await expect(this.page).toHaveURL(url);
  }
  
}