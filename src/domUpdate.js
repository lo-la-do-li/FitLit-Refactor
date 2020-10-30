
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

}

export default domUpdate;