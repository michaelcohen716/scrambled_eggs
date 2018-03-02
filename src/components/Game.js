import React from 'react';
import { connect } from 'react-redux';
import { startNewWord, startNewScramble } from '../actions';
import { View } from 'react-native';
import Jumbles from '../games/jumbles.json';
import Scrambles from '../games/scrambles.json';
import Levels from '../games/levels.json';
import JumbleGame from './JumbleGame';
import ScrambleGame from './ScrambleGame';

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      levelType: null
    };
    this.seconds = Levels[this.props.activeLevel].time;
    this.breakDown();
  }

  breakDown(){
    const levelType = Levels[this.props.activeLevel].type;
    if(levelType === "jumble"){
      this.activeWord = Levels[this.props.activeLevel].letters;
      this.answers = Jumbles[this.activeWord];

      const startWordObject = {
        activeLetters: this.scrambleLetters(this.activeWord),
        numWords: this.answers.length,
        answers: this.answers,
        roundTime: this.seconds,
      };

      this.props.startNewWord(startWordObject);
    } else if(levelType === "scramble"){
      this.firstAnswer = Levels[this.props.activeLevel].firstAnswer;
      this.scrambleSteps = Scrambles[this.firstAnswer];

      const startScrambleObject = {
        firstAnswer: this.firstAnswer,
        roundTime: this.seconds,
        steps: this.scrambleSteps,
      };

      this.props.startNewScramble(startScrambleObject);
    }
  }

  scrambleLetters(word){
    var shuffledWord = '';
    word = word.split('');
    while (word.length > 0) {
      shuffledWord +=  word.splice(word.length * Math.random() << 0, 1);
    }

    return shuffledWord.split("");
  }

  render(){
    if(this.props.levelType === "jumble"){
      return (
        <JumbleGame />
      );
    } else if(this.props.levelType === "scramble"){
      return (
        <ScrambleGame />
      );
    } else {
      return (
        <View></View>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    activeLetters: state.jumble.activeLetters,
    activeLevel: state.levels.activeLevel,
    levelType: state.levels.levelType
  };
};

export default connect(mapStateToProps, { startNewWord, startNewScramble })(Game);
