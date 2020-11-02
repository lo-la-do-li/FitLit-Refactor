import Action from './Action';

class Hydration extends Action {
  constructor(data, userRepository) {
    super(data);
    this.ounces = data.numOunces;
    this.drink(userRepository);
  }

  drink(userRepo) {
    const chosenUser = this.returnChosenUser(userRepo);
    chosenUser.updateHydration(this.date, this.ounces);
  }
}

export default Hydration;
