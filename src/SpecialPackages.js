import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';

import oferta1 from './assets/oferta1.jpg';
import oferta2 from './assets/oferta2.jpg';
import oferta3 from './assets/oferta3.jpg';

class SpecialPackages extends Component {
  render() {
    return (
      <View>
        <Image
          style={{width: 150, height: 150, marginLeft: 100, marginTop: 20}}
          source={oferta1}
        />
        <Image
          style={{width: 150, height: 150, marginLeft: 100, marginTop: 20}}
          source={oferta2}
        />
        <Image
          style={{width: 150, height: 150, marginLeft: 100, marginTop: 20}}
          source={oferta3}
        />
      </View>
    );
  }
}

export default SpecialPackages;
