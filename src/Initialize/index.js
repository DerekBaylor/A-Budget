import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import firebaseConfig from '../api/apiKeys';

function Initialize() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfo = {
          uid: authed.uid,
          name: authed.displayName,
        };
        setUser(userInfo);
        if (userInfo.uid === firebaseConfig.adminUid) {
          setAdmin(userInfo);
        }
      } else if (user || user === null) {
        setUser(null);
        setAdmin(null);
      }
    });
  }, []);

  console.warn(admin);

  return (
    <div className="App">
      <h2>INSIDE APP COMPONENT</h2>
    </div>
  );
}

export default Initialize;
