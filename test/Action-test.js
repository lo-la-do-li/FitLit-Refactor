import { expect } from 'chai'
import Action from '../src/Action';
import UserRepository from '../src/UserRepository';
import User from '../src/User';


describe('Action', () => {
  let action, user1, user2, userRepository;
  
  beforeEach(() => {
    action = new Action({
      'userID': 2,
      'date': '2019/06/15'
    });
    user1 = new User({
      'id': 1,
      'name': 'Luisa Hane',
      'address': '15195 Nakia Tunnel, Erdmanport VA 19901-1697',
      'email': 'Diana.Hayes1@hotmail.com',
      'strideLength': 4.3,
      'dailyStepGoal': 10000,
      'friends': [
        16,
        4,
        8
      ]
    });
    user2 = new User({
      "id": 2,
      "name": "Jarvis Considine",
      "address": "30086 Kathryn Port, Ciceroland NE 07273",
      "email": "Dimitri.Bechtelar11@gmail.com",
      "strideLength": 4.5,
      "dailyStepGoal": 2000,
      "friends": [
        9,
        18,
        24,
        19
      ]
    })
    userRepository = new UserRepository();
    userRepository.users.push(user1, user2);
  });

  it('should be a function', () => {
    expect(Action).to.be.a('function');
  });

  it('should be an instance of activity', () => {
    expect(action).to.be.an.instanceof(Action);
  });
  
  it('should hold a userId', () => {
    // console.log('this is ID', action.userId)
    expect(action.userId).to.equal(2);
  });
  
  it('should hold a date', () => {
    expect(action.date).to.equal("2019/06/15");
  });
  
  it('should be able to return a chosen user', () => {
    let chosenUser = action.returnChosenUser(userRepository);

    expect(chosenUser.id).to.equal(2);
  })
});