const getData = (path) => {
  return fetch(path)
    .then(response => response.json())
    .catch(err => console.log(err))
}

const addData = (path, data) => {
  return fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .catch(err => console.log(err))
}

const apiCalls = {

  getUserData: () => {
    return getData('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/users/userData');
  },

  getSleepData: () => {
    return getData('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData');
  },

  getActivityData: () => {
    return getData('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData');
  },

  getHydrationData: () => {
    return getData('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData');
  },

  addSleepData: (sleepData) => {
    return addData('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData', sleepData);
  },

  addActivityData: (activityData) => {
    return addData('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData', activityData);
  },

  addHydrationData: (hydrationData) => {
    return addData('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData', hydrationData);
  }
  
}

export default apiCalls;
