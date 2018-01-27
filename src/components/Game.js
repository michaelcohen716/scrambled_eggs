import React from 'react';
import Words from '../games/scrambled.json';
import { View, Text } from 'react-native';

// var startPuzzle = "1";

class Game extends React.Component {
  constructor(props){
    super(props);
    this.queue = Object.keys(Words);
    // console.log(Object.keys(Words));
    this.breakDown();
  }

  breakDown(){
    this.letters = this.queue[0].split("");
  }

  render(){
    return (
      <View>
        <Text>
          In game
        </Text>
      </View>
    );
  }
}

export default Game;
