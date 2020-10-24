class Hydration {
  constructor(data, userRepository) {
    this.userId = data.userID;
    this.date = data.date;
    this.ounces = data.numOunces;
    // this.ouncesAverage = 0;
    // this.ouncesRecord = [];
    this.drink(userRepository);
  }

  // updateHydration(date, amount) {
  //   this.ouncesRecord.unshift({[date]: amount});
  //   const recordLength = this.ouncesRecord.length;
  //   const currentTotal = this.ouncesAverage * (recordLength - 1);
  //   const currentAverage = (currentTotal + amount) / recordLength;
  //   const finalAverage = Math.round(currentAverage);
  //
  //   return this.ouncesAverage = recordLength ? finalAverage : amount;
  // }

  drink(userRepo) {
    const chosenUser = userRepo.users.find(user => user.id === this.userId);
    chosenUser.updateHydration(this.date, this.ounces);
  }
}

export default Hydration;
