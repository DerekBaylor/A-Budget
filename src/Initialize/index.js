import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import SideNav from '../components/SideNav';
import Routes from '../routes';
import SignInView from '../views/SignInView';

function Initialize() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObj = {
          fullName: authed.displayName,
          uid: authed.uid,
        };
        setUser(userInfoObj);
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  return (
    <div className="App">
      {user ? (
        <>
          <SideNav />
          <Routes uid={user.uid} />
        </>
      ) : (
        <SignInView />
      )}
    </div>
  );
}

export default Initialize;
