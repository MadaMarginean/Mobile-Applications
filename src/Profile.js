import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View,  AppRegistry, Button, TextInput, Image } from 'react-native';
import email from 'react-native-email';

import AddComment from './AddComment';
import CommentList from './CommentList';
import ColorPhonePicker  from './ColorPhonePicker';
import { Actions } from 'react-native-router-flux';

import * as firebase from 'firebase';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Mail body: ' + this.props.phoneName,
                  name: ''};
  }

  handleEmail = (text) => {
    const to = ['madalina_marginean96@yahoo.com']
    email(to, {
      cc: [],
      bcc: '',
      subject: 'Show how to use',
      body: text
    }).catch(console.error)
  }

  deletePhone() {
    let mobilePath = "/Phone";
    let data = firebase.database().ref(mobilePath);

    Actions.home({user: 'business'});

    data.on('value', (item) => {
                let phones = item.val(); //bd
                let keys = Object.keys(phones);
                var items = [];

                for(var i = 0; i< keys.length; i++) {
                  var k = keys[i];

                  if (phones[k].name === this.props.phoneName) {
                    firebase.database().ref(mobilePath).child(k).remove();
                  }
                }
              });
  }

  updatePhone() {
    let mobilePath = "/Phone";
    let data = firebase.database().ref(mobilePath);

    Actions.addNewPhone();

    data.on('value', (item) => {
                let phones = item.val(); //bd
                let keys = Object.keys(phones);
                var items = [];

                for(var i = 0; i< keys.length; i++) {
                  var k = keys[i];

                  if (phones[k].name === this.props.phoneName) {
                    firebase.database().ref(mobilePath).child(k).remove();
                  }
                }
              });
  }

  render() {
    console.log(this.props.user);
    return (
      <ScrollView /*accessible={true}*/>
        <Text>{this.props.phoneName}</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Button title="Send Mail" onPress={() => this.handleEmail(this.state.text)} />
        <Image
        style={{width: 150, height: 150, marginLeft: 100}}
        source={this.props.image}
        />
        <ColorPhonePicker />
        {this.props.user === 'business' ?
          <View>
            <Button title="Delete Phone" onPress={() => this.deletePhone()} />
            <Button title="Update Phone" onPress={() => this.updatePhone()} />
          </View> :
          null
        }
        <AddComment phoneId={this.props.phoneId} commList={this.props.commList} />
        <CommentList phoneId={this.props.phoneId} commList={this.props.commList} />
      </ScrollView>
    );
  }
}

export default Profile;
