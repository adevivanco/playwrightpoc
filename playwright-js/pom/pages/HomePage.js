const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

exports.HomePage = class HomePage extends BasePage {

  constructor(page) {
    super();
    this.page = page;
    this.firsHeaderLinkLocator =  page.locator('text=Workout Buddy');
    this.workoutButtonLocator = page.locator('div.home > form.create > button');
    this.workoutsSection = page.locator('div.pages > div.home > div.workouts');
    this.workoutsDetails  = page.locator('div.home > div.workouts > div.workout-details');
    this.logoutButton = page.locator("//button[text()='Log out']");
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

  async validateAtLeastOneWorkoutExists() {
    await expect(this.workoutsSection).toBeVisible();
    let count = await this.workoutsDetails.count();
    await expect(count).toBeGreaterThan(0);
  }

  async validateLogoutButton() {
    await expect(this.logoutButton).toBeVisible();
  }

  
}