import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import * as firebase from 'firebase';

import Home from './Home';
import Profile from './Profile';
import AddComment from './AddComment';
import Login from './Login';
import Chart from './Chart';
import SpecialPackages from './SpecialPackages';
import AddNewPhone from './AddNewPhone';

class App extends Component {
  componentWillMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyDxrxKL6CRq8UDDbC0wQ6ZusdooYGp4v8w",
      authDomain: "mobile-applications-e8da2.firebaseapp.com",
      databaseURL: "https://mobile-applications-e8da2.firebaseio.com",
      projectId: "mobile-applications-e8da2",
      storageBucket: "mobile-applications-e8da2.appspot.com",
      messagingSenderId: "447954818796"
    }

    firebase.initializeApp(firebaseConfig);
  }

  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="login"
            component={Login}
            title="Login"
          />
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
          <Scene
            key="chart"
            component={Chart}
            title="Chart"
          />
          <Scene
            key="business"
            component={SpecialPackages}
            title="Special Packages"
          />
          <Scene
            key="addNewPhone"
            component={AddNewPhone}
            title="Add a new Phone"
          />
        </Scene>
      </Router>
    );
  }
}

export default App;
