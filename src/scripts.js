// import './css/base.scss';
import './css/styles.scss';
// import './src/index.js';

import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import domUpdate from './domUpdate';
import apiCalls from './ApiCalls';


let userRepository = new UserRepository();
let users = [];
let activityInstances = [];
let hydrationInstances = [];
let sleepInstances = [];
let user;
let todayDate;
let randomUserIndex;
let newSleepData;
let newActivityData;
let newHydrationData;


//querySelectors
let headerName = document.querySelector('#header-name');
let hydrationCalendarCard = document.querySelector('#hydration-calendar-card');
let hydrationFriendsCard = document.querySelector('#hydration-friends-card');
let hydrationInfoCard = document.querySelector('#hydration-info-card');
let hydrationMainCard = document.querySelector('#hydration-main-card');
let hydrationUserOuncesToday = document.querySelector('#hydration-user-ounces-today');
let mainPage = document.querySelector('main');
let profileButton = document.querySelector('#profile-button');
let sleepCalendarCard = document.querySelector('#sleep-calendar-card');
let sleepFriendsCard = document.querySelector('#sleep-friends-card');
let sleepInfoCard = document.querySelector('#sleep-info-card');
let sleepMainCard = document.querySelector('#sleep-main-card');
let sleepUserHoursToday = document.querySelector('#sleep-user-hours-today');
let stairsCalendarCard = document.querySelector('#stairs-calendar-card');
let stepsMainCard = document.querySelector('#steps-main-card');
let stepsInfoCard = document.querySelector('#steps-info-card');
let stepsFriendsCard = document.querySelector('#steps-friends-card');
let stepsTrendingCard = document.querySelector('#steps-trending-card');
let stepsCalendarCard = document.querySelector('#steps-calendar-card');
let stairsFriendsCard = document.querySelector('#stairs-friends-card');
let stairsInfoCard = document.querySelector('#stairs-info-card');
let stairsMainCard = document.querySelector('#stairs-main-card');
let stairsTrendingCard = document.querySelector('#stairs-trending-card');
let stairsUserStairsToday = document.querySelector('#stairs-user-stairs-today');
let stepsUserStepsToday = document.querySelector('#steps-user-steps-today');
let userInfoDropdown = document.querySelector('#user-info-dropdown');
let modal = document.querySelector('.modal');
let triggerButton = document.querySelector('.trigger');
let closeButton = document.querySelector('.close-button');
let submitButton = document.querySelector('.submit-user-input-button');

//eventListener
mainPage.addEventListener('click', showInfo);
profileButton.addEventListener('click', showProfileDropDown);
triggerButton.addEventListener('click', displayFormDropDown);
closeButton.addEventListener('click', closeFormDropDown);
submitButton.addEventListener('click', postOnSubmit);


//Functions

Promise.all([apiCalls.getUserData(), apiCalls.getSleepData(), apiCalls.getActivityData(), apiCalls.getHydrationData()])
  .then((data) => {
    const dataSet = data.reduce((dataList, dataItem) => {
      return dataList = {...dataList, ...dataItem};
    }, {})
    instantiateData(dataSet);
    loadMainPage();
  })

//Instances of classes
function instantiateData(data) {
  users = data.userData.map(user => new User(user));
  userRepository = new UserRepository(users);
  activityInstances = data.activityData.map(data => new Activity(data, userRepository));
  hydrationInstances = data.hydrationData.map(data => new Hydration(data, userRepository));
  sleepInstances = data.sleepData.map(data => new Sleep(data, userRepository));
  todayDate = "2019/09/21";
}

function loadMainPage() {
  randomUserIndex = generateRandomNum(userRepository.users);
  user = userRepository.users[randomUserIndex];
  user.findFriendsNames(userRepository.users);
  sortOuncesRecord();
  displayMainPageSection();
}

function generateRandomNum(list){
  return Math.round(Math.random() * list.length);
}

