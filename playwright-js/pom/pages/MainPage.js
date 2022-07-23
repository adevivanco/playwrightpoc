const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

exports.MainPage = class MainPage extends BasePage {

  constructor(page) {
    super();
   this.page = page;
    this.firsHeaderLinkLocator =  page.locator('text=Workout Buddy');
    this.workoutButtonLocator = page.locator('div.home > form.create > button');
  }

  async validateWorkoutBuddyHeaderLinkExistance () {
    await expect(this.firsHeaderLinkLocator).toHaveAttribute('href', '');
  }

  async validateCreateWorkoutExistance (buttonName) {
    // Expect a locator to have text "to be strictly equal" to the value.
    await expect(this.workoutButtonLocator).toHaveText(buttonName);
  }

  async goto() {
    await this.page.goto('http://localhost:3000');
  }

  
}