import React from 'react';
import { View } from 'react-native';
import { Button } from './common';
import { connect } from 'react-redux';
import { beginGame } from '../actions';
// import Game from './Game';

class Home extends React.Component {
  beginGame(){
    this.props.beginGame();
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

export default connect(null, { beginGame })(Home);
