import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class Home extends Component {
  state = {
    phones: [
      {
        id: 1,
        name: "Samsung Galaxy S5",
      },
      {
        id: 2,
        name: "Samsung Galaxy S6",
      },
      {
        id: 3,
        name: "Samsung Galaxy S7",
      }
    ]
  }

  goPhone = (name) => {
    Actions.profile({phoneName: name});
  }

  render() {
    return (
      <View>
          {this.state.phones.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => this.goPhone(item.name)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          ))}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(253,253,253)',
  },
  holder: {
    flex: 0.25,
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
  },
});

export default Home;
