import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseURL = firebaseConfig.databaseURL;

const getExpenses = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/expenses.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const getSingleExpense = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/expenses/${firebaseKey}.json`)
    .then((response) => {
      resolve(response.data);
    })
    .catch(reject);
});

const deleteExpense = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios
    .delete(`${baseURL}/expenses/${firebaseKey}.json`)
    .then(() => getExpenses(uid).then(resolve))
    .catch(reject);
});

const updateExpense = (firebaseKey, updateObj, uid) => new Promise((resolve, reject) => {
  axios
    .patch(`${baseURL}/expenses/${firebaseKey}.json`, updateObj)
    .then(() => getExpenses(uid).then(resolve))
    .catch(reject);
});

const createExpense = (obj, uid) => new Promise((resolve, reject) => {
  axios
    .post(`${baseURL}/expenses.json`, obj)
    .then((response) => {
      const firebaseKey = response.data.name;
      axios
        .patch(`${baseURL}/expenses/${firebaseKey}.json`, {
          firebaseKey,
        })
        .then(() => {
          getExpenses(uid).then(resolve);
        });
    })
    .catch(reject);
});

export {
  getExpenses,
  getSingleExpense,
  deleteExpense,
  updateExpense,
  createExpense,
};
