class Hydration {
  constructor(data, userRepository) {
    this.userId = data.userID;
    this.date = data.date;
    this.ounces = data.numOunces;
    this.drink(userRepository);
  }

  drink(userRepo) {
    const chosenUser = userRepo.users.find(user => user.id === this.userId);
    chosenUser.updateHydration(this.date, this.ounces);
  }
}

export default Hydration;
