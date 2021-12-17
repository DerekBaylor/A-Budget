import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseURL = firebaseConfig.databaseURL;

const getGoals = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/goals.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const deleteGoal = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios
    .delete(`${baseURL}/goals/${firebaseKey}.json`)
    .then(() => getGoals(uid).then(resolve))
    .catch(reject);
});

const updateGoal = (firebaseKey, updateObj, uid) => new Promise((resolve, reject) => {
  axios
    .patch(`${baseURL}/goals/${firebaseKey}.json`, updateObj)
    .then(() => getGoals(uid).then(resolve))
    .catch(reject);
});

const createGoal = (obj, uid) => new Promise((resolve, reject) => {
  axios
    .post(`${baseURL}/goals.json`, obj)
    .then((response) => {
      const firebaseKey = response.data.name;
      axios
        .patch(`${baseURL}/goals/${firebaseKey}.json`, {
          firebaseKey,
        })
        .then(() => {
          getGoals(uid).then(resolve);
        });
    })
    .catch(reject);
});

export {
  getGoals, deleteGoal, updateGoal, createGoal,
};
