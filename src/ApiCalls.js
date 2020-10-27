class ApiCalls {

  getData(path) {
    return fetch(path)
    .then(response => response.json())
    .catch(err => console.log(err))
  }

  getUserData() {
    return this.getData('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/users/userData');
  }

  getSleepData() {
    return this.getData('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData');
  }

  getActivityData() {
    return this.getData('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData');
  }

  getHydrationData() {
    return this.getData('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData');
  }

  addData(path, data) {
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

  addSleepData(sleepData) {
    return this.addData('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData', sleepData);
  }

  addActivityData(activityData) {
    return this.addData('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData', activityData);
  }

  addHydrationData(hydrationData) {
    return this.addData('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData', hydrationData);
  }
  
}

export default ApiCalls;