function displayMainPageSection() {
  headerName.innerText = `${user.getFirstName()}'S FITLIT`;
  stepsUserStepsToday.innerText = findTodayUserMetrics(activityInstances).steps;
  stairsUserStairsToday.innerText = findTodayUserMetrics(activityInstances).flightsOfStairs * 12;
  hydrationUserOuncesToday.innerText = findTodayUserMetrics(hydrationInstances).ounces;
  sleepUserHoursToday.innerText = findTodayUserMetrics(sleepInstances).hoursSlept;
}

function findTodayUserMetrics(instances) {
  return instances.find(action => {
    return action.userId === user.id && action.date === todayDate;
  });
}

function sortOuncesRecord() {
  return user.ouncesRecord.sort((a, b) => {
    if (Object.values(a)[0] > Object.values(b)[0]) {
      return -1;
    }
    if (Object.values(a)[0] < Object.values(b)[0]) {
      return 1;
    }
    return 0;
  });
}
////////////////// below ////////////////
let userInputs = document.querySelectorAll('.user-input');
let modalContent = document.querySelector('.modal-content');
modalContent.addEventListener('keyup', limitInputs);

function displayFormDropDown() {
  checkInputFields();
  domUpdate.toggleElement(modal);
}

function checkInputFields() {
  const inputs = Array.from(userInputs)
  const unfilledinput = inputs.find(userInput => userInput.value === '');
  if (unfilledinput) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
}

function closeFormDropDown() {
  domUpdate.toggleElement(modal);
  domUpdate.clearInputFields(userInputs);
}

function postOnSubmit(event) {
  event.preventDefault();
  collectUserInputData();
  // postUserInputData();
  domUpdate.toggleElement(modal);
  domUpdate.clearInputFields(userInputs);
  confirmUserFormPosted();
}

function confirmUserFormPosted() {
  window.confirm(`The following data has been added to your Fitlit:\n Hours of Sleep: ${newSleepData.hoursSlept}\n Sleep Quality: ${newSleepData.sleepQuality}\n Number of Steps: ${newActivityData.numSteps}\n Minutes Active: ${newActivityData.minutesActive}\n Flights of Stairs: ${newActivityData.flightsOfStairs}\n Ounces of Water: ${newHydrationData.numOunces}`);
}

function collectUserInputData() {
  newSleepData = {"userID": randomUserIndex + 1, "date": '2019/08/21', "hoursSlept": userInputs[0].value, "sleepQuality": userInputs[1].value};
  newActivityData = {"userID": randomUserIndex + 1, "date": '2019/08/22', "numSteps": userInputs[2].value, "minutesActive": userInputs[3].value, "flightsOfStairs": userInputs[4].value};
  newHydrationData = {"userID": randomUserIndex + 1, "date": '2019/08/22', "numOunces": userInputs[5].value};
}

function postUserInputData() {
  return Promise.all([apiCalls.addSleepData(newSleepData), apiCalls.addActivityData(newActivityData), apiCalls.addHydrationData(newHydrationData)])
    .then(data => console.log(data))
}

function limitInputs() {
  checkInputFields();
  preventInvalids();
}

function preventInvalids() {
  const invalidChars = ['+', '-', 'e', 'E'];
    if (invalidChars.includes(event.key)) {
      event.preventDefault();
    }
}

///////////////////////////// above ////////////////

function showProfileDropDown() {
  const name = user.getFirstName();
  const friendsSteps = displayFriendsSteps();
  domUpdate.showProfileDropDown(userInfoDropdown, name, user, friendsSteps)
  let friendsStepsParagraphs = document.querySelectorAll('.friends-steps');
  domUpdate.updateDropdownTextColor(friendsStepsParagraphs);

}

function displayFriendsSteps() {
  const friendsStepsRecords = user.findFriendsTotalStepsForWeek(userRepository.users, todayDate);
  return domUpdate.updateFriendsSteps(friendsStepsRecords);
}


function showInfo() {
  if (event.target.parentNode.parentNode.classList.contains('steps')) {
    showStepInfo();
  } else if (event.target.parentNode.parentNode.classList.contains('hydration')) {
    showHydrationInfo();
  } else if (event.target.parentNode.parentNode.classList.contains('stairs')) {
    showStairsInfo();
  } else if (event.target.parentNode.parentNode.classList.contains('sleep')) {
    showSleepInfo();
  }
}

