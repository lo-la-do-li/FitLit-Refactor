import Action from './Action';

class Sleep extends Action { // instance for the user's sleep each day
  constructor(data, userRepository) {
    super(data);
    this.hoursSlept = data.hoursSlept;
    this.sleepQuality = data.sleepQuality;
    this.sleep(userRepository);
  }

  // updateSleepHours(date, hours) {
  //   this.updateRecord({date, hours}, 'sleepHoursRecord');
  //   this.returnAverageValue({hours, recordType: this.sleepHoursRecord})
  // }

  // updateSleepQuality(date, quality) {
  //   this.updateRecord({date, quality}, 'sleepQualityRecord');
  //   this.returnAverageValue({quality, recordType: this.sleepQualityRecord})
  // }

  // calculateAverageSleptHoursThisWeek(todayDate) {
  //   return this.calculateAverageValueByWeek(todayDate, this.sleepHoursRecord, 'hours', 1);
  // }

  // calculateAverageSleptQualityThisWeek(todayDate) {
  //   return this.calculateAverageValueByWeek(todayDate, this.sleepQualityRecord, 'quality', 1);
  // }

  sleep(userRepo) {
    const chosenUser = this.returnChosenUser(userRepo);
    chosenUser.updateSleepHours(this.date, this.hoursSlept);
    chosenUser.updateSleepQuality(this.date, this.sleepQuality);
  }
}

export default Sleep;
