import sleepData from './data/sleep';

class UserRepository {
  constructor() {
    this.users = [];
  }

  getUser(id) {
    return this.users.find(function(user) {
      return user.id === id;
    })
  }

  calculateAverageStepGoal() {
    let goals = this.users.map(function(user) {
      return user.dailyStepGoal;
    });
    let total = goals.reduce(function(sum, goal) {
      return sum += goal;
    }, 0);
    return total / this.users.length;
  }

  calculateAverageSleepQuality() {
    let totalSleepQuality = this.users.reduce((sum, user) => {
      return sum += user.sleepQualityAverage;
    }, 0);
    return totalSleepQuality / this.users.length;
  }

  calculateAverageValue(date, recordType, measurement) {
    let allUsersTotal = this.users.map(user => {
      return user[recordType].filter(activity => {
        return activity.date === date;
      });
    })
    let totalSum = allUsersTotal.reduce((sum, activityCollection) => {
      activityCollection.forEach(activity => {
        sum += activity[measurement]
      })
      return sum;
    }, 0);
    return Math.round(totalSum / allUsersTotal.length);
  }

  calculateAverageSteps(date) {
    return this.calculateAverageValue(date, 'activityRecord', 'steps');
    // let allUsersStepsCount = this.users.map(user => {
    //   return user.activityRecord.filter(activity => {
    //     return activity.date === date;
    //   });
    // })
    // let sumOfSteps = allUsersStepsCount.reduce((stepsSum, activityCollection) => {
    //   activityCollection.forEach(activity => {
    //     stepsSum += activity.steps
    //   })
    //   return stepsSum;
    // }, 0);
    // return Math.round(sumOfSteps / allUsersStepsCount.length);
  }

  calculateAverageStairs(date) {
    return this.calculateAverageValue(date, 'activityRecord', 'flightsOfStairs');
    // let allUsersStairsCount = this.users.map(user => {
    //   return user.activityRecord.filter(activity => {
    //     return activity.date === date;
    //   });
    // })
    // let sumOfStairs = allUsersStairsCount.reduce((stairsSum, activityCollection) => {
    //   activityCollection.forEach(activity => {
    //     stairsSum += activity.flightsOfStairs
    //   })
    //   return stairsSum;
    // }, 0);
    // return Math.round(sumOfStairs / allUsersStairsCount.length);
  }

  calculateAverageMinutesActive(date) {
    return this.calculateAverageValue(date, 'activityRecord', 'minutesActive');
    // let allUsersMinutesActiveCount = this.users.map(user => {
    //   return user.activityRecord.filter(activity => {
    //     return activity.date === date;
    //   });
    // })
    // let sumOfMinutesActive = allUsersMinutesActiveCount.reduce((minutesActiveSum, activityCollection) => {
    //   activityCollection.forEach(activity => {
    //     minutesActiveSum += activity.minutesActive
    //   })
    //   return minutesActiveSum;
    // }, 0);
    // return Math.round(sumOfMinutesActive / allUsersMinutesActiveCount.length);
  }

  calculateAverageDailyWater(date) {
    let todaysDrinkers = this.users.filter(user => {
      return user.returnTotalDailyOunces(date) > 0;
    });
    let sumDrankOnDate = todaysDrinkers.reduce((sum, drinker) => {
      return sum += drinker.returnTotalDailyOunces(date);
    }, 0)
    return Math.floor(sumDrankOnDate / todaysDrinkers.length);
  }

  findBestSleepers(date) {
    return this.users.filter(user => {
      return user.calculateAverageSleptQualityThisWeek(date) > 3;
    })
  }

  organizeSleepers(date) {
    return sleepData.filter(sleep => {
      return sleep.date === date;
    }).sort((a, b) => {
      if (a.hoursSlept - b.hoursSlept < 0) {
        return -1
      } else if (a.hoursSlept - b.hoursSlept > 0) {
        return 1
      } else {
        return 0
      }
    })
  }

  getLongestSleepers(date) {
    const totalSleepers = this.organizeSleepers(date)
    return totalSleepers[totalSleepers.length - 1].userID;
  }

  getWorstSleepers(date) {
    const totalSleepers = this.organizeSleepers(date)
    return totalSleepers[0].userID;
  }
}

export default UserRepository;
