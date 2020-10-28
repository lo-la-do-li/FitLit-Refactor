// import './css/base.scss';
import './css/styles.scss';
// import './src/index.js';

import userData from './data/users';
import activityData from './data/activity';
import sleepData from './data/sleep';
import hydrationData from './data/hydration';

import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';


//Instances of classes

const users = userData.map(user => new User(user));
let userRepository = new UserRepository(users);

const activityInstances = activityData.map(data => new Activity(data, userRepository));

const hydrationInstances = hydrationData.map(data => new Hydration(data, userRepository));

const sleepInstances = sleepData.map(data => new Sleep(data, userRepository));

let user = userRepository.users[0];
let todayDate = "2019/09/22";
user.findFriendsNames(userRepository.users);

let sortedHydrationDataByDate = user.ouncesRecord.sort((a, b) => {
  if (Object.values(a)[0] > Object.values(b)[0]) {
    return -1;
  }
  if (Object.values(a)[0] < Object.values(b)[0]) {
    return 1;
  }
  return 0;
});

//querySelectors

// let dropdownEmail = document.querySelector('#dropdown-email');
// let dropdownFriendsStepsContainer = document.querySelector('#dropdown-friends-steps-container');
// let dropdownGoal = document.querySelector('#dropdown-goal');
// let dropdownName = document.querySelector('#dropdown-name');
// let stepsCalendarTotalActiveMinutesWeekly = document.querySelector('#steps-calendar-total-active-minutes-weekly');
// let stepsCalendarTotalStepsWeekly = document.querySelector('#steps-calendar-total-steps-weekly');
// let stepsFriendAverageStepGoal = document.querySelector('#steps-friend-average-step-goal');
// let stepsInfoActiveMinutesToday = document.querySelector('#steps-info-active-minutes-today');
// let stepsInfoMilesWalkedToday = document.querySelector('#steps-info-miles-walked-today');
// let stepsFriendActiveMinutesAverageToday = document.querySelector('#steps-friend-active-minutes-average-today');
// let stepsFriendStepsAverageToday = document.querySelector('#steps-friend-steps-average-today');
// let stepsTrendingButton = document.querySelector('.steps-trending-button');
// let trendingStepsPhraseContainer = document.querySelector('.trending-steps-phrase-container');
let dailyOz = document.querySelectorAll('.daily-oz');
let headerName = document.querySelector('#header-name');
let hydrationCalendarCard = document.querySelector('#hydration-calendar-card');
let hydrationFriendOuncesToday = document.querySelector('#hydration-friend-ounces-today');
let hydrationFriendsCard = document.querySelector('#hydration-friends-card');
let hydrationInfoCard = document.querySelector('#hydration-info-card');
let hydrationInfoGlassesToday = document.querySelector('#hydration-info-glasses-today');
let hydrationMainCard = document.querySelector('#hydration-main-card');
let hydrationUserOuncesToday = document.querySelector('#hydration-user-ounces-today');
let mainPage = document.querySelector('main');
let profileButton = document.querySelector('#profile-button');
let sleepCalendarCard = document.querySelector('#sleep-calendar-card');
let sleepCalendarHoursAverageWeekly = document.querySelector('#sleep-calendar-hours-average-weekly');
let sleepCalendarQualityAverageWeekly = document.querySelector('#sleep-calendar-quality-average-weekly');
let sleepFriendLongestSleeper = document.querySelector('#sleep-friend-longest-sleeper');
let sleepFriendsCard = document.querySelector('#sleep-friends-card');
let sleepFriendWorstSleeper = document.querySelector('#sleep-friend-worst-sleeper');
let sleepInfoCard = document.querySelector('#sleep-info-card');
let sleepInfoHoursAverageAlltime = document.querySelector('#sleep-info-hours-average-alltime');
let sleepInfoQualityAverageAlltime = document.querySelector('#sleep-info-quality-average-alltime');
let sleepInfoQualityToday = document.querySelector('#sleep-info-quality-today');
let sleepMainCard = document.querySelector('#sleep-main-card');
let sleepUserHoursToday = document.querySelector('#sleep-user-hours-today');
let stairsCalendarCard = document.querySelector('#stairs-calendar-card');
let stairsCalendarFlightsAverageWeekly = document.querySelector('#stairs-calendar-flights-average-weekly');
let stairsCalendarStairsAverageWeekly = document.querySelector('#stairs-calendar-stairs-average-weekly');
let stepsMainCard = document.querySelector('#steps-main-card');
let stepsInfoCard = document.querySelector('#steps-info-card');
let stepsFriendsCard = document.querySelector('#steps-friends-card');
let stepsTrendingCard = document.querySelector('#steps-trending-card');
let stepsCalendarCard = document.querySelector('#steps-calendar-card');
let stairsFriendFlightsAverageToday = document.querySelector('#stairs-friend-flights-average-today');
let stairsFriendsCard = document.querySelector('#stairs-friends-card');
let stairsInfoCard = document.querySelector('#stairs-info-card');
let stairsInfoFlightsToday = document.querySelector('#stairs-info-flights-today');
let stairsMainCard = document.querySelector('#stairs-main-card');
let stairsTrendingButton = document.querySelector('.stairs-trending-button');
let stairsTrendingCard = document.querySelector('#stairs-trending-card');
let stairsUserStairsToday = document.querySelector('#stairs-user-stairs-today');
let stepsUserStepsToday = document.querySelector('#steps-user-steps-today');
let trendingStairsPhraseContainer = document.querySelector('.trending-stairs-phrase-container');
let userInfoDropdown = document.querySelector('#user-info-dropdown');

