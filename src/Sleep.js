class Sleep { // instance for the user's sleep each day
  constructor(data, userRepository) {
    this.userId = data.userID;
    this.date = data.date;
    this.hoursSlept = data.hoursSlept;
    this.sleepQuality = data.sleepQuality;
    this.sleep(userRepository);
  }

  sleep(userRepo) {
    const chosenUser = userRepo.users.find(user => user.id === this.userId);
    //chosenUser.updateSleep(this.date, this.hoursSlept, this.sleepQuality);
    chosenUser.updateSleepHours(this.date, this.hoursSlept);
    chosenUser.updateSleepQuality(this.date, this.sleepQuality);
  }
}

export default Sleep;
