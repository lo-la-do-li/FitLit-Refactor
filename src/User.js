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


  calculateAverageValueByWeek(todayDate, recordType, input, num) {
    return (recordType.reduce((totalValue, detail) => {
      const activityDate = recordType.find(activity => activity.date === todayDate);
      let day7Index = recordType.indexOf(activityDate);
      if (day7Index <= recordType.indexOf(detail) && recordType.indexOf(detail) <= (day7Index + 6)) {
        totalValue += detail[input];
      }
      return totalValue;
    }, 0) / 7).toFixed(num);
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

  findClimbingRecord() {
    return this.activityRecord.sort((a, b) => {
      if (a.flightsOfStairs - b.flightsOfStairs < 0) {
        return 1
      } else if (a.flightsOfStairs - b.flightsOfStairs > 0) {
        return -1
      } else {
        return 0
      }
    })[0].flightsOfStairs;
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

  //revisit
  findTrendingStepDays() {
    return this.activityRecord.reduce((positiveDays, dailyRecord) => {
      const index1 = this.activityRecord.indexOf(dailyRecord);
      if (this.activityRecord[index1+1] && dailyRecord.steps > this.activityRecord[index1+1].steps) {
        positiveDays.unshift(dailyRecord.date);
      } else if (positiveDays.length > 2) {
        this.trendingStepDays.push(`Your most recent positive step streak was ${positiveDays[0]} - ${positiveDays[positiveDays.length - 1]}!`);
        positiveDays = [];
      }
      return positiveDays;
    }, [])
  }
  
  findTrendingStairsDays() {
    let positiveDays = [];
    for (var i = 0; i < this.activityRecord.length; i++) {
      if (this.activityRecord[i + 1] && this.activityRecord[i].flightsOfStairs > this.activityRecord[i + 1].flightsOfStairs) {
        positiveDays.unshift(this.activityRecord[i].date);
      } else if (positiveDays.length > 2) {
        this.trendingStairsDays.push(`Your most recent positive climbing streak was ${positiveDays[0]} - ${positiveDays[positiveDays.length - 1]}!`);
        positiveDays = [];
      }
    }
  }
  findFriendsNames(users) {
    this.friends.forEach(friend => {
      this.friendsNames.push(users.find(user => user.id === friend).getFirstName());
    })
  }
  calculateTotalStepsThisWeek(todayDate) {
    return this.totalStepsThisWeek = (this.activityRecord.reduce((sum, activity) => {
      let index = this.activityRecord.indexOf(this.activityRecord.find(activity => activity.date === todayDate));
      if (index <= this.activityRecord.indexOf(activity) && this.activityRecord.indexOf(activity) <= (index + 6)) {
        sum += activity.steps;
      }
      return sum;
    }, 0));
  }
  findFriendsTotalStepsForWeek(users, date) {
    this.friends.map(friend => {
      console.log(friend)
      let matchedFriend = users.find(user => user.id === friend);
      matchedFriend.calculateTotalStepsThisWeek(date);
      this.friendsActivityRecords.push(
        {
          'id': matchedFriend.id,
          'firstName': matchedFriend.name.toUpperCase().split(' ')[0],
          'totalWeeklySteps': matchedFriend.totalStepsThisWeek
        })
    })
    this.calculateTotalStepsThisWeek(date);
    this.friendsActivityRecords.push({
      'id': this.id,
      'firstName': 'YOU',
      'totalWeeklySteps': this.totalStepsThisWeek
    });
    this.friendsActivityRecords = this.friendsActivityRecords.sort((a, b) => b.totalWeeklySteps - a.totalWeeklySteps);
  }
}

export default User;
