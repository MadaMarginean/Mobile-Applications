import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import s5img from './assets/Samsung_Galaxy_S5.png';
import s6img from './assets/Samsung_Galaxy_S6_S6_Edge_and_S6_Edge_Plus.png';
import s7img from './assets/Samsung_Galaxy_S7_and_S7_Edge.png';
import Chart from './Chart';

class Home extends Component {
  state = {
    phones: [
      {
        id: 1,
        name: "Samsung Galaxy S5",
        list: [],
        image: s5img
      },
      {
        id: 2,
        name: "Samsung Galaxy S6",
        list: [],
        image: s6img
      },
      {
        id: 4,
        name: "Samsung Galaxy S7",
        list: [],
        image: s7img
      }
    ]
  }

  goPhone = (name, id, list, image) => {
    Actions.profile({phoneId: id, phoneName: name, commList: list, image: image});
  }

  render() {
    return (
      <View>
          {this.state.phones.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => this.goPhone(item.name, item.id, item.list, item.image)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          ))}
          <Chart />
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
