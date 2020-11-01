
const domUpdate = {
  toggleElement: (element) => {
    element.classList.toggle('show-modal');
  },

  clearInputFields: (inputs) => {
    inputs.forEach(input => input.value = '')
  },

  displayAlertMessage: (sleepInput, activityInput, hydrationInput) => {
    window.alert(`The following data has been added to your Fitlit:\n Hours of Sleep: ${sleepInput.hoursSlept}\n Sleep Quality: ${sleepInput.sleepQuality}\n Number of Steps: ${activityInput.numSteps}\n Minutes Active: ${activityInput.minutesActive}\n Flights of Stairs: ${activityInput.flightsOfStairs}\n Ounces of Water: ${hydrationInput.numOunces}`)
  },

  displayProfileDropDown : (element, name, user, steps) => {
    element.classList.toggle('hide');
    element.innerHTML = '';
    element.innerHTML =
    `
    <h4 id='dropdown-name'>${name}</h4>
    <p class='dropdown-p' id='dropdown-email'> EMAIL | ${user.email}</p>
    <p class='dropdown-p' id='dropdown-goal'> DAILY STEP GOAL | ${user.dailyStepGoal}</p>
    <br/>
    <p class='dropdown-p' id='dropdown-friends'>FRIENDS TOTAL STEPS THIS WEEK</p>
    <section id='dropdown-friends-steps-container'>
    ${steps}</section>
    `
  },

  updateFriendsSteps : (records) => {
    let element = '';
    records.forEach(friend => {
      element +=
      `
      <p class='dropdown-p friends-steps'>${friend.firstName} |  ${friend.totalWeeklySteps}</p>
      `
    });
    return element;
  },

  updateDropdownTextColor: (element) => {
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
  },

  flipCard: (cardToHide, cardToShow) => {
    cardToHide.classList.add('hide');
    cardToShow.classList.remove('hide');
  },

  updateStepsInfoSection: (element, min, miles) => {
    element.innerHTML = '';
    element.innerHTML =
    `
    <button aria-label='go-back' class='go-back-button steps-go-back-button'></button>
    <section class='card-data-line'>
      <p>TOTAL ACTIVE MINUTES TODAY:</p>
      <h3 id='steps-info-active-minutes-today'>${min}</h3>
    </section>
    <section class='card-data-line'>
      <p>TOTAL MILES WALKED TODAY:</p>
      <h3 id='steps-info-miles-walked-today'>${miles}</h3>
    </section>
    `
  },

  updateFriendsStepsSection: (element, min, steps, goal) => {
    element.innerHTML = '';
    element.innerHTML =
    `
    <button aria-label='go-back' class='go-back-button steps-go-back-button'></button>
    <section class='card-data-line'>
      <p>ALL USERS' AVERAGE ACTIVE MINUTES TODAY:</p>
      <h3 id='steps-friend-active-minutes-average-today'>${min}</h3>
    </section>
    <section class='card-data-line'>
      <p>ALL USERS' AVERAGE STEPS TODAY:</p>
      <h3 id='steps-friend-steps-average-today'>${steps}</h3>
    </section>
    <section class='card-data-line'>
      <p>ALL USERS' AVERAGE STEP GOAL:</p>
      <h3 id='steps-friend-average-step-goal'>${goal}</h3>
    `
  },
  updateCalendarStepsSection: (element, min, steps) => {

    element.innerHTML = '';
    element.innerHTML =
    `
    <button aria-label='go-back' class='go-back-button steps-go-back-button'></button>
    <section class='card-data-line'>
      <p>YOUR WEEKLY AVERAGE MINUTES:</p>
      <h3 id='steps-calendar-total-active-minutes-weekly'>${min}</h3>
    </section>
    <section class='card-data-line'>
      <p>YOUR TOTAL WEEKLY STEP COUNT:</p>
      <h3 id='steps-calendar-total-steps-weekly'>${steps}</h3>
    </section>
    `
  },

  updateTrendingStepSection: (element, user) => {

    element.innerHTML = '';
    element.innerHTML =
    `
    <button aria-label='go-back' class='go-back-button steps-go-back-button'></button>
    <section class='card-data-line trending-steps-phrase-container'>
      <p class='trend-line'>${user.trendingStepDays[0]}</p>
    </section>
    `
  },

  updateStairsInfoSection: (element, flights) => {
    element.innerHTML = '';
    element.innerHTML =   `
    <button aria-label='go-back' class='go-back-button stairs-go-back-button'></button>
    <section class='card-data-line'>
      <p>FLIGHTS CLIMBED TODAY</p>
      <h3 id='stairs-info-flights-today'>${flights}</h3>
    </section>
    `
  },

  updateFriendsStairsSection: (element, avgFlights) => {
    element.innerHTML = ''
    element.innerHTML =
    `
    <button aria-label='go-back' class='go-back-button stairs-go-back-button'></button>
    <section class='card-data-line'>
      <p>ALL USERS' AVERAGE FLIGHTS TODAY</p>
      <h3 id='stairs-friend-flights-average-today'>${avgFlights}</h3>
    `
  },

  updateTrendingStairsSection: (element, trendingStairs) => {
    element.innerHTML = '';
    element.innerHTML =
    `
    <button aria-label='go-back' class='go-back-button stairs-go-back-button'></button>
    <section class='card-data-line trending-stairs-phrase-container'>
    ${trendingStairs}
    </section>
    `
  },

  updateTrendingStairs: (message) => {
    let element = '';
    return element = `<p class='trend-line'>${message}</p>`
  },

  updateCalendarStairsSection: (element, avgFlights, avgStairs) => {
    element.innerHTML = '';
    element.innerHTML =
    `
    <button aria-label='go-back' class='go-back-button stairs-go-back-button'></button>
    <section class='card-data-line'>
      <p>YOUR WEEKLY FLIGHTS CLIMBED</p>
      <h3 id='stairs-calendar-flights-average-weekly'>${avgFlights}</h3>
    </section>
    <section class='card-data-line'>
      <p>YOUR WEEKLY STAIRS CLIMBED</p>
      <h3 id='stairs-calendar-stairs-average-weekly'>${avgStairs}</h3>
    </section>
    `
  },

  updateHydrationInfoSection: (element, glasses) => {
    element.innerHTML = '';
    element.innerHTML =
    `
    <button aria-label='go-back' class='go-back-button hydration-go-back-button'></button>
    <section class='card-data-line'>
    <p>GLASSES OF WATER CONSUMED TODAY:</p>
    <h3 id='hydration-info-glasses-today'>${glasses}</h3>
    </section>
    `
  },

  updateFriendsHydrationSection: (element, friendsIntake) => {
    element.innerHTML = '';
    element.innerHTML =
    `
    <button aria-label='go-back' class='go-back-button hydration-go-back-button'></button>
    <section class='card-data-line'>
    <p>ALL USERS' AVERAGE DAILY OUNCES:</p>
    <h3 id='hydration-friend-ounces-today'>${friendsIntake}</h3>
    </section>
    `
  },

  updateHydrationCalendarSection: (element, dailyOunces) => {
    element.innerHTML = '';
    element.innerHTML =
    `
    <button aria-label='go-back' class='go-back-button hydration-go-back-button'>
    </button>
    <section class="display-hydration-calendar">
    ${dailyOunces}
    </section>
    `
  },

  updateYesterdayOunces: (dailyOunces) => {
    let elementSection = '';
    return elementSection =
    `
      <section
        class='hydration-data-line'>
          <p
            class='hydration-weekly-label'>
            YESTERDAY:
          </p>
          <h3
            class='hydration-weekly-amount daily-oz'
            id='hydration-calendar-ounces-1day'>
            ${dailyOunces} oz
          </h3>
      </section>
    `
  },

  updatePastDailyOunces: (num, dailyOunces) => {
    let elementSection = '';
    return elementSection =
    `
      <section
        class='hydration-data-line'>
        <p
          class='hydration-weekly-label'>
          ${num} DAYS AGO:</p>
        <h3
          class='hydration-weekly-amount daily-oz'
          id='hydration-calendar-ounces-1day'>
          ${dailyOunces} oz
        </h3>
      </section>
    `
  },


  updateSleepInfoSection: (element, quality, avgHours, avgQuality) => {
    element.innerHTML = '';
    element.innerHTML =
    `
    <button aria-label='go-back' class='go-back-button sleep-go-back-button'></button>
    <section class='card-data-line'>
      <p>SLEEP QUALITY LAST NIGHT</p>
      <h3 id='sleep-info-quality-today'>${quality}</h3>
    </section>
    <section class='card-data-line'>
      <p>OVERALL NUMBER OF HOURS AVERAGE</p>
      <h3 id='sleep-info-hours-average-alltime'>${avgHours}</h3>
    </section>
    <section class='card-data-line'>
      <p>OVERALL SLEEP QUALITY AVERAGE</p>
      <h3 id='sleep-info-quality-average-alltime'>${avgQuality}</h3>
    </section>
    `
  },

  updateFriendsSleepSection: (element, longestSleeper, worstSleeper) => {
    element.innerHTML = '';
    element.innerHTML =
    `
    <button aria-label='go-back' class='go-back-button sleep-go-back-button'></button>
    <section class='card-data-line'>
      <p>LAST NIGHT'S SUPERIOR SLEEPER</p>
      <h3 id='sleep-friend-longest-sleeper'>${longestSleeper}</h3>
    </section>
    <section class='card-data-line'>
      <p>LAST NIGHT'S INFERIOR SLEEPER</p>
      <h3 id='sleep-friend-worst-sleeper'>${worstSleeper}</h3>
    </section>
    `
  },

  updateSleepCalendarSection: (element, avgHours, avgQuality) => {
    element.innerHTML = '';
    element.innerHTML =
    `
    <button aria-label='go-back' class='go-back-button sleep-go-back-button'></button>
    <section class='card-data-line'>
      <p>LAST WEEK'S HOURLY AVERAGE</p>
      <h3 id='sleep-calendar-hours-average-weekly'>${avgHours}</h3>
    </section>
    <section class='card-data-line'>
      <p>LAST WEEK'S QUALITY AVERAGE</p>
      <h3 id='sleep-calendar-quality-average-weekly'>${avgQuality}</h3>
    </section>
    `
  }

}

export default domUpdate;
