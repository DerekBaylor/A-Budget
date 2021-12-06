import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import firebaseConfig from '../api/apiKeys';
import SideNav from '../components/SideNav';

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
        } else if (userInfo !== firebaseConfig.adminUid) {
          setAdmin(null);
          setUser(userInfo);
        }
      } else if (user || user === null) {
        setUser(null);
        setAdmin(null);
      }
    });
  }, []);

  return (
    <div className="App">
      <h2>INSIDE APP COMPONENT</h2>
      <SideNav admin={admin} />
    </div>
  );
}

export default Initialize;
