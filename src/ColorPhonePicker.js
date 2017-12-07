import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  Text,
  View,
  Picker,
  Item
} from 'react-native';

class ColorPhonePicker extends Component {
  state = {
    language: ''
  }

  render() {
    return (
      <Picker
        selectedValue={this.state.language}
        onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
        <Picker.Item label="White" value="white" />
        <Picker.Item label="Black" value="black" />
        <Picker.Item label="Silver" value="Silver" />
        <Picker.Item label="Gold" value="gold" />
      </Picker>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20
  },
  picker: {
    width: 20,
    height: 20
  }
})

export default ColorPhonePicker;
