import React from 'react';
import { View } from 'react-native';
import { Button } from './common';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';


class Home extends React.Component {
  beginGame(){
    Actions.game({type: 'reset'});
  }

  render(){
    return (
      <View style={{ flex: 1 }}>
        <Button onPress={this.beginGame.bind(this)}>
          Begin Game
        </Button>
        <Button>
          My Games
        </Button>
      </View>
    );
  }
}

export default connect(null, null)(Home);
