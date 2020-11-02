import Action from './Action';

class Sleep extends Action {
  constructor(data, userRepository) {
    super(data);
    this.hoursSlept = data.hoursSlept;
    this.sleepQuality = data.sleepQuality;
    this.sleep(userRepository);
  }

  sleep(userRepo) {
    const chosenUser = this.returnChosenUser(userRepo);
    chosenUser.updateSleepHours(this.date, this.hoursSlept);
    chosenUser.updateSleepQuality(this.date, this.sleepQuality);
  }
}

export default Sleep;
