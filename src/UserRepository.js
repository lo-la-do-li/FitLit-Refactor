class UserRepository {
  constructor(users) {
    this.users = users || [];
  }

  getUser(id) {
    return this.users.find(user => user.id === id)
  }

  calculateAverageStepGoal() {
    let goals = this.users.map(user => user.dailyStepGoal);
    let total = goals.reduce((sum, goal) => {
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
      return user[recordType].filter(activity => activity.date === date)
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
  }

  calculateAverageStairs(date) {
    return this.calculateAverageValue(date, 'activityRecord', 'flightsOfStairs');
  }

  calculateAverageMinutesActive(date) {
    return this.calculateAverageValue(date, 'activityRecord', 'minutesActive');
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

  organizeSleepers(date, sleepInfo) {
    const sleepReport = sleepInfo.filter(sleep => sleep.date === date)
    return sleepReport.sort((a, b) => {
      if (a.hoursSlept - b.hoursSlept < 0) {
        return -1
      } else if (a.hoursSlept - b.hoursSlept > 0) {
        return 1
      } else {
        return 0
      }
    })
  }

  getLongestSleeper(date, sleepInfo) {
    const totalSleepers = this.organizeSleepers(date, sleepInfo);
    return totalSleepers[totalSleepers.length - 1].userId;
  }

  getWorstSleeper(date, sleepInfo) {
    const totalSleepers = this.organizeSleepers(date, sleepInfo);
    return totalSleepers[0].userId;
  }
}

export default UserRepository;
