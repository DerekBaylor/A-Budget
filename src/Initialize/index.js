// import React, { useEffect, useState } from 'react';
// import firebase from 'firebase';
// import firebaseConfig from '../api/apiKeys';
import React from 'react';
import SideNav from '../components/SideNav';
import Routes from '../routes';

function Initialize() {
  return (
    <div className="App">
      <SideNav />
      <Routes />
    </div>
  );
}

export default Initialize;
