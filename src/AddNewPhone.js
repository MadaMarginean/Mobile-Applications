import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import * as firebase from 'firebase';

class AddNewPhone extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: '',
      name: '',
      image: '',
      stock: ''
    }
  }

  changeId(id) {
    this.setState({id});
  }

  changeName(name) {
    this.setState({name});
  }

  changeImage(image) {
    this.setState({image});
  }

  changeStock(stock) {
    this.setState({stock});
  }

  buttonPressed() {
    Actions.home({user: 'business'});

    var database = firebase.database();
    var ref = database.ref('/Phone');

    if (this.state.id && this.state.name && this.state.stock && this.state.image) {
      ref.push(this.state);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Add new phone</Text>
          <TextInput
            style={styles.input}
            placeholder='Id'
            value={this.state.id}
            onChangeText={(id) => this.changeId(id)}
          />
          <TextInput
            style={styles.input}
            placeholder='Name'
            value={this.state.name}
            onChangeText={(name) => this.changeName(name)}
          />
          <TextInput
            style={styles.input}
            placeholder='Image'
            value={this.state.image}
            onChangeText={(image) => this.changeImage(image)}
          />
          <TextInput
            style={styles.input}
            placeholder='Stock'
            value={this.state.stock}
            onChangeText={(stock) => this.changeStock(stock)}
          />
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.buttonPressed()}>
              <Text style={styles.textButton}>Add</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  button: {
    backgroundColor: 'blue',
    paddingTop: 15,
    paddingBottom: 15
  },
  textButton: {
    textAlign: 'center',
    color: 'white'
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 5
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 2,
    marginBottom: 20
  }
})

export default AddNewPhone;
