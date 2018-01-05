import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ListView,
  ListItem,
  Button
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import * as firebase from 'firebase';

import s5img from './assets/Samsung_Galaxy_S5.png';
import s6img from './assets/Samsung_Galaxy_S6_S6_Edge_and_S6_Edge_Plus.png';
import s7img from './assets/Samsung_Galaxy_S7_and_S7_Edge.png';
import Chart from './Chart';

class Home extends Component {
  state = {
    phones: []
      // {
      //   id: 1,
      //   name: "Samsung Galaxy S5",
      //   list: [],
      //   image: s5img
      // },
      // {
      //   id: 2,
      //   name: "Samsung Galaxy S6",
      //   list: [],
      //   image: s6img
      // },
      // {
      //   id: 4,
      //   name: "Samsung Galaxy S7",
      //   list: [],
      //   image: s7img
      // }
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let mobilePath = "/Phone";
    let data = firebase.database().ref(mobilePath);

    data.on('value', (item) => {
                let phones = item.val(); //bd
                let keys = Object.keys(phones);
                var items = [];

                for(var i = 0; i< keys.length; i++) {
                  var k = keys[i];

                  items.push(phones[k]);
                }
                this.setState({phones: items});
              });
  }

  goPhone = (name, id, list, image) => {
    Actions.profile({phoneId: id, phoneName: name, commList: list, image: image, user: this.props.user});
  }

  goToChart = () => {
    Actions.chart();
  }

  goToSpecialPackages = () => {
    Actions.business();
  }

  addItem = () => {
    Actions.addNewPhone();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.phones.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => this.goPhone(item.name, item.id, item.list, item.image)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.buttonChart}
          onPress={() => this.goToChart()}>
          <Text>See chart</Text>
        </TouchableOpacity>
        {this.props.user === 'business' ?
          <View>
            <TouchableOpacity
              style={styles.buttonAdd}
              onPress={() => this.addItem()}>
                <Text>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonSpecial}
              onPress={() => this.goToSpecialPackages()}>
                <Text>Special Packages</Text>
            </TouchableOpacity>
          </View> : null
        }
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  holder: {
    flex: 0.25,
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
  },
  buttonChart: {
    backgroundColor: 'gold',
    paddingTop: 25,
    paddingBottom: 15,
    width: 150,
    marginTop: 100
  },
  buttonSpecial: {
    backgroundColor: 'orange',
    paddingTop: 25,
    paddingBottom: 15,
    width: 150,
    marginTop: 100,
    marginLeft: 180
  },
  buttonAdd: {
    backgroundColor: 'grey',
    paddingTop: 15,
    paddingBottom: 15,
    width: 50,
    marginTop: -170,
    marginLeft: 230,
    textAlign: 'center',
    fontSize: 50
  },
});

export default Home;
