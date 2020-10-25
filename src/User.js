 class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.address = userData.address;
    this.email = userData.email;
    this.strideLength = userData.strideLength;
    this.dailyStepGoal = userData.dailyStepGoal;
    this.totalStepsThisWeek = 0;//
    this.friends = userData.friends;
    this.ouncesAverage = 0;
    this.ouncesRecord = [];
    this.hoursSleptAverage = 0;
    this.sleepQualityAverage = 0;
    this.sleepHoursRecord = [];
    this.sleepQualityRecord = [];
    this.activityRecord = [];
    this.accomplishedDays = [];
    this.trendingStepDays = [];
    this.trendingStairsDays = [];
    this.friendsNames = [];
    this.friendsActivityRecords = []
  }
  getFirstName() {
    this.name = this.name.split(' ');
    return this.name[0].toUpperCase();
  }
  // Should be in Hydration.js?
  updateHydration(date, amount) {
    this.ouncesRecord.unshift({[date]: amount});
    const recordLength = this.ouncesRecord.length;
    const currentTotal = this.ouncesAverage * (recordLength - 1);
    const currentAverage = (currentTotal + amount) / recordLength;
    const finalAverage = Math.round(currentAverage);

    return this.ouncesAverage = recordLength ? finalAverage : amount;
  }


  //Move to Hydration.js, formerly addDailyOunces(date)
  returnTotalDailyOunces(date) {
    return this.ouncesRecord.reduce((totalOunces, record) => {
      if (record[date]) {
        totalOunces += record[date]
      }
      return totalOunces
    }, 0)
  }

  updateRecord(dataValues, recordType) {
    this[recordType].unshift(dataValues);
  }

  returnAverageValue(sleepInfo) {
    const property = sleepInfo.hours ? 'hoursSleptAverage' : 'sleepQualityAverage';
    let recordData = sleepInfo.hours || sleepInfo.quality;
    const totalValue = sleepInfo.recordType.reduce((acc, x)=> {
      return acc += x.hours || x.quality;
    }, 0)
    const averageValue = totalValue / sleepInfo.recordType.length;
    const finalAverage = sleepInfo.recordType.length ? averageValue : recordData
    return this[property] = finalAverage;
  }

  updateSleepHours(date, hours) {
    this.updateRecord({date, hours}, 'sleepHoursRecord');
    this.returnAverageValue({hours, recordType: this.sleepHoursRecord})
  }

  updateSleepQuality(date, quality) {
    this.updateRecord({date, quality}, 'sleepQualityRecord');
    this.returnAverageValue({quality, recordType: this.sleepQualityRecord})
  }

  calculateTotalNum(todayDate, recordType, input) {
    return (recordType.reduce((totalValue, detail) => {
      const activityDate = recordType.find(activity => activity.date === todayDate);
      let day7Index = recordType.indexOf(activityDate);
      if (day7Index <= recordType.indexOf(detail) && recordType.indexOf(detail) <= (day7Index + 6)) {
        totalValue += detail[input];
      }
      return totalValue;
    }, 0))
  }

  calculateAverageValueByWeek(todayDate, recordType, input, num) {
    return (this.calculateTotalNum(todayDate, recordType, input) / 7).toFixed(num);
  }

  calculateAverageSleptHoursThisWeek(todayDate) {
    return this.calculateAverageValueByWeek(todayDate, this.sleepHoursRecord, 'hours', 1);
  }

  calculateAverageSleptQualityThisWeek(todayDate) {
    return this.calculateAverageValueByWeek(todayDate, this.sleepQualityRecord, 'quality', 1);
  }

  updateActivities(activity) {
    this.updateRecord(activity, 'activityRecord')
    if (activity.numSteps >= this.dailyStepGoal) {
      this.accomplishedDays.unshift(activity.date);
    }
  }

  sortRecord(recordType, activity) {
    return this[recordType].sort((a, b) => {
      if (a[activity] - b[activity] < 0) {
        return 1
      } else if (a[activity] - b[activity] > 0) {
        return -1
      } else {
        return 0
      }
    })
  }

  findClimbingRecord() {
     this.sortRecord('activityRecord', 'flightsOfStairs');
     return this.activityRecord[0].flightsOfStairs;
  }

  calculateDailyCalories(date) {
    let fitDate = this.activityRecord.filter(activity => activity.date === date)
    const totalMinutes = fitDate.reduce((sumMinutes, activity) => {
      return sumMinutes += activity.minutesActive
    }, 0);
    return Math.round(totalMinutes * 7.6);
  }

  calculateAverageMinutesActiveThisWeek(todayDate) {
    return this.calculateAverageValueByWeek(todayDate, this.activityRecord, 'minutesActive', 0);
  }
  calculateAverageStepsThisWeek(todayDate) {
    return this.calculateAverageValueByWeek(todayDate, this.activityRecord, 'steps', 0);
  }
  calculateAverageFlightsThisWeek(todayDate) {
    return this.calculateAverageValueByWeek(todayDate, this.activityRecord, 'flightsOfStairs', 1);
  }

  findRecord(type, activity, msg) {
    return this.activityRecord.reduce((positiveDays, dailyRecord) => {
      const index1 = this.activityRecord.indexOf(dailyRecord);
      if (this.activityRecord[index1+1] && dailyRecord[activity] > this.activityRecord[index1+1][activity]) {
        positiveDays.unshift(dailyRecord.date);
      } else if (positiveDays.length > 2) {
        this[type].push(`Your most recent positive ${msg} streak was ${positiveDays[0]} - ${positiveDays[positiveDays.length - 1]}!`);
        positiveDays = [];
      }
      return positiveDays;
    }, [])
  }

  findTrendingStepDays() {
    this.findRecord('trendingStepDays', 'steps', 'step');
  }

  findTrendingStairsDays() {
    this.findRecord('trendingStairsDays', 'flightsOfStairs', 'climbing');
  }

  findFriendsNames(users) {
    this.friends.forEach(friend => {
      const friendName = users.find(user => user.id === friend);
      this.friendsNames.push(friendName.getFirstName());
    })
  }

  calculateTotalStepsThisWeek(todayDate) {
    const totalSteps = this.calculateTotalNum(todayDate, this.activityRecord, 'steps');
    return this.totalStepsThisWeek = totalSteps;
  }

  findFriendsTotalStepsForWeek(users, date) {
    this.friends.map(friend => {
      let matchedFriend = users.find(user => user.id === friend);
      matchedFriend.calculateTotalStepsThisWeek(date);
      this.friendsActivityRecords.push(
        {
          'id': matchedFriend.id,
          'firstName': matchedFriend.name.toUpperCase().split(' ')[0],
          'totalWeeklySteps': matchedFriend.totalStepsThisWeek
        });
    })
    return this.sortRecord('friendsActivityRecords', 'totalWeeklySteps');
  }
}

export default User;