//eventListener
mainPage.addEventListener('click', showInfo);
profileButton.addEventListener('click', showDropdown);
stairsTrendingButton.addEventListener('click', updateTrendingStairsDays);

//Functions


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

function displayOnLoad() {
  displayMainStepsSection();
}
displayOnLoad()

function displayMainStepsSection() {
  stepsUserStepsToday.innerText = findTodayUserMetrics().steps;
  stairsUserStairsToday.innerText = findTodayUserMetrics().flightsOfStairs * 12;
}

function findTodayUserMetrics() {
  return activityInstances.find(activity => {
    return activity.userId === user.id && activity.date === todayDate;
  });
}


function flipCard(cardToHide, cardToShow) {
  cardToHide.classList.add('hide');
  cardToShow.classList.remove('hide');
}

function showDropdown() {
  userInfoDropdown.classList.toggle('hide');
  userInfoDropdown.innerHTML = '';
  userInfoDropdown.innerHTML =
  `
  <h5 id='dropdown-name'>${user.name[0].toUpperCase()}</h5>
  <p class='dropdown-p' id='dropdown-email'> EMAIL | ${user.email}</p>
  <p class='dropdown-p' id='dropdown-goal'> DAILY STEP GOAL | ${user.dailyStepGoal}</p>
  <br/>
  <p class='dropdown-p' id='dropdown-friends'>FRIENDS TOTAL STEPS THIS WEEK</p>
  <section id='dropdown-friends-steps-container'>
  ${displayFriendsSteps()}</section>
  `
  let friendsStepsParagraphs = document.querySelectorAll('.friends-steps');
  updateDropdowTextColor(friendsStepsParagraphs);
}

function displayFriendsSteps() {
  user.findFriendsTotalStepsForWeek(userRepository.users, todayDate);
  let element = '';
  user.friendsActivityRecords.forEach(friend => {
    element +=
    `
    <p class='dropdown-p friends-steps'>${friend.firstName} |  ${friend.totalWeeklySteps}</p>
    `
  });
  return element;
}

