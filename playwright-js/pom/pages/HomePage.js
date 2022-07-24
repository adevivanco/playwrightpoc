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

  async validateWorkouts() {
    await expect(this.workoutsSection).toBeVisible();
    await expect(this.workoutsDetails.count).toBeTruthy();
  }

  
}