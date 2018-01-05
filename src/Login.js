import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    processColor,
    TextInput,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';

import * as firebase from 'firebase';

import Home from './Home';
import AddComment from './AddComment';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      authenticating: false,
      error: 'no',
      businessClients: []
    }
  }

  componentWillMount() {
    let userPath = "/BusinessClient";
    let data = firebase.database().ref(userPath);

    data.on('value', (item) => {
                let users = item.val(); //bd
                let keys = Object.keys(users);
                let items = [];

                for(var i = 0; i< keys.length; i++) {
                  var k = keys[i];

                  items.push(users[k]);
                }
                this.setState({businessClients: items});
                console.log(this.state.businessClients);
              });
  }

  checkBusiness(email, password) {
    this.state.businessClients.map((item) => {item.email == email && item.password == password ?
      Actions.home({user: 'business'}) : Actions.home({user: 'personal'})});
  }

  changeEmail(email) {
    this.setState({email});
  }

  changePassword(password) {
    this.setState({password});
  }

  buttonPressed() {
    this.setState({ error: '', authenticating: true });

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.setState({ error: '', authenticating: false });
                this.checkBusiness(this.state.email, this.state.password);
            })
            .catch(() => { //Login was not successful, let's create a new account
                firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                    .then(() => { this.setState({ error: '', authenticating: false }); })
                    .catch(() => {
                        this.setState({ error: 'Authentication failed.', authenticating: false });
                    });
            });
  }

  renderCurrentState() {
      return (
        <View>
          <Text style={styles.title}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder='Email'
              value={this.state.email}
              onChangeText={(email) => this.changeEmail(email)}
            />
            <TextInput
              style={styles.input}
              placeholder='Password'
              value={this.state.password}
              secureTextEntry
              onChangeText={(password) => this.changePassword(password)}
            />
            <TouchableHighlight
              style={styles.button}
              onPress={() => this.buttonPressed()}>
                <Text style={styles.textButton}>Sing In</Text>
            </TouchableHighlight>
          </View>
      );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderCurrentState()}
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      marginTop: 160
    },
    input: {
      paddingRight: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      fontSize: 18,
      color: '#333',
      fontWeight: '700',
      width: '100%',
    },
    button: {
      backgroundColor: 'blue',
      paddingTop: 15,
      paddingBottom: 15,
      marginTop: 20,
    },
    textButton: {
      textAlign: 'center',
      color: 'white',
    },
    title: {
      textAlign: 'center',
      fontSize: 20,
      marginBottom: 20
    }
  });
