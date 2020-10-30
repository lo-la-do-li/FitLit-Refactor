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

  // updateActivities(activity) {
  //   this.updateRecord(activity, 'activityRecord')
  //   if (activity.numSteps >= this.dailyStepGoal) {
  //     this.accomplishedDays.unshift(activity.date);
  //   }
  // }

  // findClimbingRecord() {
  //   this.sortRecord('activityRecord', 'flightsOfStairs');
  //   return this.activityRecord[0].flightsOfStairs;
  // }

  // calculateDailyCalories(date) {
  //  let fitDate = this.activityRecord.filter(activity => activity.date === date)
  //  const totalMinutes = fitDate.reduce((sumMinutes, activity) => {
  //    return sumMinutes += activity.minutesActive
  //  }, 0);
  //  return Math.round(totalMinutes * 7.6);
  // }

  // calculateAverageMinutesActiveThisWeek(todayDate) {
  //  return this.calculateAverageValueByWeek(todayDate, this.activityRecord, 'minutesActive', 0);
  // }
  // calculateAverageStepsThisWeek(todayDate) {
  //  return this.calculateAverageValueByWeek(todayDate, this.activityRecord, 'steps', 0);
  // }
  // calculateAverageFlightsThisWeek(todayDate) {
  //  return this.calculateAverageValueByWeek(todayDate, this.activityRecord, 'flightsOfStairs', 1);
  // }

  // findTrendingStepDays() {
  //   this.findRecord('trendingStepDays', 'steps', 'step');
  // }

  // findTrendingStairsDays() {
  //   this.findRecord('trendingStairsDays', 'flightsOfStairs', 'climbing');
  // }

  // calculateTotalStepsThisWeek(todayDate) {
  //   const totalSteps = this.calculateTotalNum(todayDate, this.activityRecord, 'steps');
  //   return this.totalStepsThisWeek = totalSteps;
  // }

  // findFriendsTotalStepsForWeek(users, date) {
  //   this.friends.map(friend => {
  //     let matchedFriend = users.find(user => user.id === friend);
  //     matchedFriend.calculateTotalStepsThisWeek(date);
  //     this.friendsActivityRecords.push(
  //       {
  //         'id': matchedFriend.id,
  //         'firstName': matchedFriend.name[0].toUpperCase(),
  //         'totalWeeklySteps': matchedFriend.totalStepsThisWeek
  //       });
  //   })
  //   return this.sortRecord('friendsActivityRecords', 'totalWeeklySteps');
  // }

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
