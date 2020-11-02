class Action {
  constructor(data) {
    this.userId = data.userID;
    this.date = data.date;
  }
  
  returnChosenUser(userRepository) {
    return userRepository.users.find(user => user.id === this.userId)
  }
}

export default Action;