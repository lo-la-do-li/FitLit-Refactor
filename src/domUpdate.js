
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
  }


}

export default domUpdate;