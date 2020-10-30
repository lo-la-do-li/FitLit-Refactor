import { expect } from 'chai';

import Hydration from '../src/Hydration';
import UserRepository from '../src/UserRepository';
import User from '../src/User';

describe('Hydration', function() {
  let user1, user2, userRepository, hydrate1, hydrate2, hydrate3;

  beforeEach(() => {
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
    })
    user2 = new User({
      "id": 2,
      "name": "Jarvis Considine",
      "address": "30086 Kathryn Port, Ciceroland NE 07273",
      "email": "Dimitri.Bechtelar11@gmail.com",
      "strideLength": 4.5,
      "dailyStepGoal": 5000,
      "friends": [
        9,
        18,
        24,
        19
      ]
    })
    userRepository = new UserRepository();
    userRepository.users.push(user1, user2);
    hydrate1 = new Hydration({
        "userID": 1,
        "date": "2019/06/15",
        "numOunces": 37
      }, userRepository);
    hydrate2 = new Hydration({
      "userID": 2,
      "date": "2019/06/15",
      "numOunces": 75
    }, userRepository)
    hydrate3 = new Hydration({
      "userID": 2,
      "date": "2019/06/16",
      "numOunces": 91
    }, userRepository)
  })
  
  it('should be a function', function() {
    expect(Hydration).to.be.a('function');
  });
  
  it('should be an instance of hydrate', function() {
    expect(hydrate1).to.be.an.instanceof(Hydration);
  });

  it('should have an amount of ounces drank', function() {
    expect(hydrate3.ounces).to.equal(91);
  });
  
  describe('drink', function () {
    it('should update the average number of ounces over all time', function() {
      expect(user2.ouncesAverage).to.equal(83);
    })
    
    it('should add the date and amount to the object record', function() {
      expect(user1.ouncesRecord).to.deep.equal([{date: "2019/06/15", amount: 37}])
      expect(user2.ouncesRecord.length).to.equal(2)
    })
  });
});
