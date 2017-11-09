import React, { Component } from 'react';
import { Button, StyleSheet, Text, View,  AppRegistry } from 'react-native';
import Mailer from 'react-native-mail';

class Mail extends Component{
  handleEmail = () => {
      Mailer.mail({
        subject: 'need help',
        recipients: ['support@example.com'],
        ccRecipients: ['supportCC@example.com'],
        bccRecipients: ['supportBCC@example.com'],
        body: '<b>A Bold Body</b>',
        isHTML: true,
        attachment: {
          path: 'C/Users/Madalina Marginean/Desktop/Marginean Madalina-Ileana',  // The absolute path of the file from which to read data.
          type: 'doc',   // Mime Type: jpg, png, doc, ppt, html, pdf
          name: '',   // Optional: Custom filename for attachment
        }
      }, (error, event) => {
        Alert.alert(
          error,
          event,
          [
            {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
            {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
          ],
          { cancelable: true }
        )
      });
    }

  render() {
    return (
      <View>
          <Button
            onPress={this.handleEmail}
            title="Email Me"
            color="#841584"
            accessabilityLabel="Purple Email Me Button"
          >
          <View>
            <Text>NEXT</Text>
          </View>
          </Button>
        </View>
    );
  }
};

export default Mail;