function showStepInfo() {
  if (event.target.classList.contains('steps-info-button')) {
    domUpdate.flipCard(stepsMainCard, stepsInfoCard);
    displayStepsInfoSection();
  } else if (event.target.classList.contains('steps-friends-button')) {
    domUpdate.flipCard(stepsMainCard, stepsFriendsCard);
    displayFriendsStepsSection();
  } else if (event.target.classList.contains('steps-trending-button')) {
    domUpdate.flipCard(stepsMainCard, stepsTrendingCard);
    displayTrendingStepSection();
  } else if (event.target.classList.contains('steps-calendar-button')) {
    domUpdate.flipCard(stepsMainCard, stepsCalendarCard);
    displayCalendarStepsSection();
  } else if (event.target.classList.contains('steps-go-back-button')) {
    domUpdate.flipCard(event.target.parentNode, stepsMainCard);
  }
}

function showHydrationInfo() {
  if (event.target.classList.contains('hydration-info-button')) {
    domUpdate.flipCard(hydrationMainCard, hydrationInfoCard);
    displayHydrationInfoSection();
  }
  if (event.target.classList.contains('hydration-friends-button')) {
    domUpdate.flipCard(hydrationMainCard, hydrationFriendsCard);
    displayFriendsHydrationSection();
  }
  if (event.target.classList.contains('hydration-calendar-button')) {
    domUpdate.flipCard(hydrationMainCard, hydrationCalendarCard);
    displayHydrationCalendarSection();
  }
  if (event.target.classList.contains('hydration-go-back-button')) {
    domUpdate.flipCard(event.target.parentNode, hydrationMainCard);
  }
}

function showStairsInfo() {
  if (event.target.classList.contains('stairs-info-button')) {
    domUpdate.flipCard(stairsMainCard, stairsInfoCard);
    displayStairsInfoSection();
  } else if (event.target.classList.contains('stairs-friends-button')) {
    domUpdate.flipCard(stairsMainCard, stairsFriendsCard);
    displayFriendsStairsSection();
  } else if (event.target.classList.contains('stairs-trending-button')) {
    domUpdate.flipCard(stairsMainCard, stairsTrendingCard);
    displayTrendingStairsSection();
  } else if (event.target.classList.contains('stairs-calendar-button')) {
    domUpdate.flipCard(stairsMainCard, stairsCalendarCard);
    displayCalendarStairsSection();
  } else if (event.target.classList.contains('stairs-go-back-button')) {
    domUpdate.flipCard(event.target.parentNode, stairsMainCard);
  }
}

function showSleepInfo() {
  if (event.target.classList.contains('sleep-info-button')) {
    domUpdate.flipCard(sleepMainCard, sleepInfoCard);
    displaySleepInfoSection();
  } else if (event.target.classList.contains('sleep-friends-button')) {
    domUpdate.flipCard(sleepMainCard, sleepFriendsCard);
    displayFriendsSleepSection();
  } else if (event.target.classList.contains('sleep-calendar-button')) {
    domUpdate.flipCard(sleepMainCard, sleepCalendarCard);
    displayCalendarSleepSection();
  } else if (event.target.classList.contains('sleep-go-back-button')) {
    domUpdate.flipCard(event.target.parentNode, sleepMainCard);
  }
}

function displayStepsInfoSection() {
  const min = findTodayUserMetrics(activityInstances).minutesActive;
  const miles = findTodayUserMetrics(activityInstances).calculateMiles(userRepository)
  domUpdate.updateStepsInfoSection(stepsInfoCard, min, miles);
}

function displayFriendsStepsSection() {
  const averageMin = userRepository.calculateAverageMinutesActive(todayDate);
  const averageSteps = userRepository.calculateAverageSteps(todayDate);
  const averageGoal = userRepository.calculateAverageStepGoal();
  domUpdate.updateFriendsStepsSection(stepsFriendsCard, averageMin, averageSteps, averageGoal);
}

