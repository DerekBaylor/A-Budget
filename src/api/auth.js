import firebase from 'firebase/app';

// These helpers allow you to login and out of FB auth with Google. These are Firebase methods and is broilerplate code.

const signInUser = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};
const signOutUser = () => new Promise((resolve, reject) => {
  firebase.auth().signOut().then(resolve).catch(reject);
});
export { signInUser, signOutUser };