function updateDropdowTextColor(element) {
  element.forEach(paragraph => {
    if (element[0] === paragraph) {
      paragraph.classList.add('teal-text');
    }
    if (element[element.length - 1] === paragraph) {
      paragraph.classList.add('orange-text');
    }
    if (paragraph.innerText.includes('YOU')) {
      paragraph.classList.add('yellow-text');
    }
  });
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
    flipCard(stepsMainCard, stepsInfoCard);
    displayStepsInfoSection();
  } else if (event.target.classList.contains('steps-friends-button')) {
    flipCard(stepsMainCard, stepsFriendsCard);
    displayFriendsStepsSection();
  } else if (event.target.classList.contains('steps-trending-button')) {
    flipCard(stepsMainCard, stepsTrendingCard);
    displayTrendingStepSection();
  } else if (event.target.classList.contains('steps-calendar-button')) {
    flipCard(stepsMainCard, stepsCalendarCard);
    displayCalendarStepsSection();
  } else if (event.target.classList.contains('steps-go-back-button')) {
    flipCard(event.target.parentNode, stepsMainCard);
  }
}

function showHydrationInfo() {
  if (event.target.classList.contains('hydration-info-button')) {
    flipCard(hydrationMainCard, hydrationInfoCard);

  }
  if (event.target.classList.contains('hydration-friends-button')) {
    flipCard(hydrationMainCard, hydrationFriendsCard);
  }
  if (event.target.classList.contains('hydration-calendar-button')) {
    flipCard(hydrationMainCard, hydrationCalendarCard);
    displayDailyOunces();
  }
  if (event.target.classList.contains('hydration-go-back-button')) {
    flipCard(event.target.parentNode, hydrationMainCard);
  }
}

function showStairsInfo() {
  if (event.target.classList.contains('stairs-info-button')) {
    flipCard(stairsMainCard, stairsInfoCard);
    displayStairsInfoSection();
  } else if (event.target.classList.contains('stairs-friends-button')) {
    flipCard(stairsMainCard, stairsFriendsCard);
    displayFriendsStairsSection();
  } else if (event.target.classList.contains('stairs-trending-button')) {
    flipCard(stairsMainCard, stairsTrendingCard);

  } else if (event.target.classList.contains('stairs-calendar-button')) {
    flipCard(stairsMainCard, stairsCalendarCard);
  } else if (event.target.classList.contains('stairs-go-back-button')) {
    flipCard(event.target.parentNode, stairsMainCard);
  }
}

function showSleepInfo() {
  if (event.target.classList.contains('sleep-info-button')) {
    flipCard(sleepMainCard, sleepInfoCard);
  } else if (event.target.classList.contains('sleep-friends-button')) {
    flipCard(sleepMainCard, sleepFriendsCard);
  } else if (event.target.classList.contains('sleep-calendar-button')) {
    flipCard(sleepMainCard, sleepCalendarCard);
  } else if (event.target.classList.contains('sleep-go-back-button')) {
    flipCard(event.target.parentNode, sleepMainCard);
  }
}

function displayStepsInfoSection() {
  stepsInfoCard.innerHTML = '';
  stepsInfoCard.innerHTML =
  `
  <button aria-label='go-back' class='go-back-button steps-go-back-button'></button>
  <section class='card-data-line'>
    <p>TOTAL ACTIVE MINUTES TODAY:</p>
    <h4 id='steps-info-active-minutes-today'>${findActivityInstance().minutesActive}</h4>
  </section>
  <section class='card-data-line'>
    <p>TOTAL MILES WALKED TODAY:</p>
    <h4 id='steps-info-miles-walked-today'>${findActivityInstance().calculateMiles(userRepository)}</h4>
  </section>
  `
}

function findActivityInstance() {
  return activityInstances.find(activity => {
    return activity.userId === user.id && activity.date === todayDate;
  });
}

