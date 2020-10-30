
const domUpdate = {
  showDropDown : function (element, name, user, steps) {
    element.classList.toggle('hide');
    element.innerHTML = '';
    element.innerHTML =
    `
    <h5 id='dropdown-name'>${name}</h5>
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
      <h4 id='steps-info-active-minutes-today'>${min}</h4>
    </section>
    <section class='card-data-line'>
      <p>TOTAL MILES WALKED TODAY:</p>
      <h4 id='steps-info-miles-walked-today'>${miles}</h4>
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
      <h4 id='steps-friend-active-minutes-average-today'>${min}</h4>
    </section>
    <section class='card-data-line'>
      <p>ALL USERS' AVERAGE STEPS TODAY:</p>
      <h4 id='steps-friend-steps-average-today'>${steps}</h4>
    </section>
    <section class='card-data-line'>
      <p>ALL USERS' AVERAGE STEP GOAL:</p>
      <h4 id='steps-friend-average-step-goal'>${goal}</h4>
    `
  },
  updateCalendarStepsSection: (element, min, steps) => {

    element.innerHTML = '';
    element.innerHTML =
    `
    <button aria-label='go-back' class='go-back-button steps-go-back-button'></button>
    <section class='card-data-line'>
      <p>YOUR WEEKLY AVERAGE MINUTES:</p>
      <h4 id='steps-calendar-total-active-minutes-weekly'>${min}</h4>
    </section>
    <section class='card-data-line'>
      <p>YOUR TOTAL WEEKLY STEP COUNT:</p>
      <h4 id='steps-calendar-total-steps-weekly'>${steps}</h4>
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
      <h4 id='stairs-info-flights-today'>${flights}</h4>
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
      <h4 id='stairs-friend-flights-average-today'>${avgFlights}</h4>
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
      <h4 id='stairs-calendar-flights-average-weekly'>${avgFlights}</h4>
    </section>
    <section class='card-data-line'>
      <p>YOUR WEEKLY STAIRS CLIMBED</p>
      <h4 id='stairs-calendar-stairs-average-weekly'>${avgStairs}</h4>
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
    <h4 id='hydration-info-glasses-today'>${glasses}</h4>
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
    <h4 id='hydration-friend-ounces-today'>${friendsIntake}</h4>
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
  }

}

export default domUpdate;