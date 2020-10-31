import Action from './Action';

class Hydration extends Action {
  constructor(data, userRepository) {
    super(data);
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

  // updateHydration(date, amount) {
  //   this.ouncesRecord.unshift({[date]: amount});
  //   const recordLength = this.ouncesRecord.length;
  //   const currentTotal = this.ouncesAverage * (recordLength - 1);
  //   const currentAverage = (currentTotal + amount) / recordLength;
  //   const finalAverage = Math.round(currentAverage);

  //   return this.ouncesAverage = recordLength ? finalAverage : amount;
  // }


  // //Move to Hydration.js, formerly addDailyOunces(date)
  // returnTotalDailyOunces(date) {
  //   return this.ouncesRecord.reduce((totalOunces, record) => {
  //     if (record[date]) {
  //       totalOunces += record[date]
  //     }
  //     return totalOunces
  //   }, 0)
  // }

  drink(userRepo) {
    const chosenUser = this.returnChosenUser(userRepo);
    chosenUser.updateHydration(this.date, this.ounces);
  }
}

export default Hydration;
