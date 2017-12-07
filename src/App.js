import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Home from './Home';
import Profile from './Profile';
import AddComment from './AddComment';

const App = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="home"
          component={Home}
          title="Home"
        />
        <Scene
          key="profile"
          component={Profile}
          title="Phone Specification"
        />
        <Scene
          key="update"
          component={AddComment}
          title="Update Comment"
        />
      </Scene>
    </Router>
  );
}

export default App;
