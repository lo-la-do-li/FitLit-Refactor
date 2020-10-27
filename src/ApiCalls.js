class ApiCalls {
  getUserData() {
    return fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/users/userData')
    .then(response => response.json())
    .catch(err => console.log(err))
  }

  getSleepData() {
    return fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData')
    .then(response => response.json())
    .catch(err => console.log(err))
  }

  getActivityData() {
    return fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData')
    .then(response => response.json())
    .catch(err => console.log(err))
  }

  getHydrationData() {
    return fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData')
    .then(response => response.json())
    .catch(err => console.log(err))
  }

  addSleepData(data) {
    return fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(err => console.log(err))
  }

  addActivityData(data) {
    return fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(err => console.log(err))
  }

  addHydrationData(data) {
    return fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(err => console.log(err))
  }
}

export default ApiCalls;
