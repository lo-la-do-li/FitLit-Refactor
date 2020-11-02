import Action from './Action';

class Activity extends Action {
  constructor(data, userRepository) {
    super(data);
    this.steps = data.numSteps;
    this.minutesActive = data.minutesActive;
    this.flightsOfStairs = data.flightsOfStairs;
    this.milesWalked = 0;
    this.reachedStepGoal = null;
    this.doActivity(userRepository);
  }

  doActivity(userRepository) {
    const chosenUser = this.returnChosenUser(userRepository);
    chosenUser.updateActivities(this);
  }

  calculateMiles(userRepository) {
    const walkingUser = this.returnChosenUser(userRepository);
    return Math.round(this.steps * walkingUser.strideLength / 5280).toFixed(1);
  }

  compareStepGoal(userRepository) {
    let userStepGoal = this.returnChosenUser(userRepository).dailyStepGoal;
    this.reachedStepGoal = this.steps >= userStepGoal;
  }
}

export default Activity;
