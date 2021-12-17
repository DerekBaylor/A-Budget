import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseURL = firebaseConfig.databaseURL;

const getAssets = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/assets.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const deleteAsset = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios
    .delete(`${baseURL}/assets/${firebaseKey}.json`)
    .then(() => getAssets(uid).then(resolve))
    .catch(reject);
});

const updateAsset = (firebaseKey, updateObj, uid) => new Promise((resolve, reject) => {
  axios
    .patch(`${baseURL}/assets/${firebaseKey}.json`, updateObj)
    .then(() => getAssets(uid).then(resolve))
    .catch(reject);
});

const createAsset = (obj, uid) => new Promise((resolve, reject) => {
  axios
    .post(`${baseURL}/assets.json`, obj)
    .then((response) => {
      const firebaseKey = response.data.name;
      axios
        .patch(`${baseURL}/assets/${firebaseKey}.json`, {
          firebaseKey,
        })
        .then(() => {
          getAssets(uid).then(resolve);
        });
    })
    .catch(reject);
});

export {
  getAssets, deleteAsset, updateAsset, createAsset,
};
