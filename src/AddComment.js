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

class AddComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title ? this.props.title :  '',
      subtitle: this.props.subtitle ? this.props.subtitle : '',
      comment: this.props.comment ? this.props.comment : '',
      list: this.props.commList
    }
  }

  changeTitle(title) {
    this.setState({title});
  }

  changeSubtitle(subtitle) {
    this.setState({subtitle});
  }

  changeComment(comment) {
    this.setState({comment});
  }

  buttonPressed() {
    const arrayData = [];
    if (this.state.title && this.state.subtitle && this.state.comment) {
        const data = {
          title: this.state.title,
          subtitle: this.state.subtitle,
          comment: this.state.comment
        }
        arrayData.push(data);
        var destinationArray;

        try {
          AsyncStorage.getItem(`phone_${this.props.phoneId}`).then((value) => {
            if (value !== null) {
              const d = JSON.parse(value);
              d.push(data);
              let p = [];
              AsyncStorage.setItem(`phone_${this.props.phoneId}`, JSON.stringify(d)).then(
                () => {
                  destinationArray = Array.from(d);
                  this.setState({list: arrayData});
              })
            }
            else {
              let p = [];
              AsyncStorage.setItem(`phone_${this.props.phoneId}`, JSON.stringify(arrayData))
                .then(() => {
                  destinationArray = Array.from(arrayData);
                  this.setState({list: arrayData});
              })
            }
          })
        }
        catch(err) {
          console.log("The comment must have title, subtitle and comment text!");
        }
    }
    else {
      console.log("Error!");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Add a comment</Text>
          <TextInput
            style={styles.input}
            placeholder='Title'
            value={this.state.title}
            onChangeText={(title) => this.changeTitle(title)}
          />
          <TextInput
            style={styles.input}
            placeholder='Subitle'
            value={this.state.subtitle}
            onChangeText={(subtitle) => this.changeSubtitle(subtitle)}
          />
          <TextInput
            multiLine={true}
            style={[styles.input, styles.textArea]}
            placeholder='Comment'
            value={this.state.comment}
            onChangeText={(comment) => this.changeComment(comment)}
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
  },
  textArea: {
    height: 60
  }
})

export default AddComment;
