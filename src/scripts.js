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

//eventListener
mainPage.addEventListener('click', showInfo);
profileButton.addEventListener('click', showDropdown);

//Functions

// const newSleepData = {"userID": randomUserIndex + 1, "date": '2019/09/21', "hoursSlept": 8, "sleepQuality": 7};
// const newActivityData = {"userID": randomUserIndex + 1, "date": '2019/09/22', "numSteps": 2000, "minutesActive": 30, "flightsOfStairs": 16};
// const newHydrationData = {"userID": randomUserIndex + 1, "date": '2019/09/22', "numOunces": 6.1};

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
  todayDate = "2019/06/24";
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

//maybe for later
// function changeHiddenProperty(elements) {
//   elements.forEach(element => {
//     if (element.addHidden) {
//       elements.property.classList.add('hide');
//     } else {
//       elements.property.classList.remove('hide')
//     }
//   })
// }

// function domUpdate.flipCard(cardToHide, cardToShow) {
//   cardToHide.classList.add('hide');
//   cardToShow.classList.remove('hide');
// }

function showDropdown() {
  const name = user.getFirstName();
  const friendsSteps = displayFriendsSteps();
  domUpdate.showDropDown(userInfoDropdown, name, user, friendsSteps)
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
  // stairsInfoCard.innerHTML = '';
  // stairsInfoCard.innerHTML =
  // `
  // <button aria-label='go-back' class='go-back-button stairs-go-back-button'></button>
  // <section class='card-data-line'>
  //   <p>FLIGHTS CLIMBED TODAY</p>
  //   <h4 id='stairs-info-flights-today'>${findTodayUserMetrics(activityInstances).flightsOfStairs}</h4>
  // </section>
  // `
}

function displayFriendsStairsSection() {
  const avgFlights = (userRepository.calculateAverageStairs(todayDate) / 12).toFixed(1);
  domUpdate.updateFriendsStairsSection(stairsFriendsCard, avgFlights);
  // stairsFriendsCard.innerHTML = ''
  // stairsFriendsCard.innerHTML =
  // `
  // <button aria-label='go-back' class='go-back-button stairs-go-back-button'></button>
  // <section class='card-data-line'>
  //   <p>ALL USERS' AVERAGE FLIGHTS TODAY</p>
  //   <h4 id='stairs-friend-flights-average-today'>${(userRepository.calculateAverageStairs(todayDate) / 12).toFixed(1)}</h4>
  // `
}

function displayTrendingStairsSection() {
  const trendingStairs = updateTrendingStairsDays();
  domUpdate.updateTrendingStairsSection(stairsTrendingCard, trendingStairs);
  // stairsTrendingCard.innerHTML = '';
  // stairsTrendingCard.innerHTML =
  // `
  // <button aria-label='go-back' class='go-back-button stairs-go-back-button'></button>
  // <section class='card-data-line trending-stairs-phrase-container'>
  // ${updateTrendingStairsDays()}
  // </section>
  // `
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
  // stairsCalendarCard.innerHTML = '';
  // stairsCalendarCard.innerHTML =
  // `
  // <button aria-label='go-back' class='go-back-button stairs-go-back-button'></button>
  // <section class='card-data-line'>
  //   <p>YOUR WEEKLY FLIGHTS CLIMBED</p>
  //   <h4 id='stairs-calendar-flights-average-weekly'>${user.calculateAverageFlightsThisWeek(todayDate)}</h4>
  // </section>
  // <section class='card-data-line'>
  //   <p>YOUR WEEKLY STAIRS CLIMBED</p>
  //   <h4 id='stairs-calendar-stairs-average-weekly'>${(user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0)}</h4>
  // </section>
  // `
}

// END OF STAIRS -----------------------------------------


function displayHydrationInfoSection() {
  const glasses = findTodayUserMetrics(hydrationInstances).ounces/8;
  domUpdate.updateHydrationInfoSection(hydrationInfoCard, glasses);
  // hydrationInfoCard.innerHTML = '';
  // hydrationInfoCard.innerHTML = 
  // `
  // <button aria-label='go-back' class='go-back-button hydration-go-back-button'></button>
  // <section class='card-data-line'>
  // <p>GLASSES OF WATER CONSUMED TODAY:</p>
  // <h4 id='hydration-info-glasses-today'>${findTodayUserMetrics(hydrationInstances).ounces/8}</h4>
  // </section>
  // `
}

