import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Button } from './common';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection } from './common';

class Home extends React.Component {
  beginGame(){
    Actions.levels({type: 'reset'});
  }

  render(){
    return (

      <View style={styles.container}>
        <TouchableHighlight onPress={this.beginGame.bind(this)} style={styles.beginButton}>
          <Text style={styles.text}>
            Begin Game
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = {
  container: {
     justifyContent: 'center',
     paddingLeft: 50,
     paddingRight: 50,
     marginTop: 140
   },
  text: {
    fontSize: 25,
    padding: 5
  },
  beginButton: {
   height: 50,
   alignItems: 'center',
   backgroundColor: '#2196F3',
   borderRadius: 5
 },
};

export default connect(null, null)(Home);
