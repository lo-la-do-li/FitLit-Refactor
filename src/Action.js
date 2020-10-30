class Action {
  constructor(data) {
    this.userId = data.userID;
    this.date = data.date;
  }
  
  returnChosenUser(userRepository) {
    return userRepository.users.find(user => user.id === this.userId)
  }

  // doAction(userRepo) {
  //   const chosenUser = this.returnChosenUser(userRepo);
  // }
  
  // calculateTotalNum(todayDate, recordType, input) {
  //   return (recordType.reduce((totalValue, detail) => {
  //     const activityDate = recordType.find(activity => activity.date === todayDate);
  //     let day7Index = recordType.indexOf(activityDate);
  //     if (day7Index <= recordType.indexOf(detail) && recordType.indexOf(detail) <= (day7Index + 6)) {
  //       totalValue += detail[input];
  //     }
  //     return totalValue;
  //   }, 0))
  // }

  // calculateAverageValueByWeek(todayDate, recordType, input, num) {
  //   return (this.calculateTotalNum(todayDate, recordType, input) / 7).toFixed(num);
  // }

  // sortRecord(recordType, activity) {
  //   return recordType.sort((a, b) => {
  //     if (a[activity] - b[activity] < 0) {
  //       return 1
  //     } else if (a[activity] - b[activity] > 0) {
  //       return -1
  //     } else {
  //       return 0
  //     }
  //   })
  // }

  // findRecord(type, activity, msg) {
  //   return this.activityRecord.reduce((positiveDays, dailyRecord) => {
  //     const index1 = this.activityRecord.indexOf(dailyRecord);
  //     if (this.activityRecord[index1+1] && dailyRecord[activity] > this.activityRecord[index1+1][activity]) {
  //       positiveDays.unshift(dailyRecord.date);
  //     } else if (positiveDays.length > 2) {
  //       this[type].push(`Your most recent positive ${msg} streak was ${positiveDays[0]} - ${positiveDays[positiveDays.length - 1]}!`);
  //       positiveDays = [];
  //     }
  //     return positiveDays;
  //   }, [])
  // }
}

export default Action;