function displayFriendsHydrationSection() {
  const friendsIntake = userRepository.calculateAverageDailyWater(todayDate);
  domUpdate.updateFriendsHydrationSection(hydrationFriendsCard, friendsIntake);
  // hydrationFriendsCard.innerHTML = '';
  // hydrationFriendsCard.innerHTML = 
  // `
  // <button aria-label='go-back' class='go-back-button hydration-go-back-button'></button>
  // <section class='card-data-line'>
  // <p>ALL USERS' AVERAGE DAILY OUNCES:</p>
  // <h4 id='hydration-friend-ounces-today'>${userRepository.calculateAverageDailyWater(todayDate)}</h4>
  // </section>
  // `
}

function displayHydrationCalendarSection() {
  const dailyOunces = displayDailyOunces();
  domUpdate.updateHydrationCalendarSection(hydrationCalendarCard, dailyOunces);
  // hydrationCalendarCard.innerHTML = '';
  // hydrationCalendarCard.innerHTML = 
  // `
  // <button aria-label='go-back' class='go-back-button hydration-go-back-button'>
  // </button>
  // <section class="display-hydration-calendar">
  // ${displayDailyOunces()}
  // </section>
  // `
}

function displayDailyOunces() {
  let elementSection = '';
  user.ouncesRecord.forEach((record, index) => {
  if (index === 1) {
    elementSection = 
    `
    <section 
      class='hydration-data-line'>
        <p 
          class='hydration-weekly-label'>
          YESTERDAY:
        </p>
        <h4 
          class='hydration-weekly-amount daily-oz' 
          id='hydration-calendar-ounces-1day'>
          ${user.returnTotalDailyOunces(record.date)} oz
        </h4>
    </section>
    ` 
  } else if(index > 1 && index < 7) {
    elementSection += 
    `
    <section 
      class='hydration-data-line'>
      <p 
        class='hydration-weekly-label'>
        ${index} DAYS AGO:</p>
      <h4 
        class='hydration-weekly-amount daily-oz' 
        id='hydration-calendar-ounces-1day'> 
        ${user.returnTotalDailyOunces(record.date)} oz
      </h4>
    </section>
    ` 
    }
  })
  return elementSection;
}

// END OF HYDRATION  -----------------------------------------

function displaySleepInfoSection() {
  sleepInfoCard.innerHTML = '';
  sleepInfoCard.innerHTML =
  `
  <button aria-label='go-back' class='go-back-button sleep-go-back-button'></button>
  <section class='card-data-line'>
    <p>SLEEP QUALITY LAST NIGHT</p>
    <h4 id='sleep-info-quality-today'>${findTodayUserMetrics(sleepInstances).sleepQuality}</h4>
  </section>
  <section class='card-data-line'>
    <p>OVERALL NUMBER OF HOURS AVERAGE</p>
    <h4 id='sleep-info-hours-average-alltime'>${user.hoursSleptAverage}</h4>
  </section>
  <section class='card-data-line'>
    <p>OVERALL SLEEP QUALITY AVERAGE</p>
    <h4 id='sleep-info-quality-average-alltime'>${user.sleepQualityAverage}</h4>
  </section>
  `
}

function displayFriendsSleepSection() {
  sleepFriendsCard.innerHTML = '';
  sleepFriendsCard.innerHTML =
  `
  <button aria-label='go-back' class='go-back-button sleep-go-back-button'></button>
  <section class='card-data-line'>
    <p>LAST NIGHT'S SUPERIOR SLEEPER</p>
    <h4 id='sleep-friend-longest-sleeper'>${getFriendSleeper('getLongestSleeper')}</h4>
  </section>
  <section class='card-data-line'>
    <p>LAST NIGHT'S INFERIOR SLEEPER</p>
    <h4 id='sleep-friend-worst-sleeper'>${getFriendSleeper('getWorstSleeper')}</h4>
  </section>
  `
}

function getFriendSleeper(type) {
  return userRepository.users.find(user => {
    return user.id === userRepository[type](todayDate, sleepInstances)
  }).getFirstName();
}

function displayCalendarSleepSection() {
  sleepCalendarCard.innerHTML = '';
  sleepCalendarCard.innerHTML =
  `
  <button aria-label='go-back' class='go-back-button sleep-go-back-button'></button>
  <section class='card-data-line'>
    <p>LAST WEEK'S HOURLY AVERAGE</p>
    <h4 id='sleep-calendar-hours-average-weekly'>${user.calculateAverageSleptHoursThisWeek(todayDate)}</h4>
  </section>
  <section class='card-data-line'>
    <p>LAST WEEK'S QUALITY AVERAGE</p>
    <h4 id='sleep-calendar-quality-average-weekly'>${user.calculateAverageSleptQualityThisWeek(todayDate)}</h4>
  </section>
  `
}
