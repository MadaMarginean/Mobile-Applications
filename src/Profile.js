import React, { Component } from 'react';
import { StyleSheet, Text, View,  AppRegistry, Button, TextInput } from 'react-native';
import email from 'react-native-email';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Give body email' };
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

  render() {
    return (
      <View>
        <Text>{this.props.phoneName}</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Button title="Send Mail" onPress={() => this.handleEmail(this.state.text)} />
      </View>
    );
  }
}

export default Profile;
