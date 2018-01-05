import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
  Button,
  Picker,
  Item,
  TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.commList
    }
  }

  componentWillMount() {
    try{
      AsyncStorage.getItem(`phone_${this.props.phoneId}`).then((value) => {
        this.setState({
          list: JSON.parse(value)
        })
      })
    }
    catch(err) {
      console.log("Error!");
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.list != this.state.list) {
      try{
        AsyncStorage.getItem(`phone_${this.props.phoneId}`).then((value) => {
          this.setState({
            list: JSON.parse(value)
          })
        })
      }
      catch(err) {
        console.log("Error!");
      }
    }
  }

  deleteComment(data) {
    var array = this.state.list;
    var index = array.indexOf(data);

    array.splice(index, 1);
    this.setState({list: array});

    try {
      AsyncStorage.setItem(`phone_${this.props.phoneId}`, JSON.stringify(array))
        .then(() => {
          this.props.commList.push(array)
        })
    }
    catch(err) {
      console.log(err);
    }
  }

  updateComment(data) {
    var array = this.state.list;
    var index = array.indexOf(data);

    this.deleteComment(data);

    Actions.update({title: data.title, subtitle: data.subtitle,
      comment: data.comment, commList: this.state.list[index], phoneId: this.props.phoneId});
  }

  parseData() {
    if(this.state.list) {
      return this.state.list.map((data, i) => {
        return (
          <View key={i} style={styles.dataList}>
            <Text>Title: {data.title}</Text>
            <View>
              <Text>Subtitle: {data.subtitle}</Text>
            </View>
            <View>
              <Text>Comment: {data.comment}</Text>
            </View>
            <View>
            <TouchableHighlight
              style={styles.buttonDelete}
              onPress={() => this.deleteComment(data)}>
                <Text style={styles.textButton}>Delete</Text>
            </TouchableHighlight>
            </View>
            <View>
            <TouchableHighlight
              style={styles.buttonUpdate}
              onPress={() => this.updateComment(data)}>
                <Text style={styles.textButton}>Update</Text>
            </TouchableHighlight>
            </View>
          </View>
        )
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Comments list</Text>
          {this.parseData()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingLeft: 15,
    paddingRight: 15
  },
  dataList: {
    marginBottom: 5,
    marginTop: 5,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 5
  },
  buttonDelete: {
    backgroundColor: 'grey',
    paddingTop: 15,
    paddingBottom: 15,
    width: 50,
    marginTop: -50,
    marginLeft: 230
  },
  buttonUpdate: {
    backgroundColor: 'grey',
    paddingTop: 15,
    paddingBottom: 15,
    width: 50,
    marginTop: -50,
    marginLeft: 290
  },
  textButton: {
    textAlign: 'center',
    color: 'black'
  }
})

export default CommentList;