function displayCalendarStepsSection() {
  const averageActiveMin = user.calculateAverageMinutesActiveThisWeek(todayDate);
  const averageSteps = user.calculateAverageStepsThisWeek(todayDate);
  domUpdate.updateCalendarStepsSection(stepsCalendarCard, averageActiveMin, averageSteps);
}

function displayTrendingStepSection() {
  user.findTrendingStepDays();
  domUpdate.updateTrendingStepSection(stepsTrendingCard, user)
}

// END OF STEPS -----------------------------------------

function displayStairsInfoSection() {
  const flights = findTodayUserMetrics(activityInstances).flightsOfStairs;
  domUpdate.updateStairsInfoSection(stairsInfoCard, flights);
}

function displayFriendsStairsSection() {
  const avgFlights = (userRepository.calculateAverageStairs(todayDate) / 12).toFixed(1);
  domUpdate.updateFriendsStairsSection(stairsFriendsCard, avgFlights);
}

function displayTrendingStairsSection() {
  const trendingStairs = updateTrendingStairsDays();
  domUpdate.updateTrendingStairsSection(stairsTrendingCard, trendingStairs);
}

function updateTrendingStairsDays() {
  user.findTrendingStairsDays();
  const trendingStairs = user.trendingStairsDays[0]
  return domUpdate.updateTrendingStairs(trendingStairs);
}

function displayCalendarStairsSection() {
  const avgFlights = user.calculateAverageFlightsThisWeek(todayDate);
  const avgStairs = (user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);
  domUpdate.updateCalendarStairsSection(stairsCalendarCard, avgFlights, avgStairs);
}

// END OF STAIRS -----------------------------------------


function displayHydrationInfoSection() {
  const glasses = (findTodayUserMetrics(hydrationInstances).ounces/8).toFixed(1);
  domUpdate.updateHydrationInfoSection(hydrationInfoCard, glasses);
}

function displayFriendsHydrationSection() {
  const friendsIntake = userRepository.calculateAverageDailyWater(todayDate);
  domUpdate.updateFriendsHydrationSection(hydrationFriendsCard, friendsIntake);
}

function displayHydrationCalendarSection() {
  const dailyOunces = displayDailyOunces();
  domUpdate.updateHydrationCalendarSection(hydrationCalendarCard, dailyOunces);
}

function displayDailyOunces() {

  let elementSection = '';
  user.ouncesRecord.forEach((record, index) => {
  let dailyOunces = user.returnTotalDailyOunces(record.date);
  if (index === 1) {
    elementSection = domUpdate.updateYesterdayOunces(dailyOunces);
  } else if(index > 1 && index < 7) {
    elementSection += domUpdate.updatePastDailyOunces(index, dailyOunces);
    }
  })
  return elementSection;
}

// END OF HYDRATION  -----------------------------------------

function displaySleepInfoSection() {
  const sleepQuality = findTodayUserMetrics(sleepInstances).sleepQuality;
  const hoursAvg = user.hoursSleptAverage;
  const qualityAvg = user.sleepQualityAverage;
  domUpdate.updateSleepInfoSection(sleepInfoCard, sleepQuality, hoursAvg, qualityAvg);
}

function displayFriendsSleepSection() {
  const longestSleeper = getFriendSleeper('getLongestSleeper');
  const worstSleeper = getFriendSleeper('getWorstSleeper');
  domUpdate.updateFriendsSleepSection(sleepFriendsCard, longestSleeper, worstSleeper);
}

function getFriendSleeper(type) {
  return userRepository.users.find(user => {
    return user.id === userRepository[type](todayDate, sleepInstances)
  }).getFirstName();
}

function displayCalendarSleepSection() {
  const avgHours = user.calculateAverageSleptHoursThisWeek(todayDate);
  const avgQuality = user.calculateAverageSleptQualityThisWeek(todayDate);
  domUpdate.updateSleepCalendarSection(sleepCalendarCard, avgHours, avgQuality)
}