function displayFriendsStepsSection() {
  stepsFriendsCard.innerHTML = '';
  stepsFriendsCard.innerHTML =
  `
  <button aria-label='go-back' class='go-back-button steps-go-back-button'></button>
  <section class='card-data-line'>
    <p>ALL USERS' AVERAGE ACTIVE MINUTES TODAY:</p>
    <h4 id='steps-friend-active-minutes-average-today'>${userRepository.calculateAverageMinutesActive(todayDate)}</h4>
  </section>
  <section class='card-data-line'>
    <p>ALL USERS' AVERAGE STEPS TODAY:</p>
    <h4 id='steps-friend-steps-average-today'>${userRepository.calculateAverageSteps(todayDate)}</h4>
  </section>
  <section class='card-data-line'>
    <p>ALL USERS' AVERAGE STEP GOAL:</p>
    <h4 id='steps-friend-average-step-goal'>${userRepository.calculateAverageStepGoal()}</h4>
  `
}

function displayCalendarStepsSection() {
  stepsCalendarCard.innerHTML = '';
  stepsCalendarCard.innerHTML =
  `
  <button aria-label='go-back' class='go-back-button steps-go-back-button'></button>
  <section class='card-data-line'>
    <p>YOUR WEEKLY AVERAGE MINUTES:</p>
    <h4 id='steps-calendar-total-active-minutes-weekly'>${user.calculateAverageMinutesActiveThisWeek(todayDate)}</h4>
  </section>
  <section class='card-data-line'>
    <p>YOUR TOTAL WEEKLY STEP COUNT:</p>
    <h4 id='steps-calendar-total-steps-weekly'>${user.calculateAverageStepsThisWeek(todayDate)}</h4>
  </section>
  `
}

function displayTrendingStepSection() {
  user.findTrendingStepDays();
  stepsTrendingCard.innerHTML = '';
  stepsTrendingCard.innerHTML =
  `
  <button aria-label='go-back' class='go-back-button steps-go-back-button'></button>
  <section class='card-data-line trending-steps-phrase-container'>
    <p class='trend-line'>${user.trendingStepDays[0]}</p>
  </section>
  `
}

// END OF STEPS -----------------------------------------

// function displayStairsInfoSection() {
//   stairsInfoCard.innerHTML = '';
//   stairsInfoCard.innerHTML =
//   `
//   <section class='main-card-top-row'>
//     <button aria-label='stairs' class='info-button stairs-info-button'></button>
//     <h3>YOU HAVE CLIMBED</h3>
//     <button aria-label='friends-stairs' class='friends-button stairs-friends-button'></button>
//   </section>
//   <h2 id='stairs-user-stairs-today'>${findActivityInstance().flightsOfStairs * 12}</h2>
//   <section class='main-card-top-row'>
//     <button aria-label='stairs-trending' class='trending-button stairs-trending-button'></button>
//     <h3>STAIRS TODAY</h3>
//     <button aria-label='stairs-calendar' class='calendar-button stairs-calendar-button'></button>
//   `
// }
function displayStairsInfoSection() {
  stairsInfoCard.innerHTML = '';
  stairsInfoCard.innerHTML =
  `
  <button aria-label='go-back' class='go-back-button stairs-go-back-button'></button>
  <section class='card-data-line'>
    <p>FLIGHTS CLIMBED TODAY</p>
    <h4 id='stairs-info-flights-today'>${findActivityInstance().flightsOfStairs}</h4>
  </section>
  `
}

function displayFriendsStairsSection() {
  stairsFriendsCard.innerHTML = ''
  stairsFriendsCard.innerHTML =
  `
  <button aria-label='go-back' class='go-back-button stairs-go-back-button'></button>
  <section class='card-data-line'>
    <p>ALL USERS' AVERAGE FLIGHTS TODAY</p>
    <h4 id='stairs-friend-flights-average-today'>${(userRepository.calculateAverageStairs(todayDate) / 12).toFixed(1)}</h4>
    `
}

function displayTrendingStairsSection() {
  stairsTrendingCard.innerHTML = '';
  stairsTrendingCard.innerHTML =
  `
  <button aria-label='go-back' class='go-back-button stairs-go-back-button'></button>
  <section class='card-data-line trending-stairs-phrase-container'>
  ${updateTrendingStairsDays()}
  </section>
  `

}

