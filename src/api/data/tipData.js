import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseURL = firebaseConfig.databaseURL;

const getTips = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/tips.json?`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});
const getSingleTip = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/tips/${firebaseKey}.json`)
    .then((response) => {
      resolve(response.data);
    })
    .catch(reject);
});

const deleteTip = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .delete(`${baseURL}/tips/${firebaseKey}.json`)
    .then(() => getTips().then(resolve))
    .catch(reject);
});

const updateTip = (firebaseKey, updateObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${baseURL}/tips/${firebaseKey}.json`, updateObj)
    .then(() => getTips().then(resolve))
    .catch(reject);
});

const createTip = (obj) => new Promise((resolve, reject) => {
  axios
    .post(`${baseURL}/tips.json`, obj)
    .then((response) => {
      const firebaseKey = response.data.name;
      axios
        .patch(`${baseURL}/tips/${firebaseKey}.json`, {
          firebaseKey,
        })
        .then(() => {
          getTips().then(resolve);
        });
    })
    .catch(reject);
});

export {
  getTips, getSingleTip, deleteTip, updateTip, createTip,
};
