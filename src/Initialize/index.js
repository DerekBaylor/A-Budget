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