function updateTrendingStairsDays() {
  let element = '';
  user.findTrendingStairsDays();
  return element = `<p class='trend-line'>${user.trendingStairsDays[0]}</p>`;
}

function displayDailyOunces() {
  user.ouncesRecord.forEach(record => {
    let index = user.ouncesRecord.indexOf(record);
    if (index < dailyOz.length) {
      dailyOz[index].innerText = user.returnTotalDailyOunces(record.date)
    }
  })
}

headerName.innerText = `${user.getFirstName()}'S `;

hydrationUserOuncesToday.innerText = hydrationInstances.find(hydration => {
  return hydration.userId === user.id && hydration.date === todayDate;
}).ounces;

hydrationFriendOuncesToday.innerText = userRepository.calculateAverageDailyWater(todayDate);

hydrationInfoGlassesToday.innerText = hydrationInstances.find(hydration => {
  return hydration.userId === user.id && hydration.date === todayDate;
}).ounces / 8;

sleepCalendarHoursAverageWeekly.innerText = user.calculateAverageSleptHoursThisWeek(todayDate);

sleepCalendarQualityAverageWeekly.innerText = user.calculateAverageSleptQualityThisWeek(todayDate);

sleepFriendLongestSleeper.innerText = userRepository.users.find(user => {
  return user.id === userRepository.getLongestSleepers(todayDate, sleepInstances)
}).getFirstName();

sleepFriendWorstSleeper.innerText = userRepository.users.find(user => {
  return user.id === userRepository.getWorstSleepers(todayDate, sleepInstances)
}).getFirstName();

sleepInfoHoursAverageAlltime.innerText = user.hoursSleptAverage;

sleepInfoQualityAverageAlltime.innerText = user.sleepQualityAverage;

sleepInfoQualityToday.innerText = sleepInstances.find(sleep => {
  return sleep.userId === user.id && sleep.date === todayDate;
}).sleepQuality;

sleepUserHoursToday.innerText = sleepInstances.find(sleep => {
  return sleep.userId === user.id && sleep.date === todayDate;
}).hoursSlept;

stairsCalendarFlightsAverageWeekly.innerText = user.calculateAverageFlightsThisWeek(todayDate);

stairsCalendarStairsAverageWeekly.innerText = (user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);

// stairsFriendFlightsAverageToday.innerText = (userRepository.calculateAverageStairs(todayDate) / 12).toFixed(1);

// stairsInfoFlightsToday.innerText = activityInstances.find(activity => {
//   return activity.userId === user.id && activity.date === todayDate;
// }).flightsOfStairs;
//


stairsCalendarFlightsAverageWeekly.innerText = user.calculateAverageFlightsThisWeek(todayDate);

stairsCalendarStairsAverageWeekly.innerText = (user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);

stairsTrendingButton.addEventListener('click', function() {
  user.findTrendingStairsDays();
  trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStairsDays[0]}</p>`;
});

// stepsCalendarTotalActiveMinutesWeekly.innerText = user.calculateAverageMinutesActiveThisWeek(todayDate);
//
// stepsCalendarTotalStepsWeekly.innerText = user.calculateAverageStepsThisWeek(todayDate);
//
// stepsTrendingButton.addEventListener('click', function()
//   user.findTrendingStepDays();
//   trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStepDays[0]}</p>`;
// });

// stepsFriendActiveMinutesAverageToday.innerText = userRepository.calculateAverageMinutesActive(todayDate);

// stepsFriendAverageStepGoal.innerText = `${userRepository.calculateAverageStepGoal()}`;

// stepsFriendStepsAverageToday.innerText = userRepository.calculateAverageSteps(todayDate);

// stepsInfoActiveMinutesToday.innerText = activityInstances.find(activity => {
//   return activity.userId === user.id && activity.date === todayDate;
// }).minutesActive;

// stepsUserStepsToday.innerText = activityInstances.find(activity => {
//   return activity.userId === user.id && activity.date === todayDate;
// }).steps;

// user.findFriendsTotalStepsForWeek(userRepository.users, todayDate);
