import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseURL = firebaseConfig.databaseURL;

const getIncomes = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/income.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const getSingleIncome = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/income/${firebaseKey}.json`)
    .then((response) => {
      resolve(response.data);
    })
    .catch(reject);
});

const deleteIncome = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios
    .delete(`${baseURL}/income/${firebaseKey}.json`)
    .then(() => getIncomes(uid).then(resolve))
    .catch(reject);
});

const updateIncome = (firebaseKey, updateObj, uid) => new Promise((resolve, reject) => {
  axios
    .patch(`${baseURL}/income/${firebaseKey}.json`, updateObj)
    .then(() => getIncomes(uid).then(resolve))
    .catch(reject);
});

const createIncome = (obj, uid) => new Promise((resolve, reject) => {
  axios
    .post(`${baseURL}/income.json`, obj)
    .then((response) => {
      const firebaseKey = response.data.name;
      axios
        .patch(`${baseURL}/income/${firebaseKey}.json`, {
          firebaseKey,
        })
        .then(() => {
          getIncomes(uid).then(resolve);
        });
    })
    .catch(reject);
});

export {
  getIncomes,
  getSingleIncome,
  deleteIncome,
  updateIncome,
  createIncome,
};
