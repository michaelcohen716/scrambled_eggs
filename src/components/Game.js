import React from 'react';
import { connect } from 'react-redux';
import { startNewWord } from '../actions';
import Words from '../games/scrambled.json';
import Levels from '../games/levels.json';
import JumbleGame from './JumbleGame';

class Game extends React.Component {
  constructor(props){
    super(props);
    this.seconds = Levels[this.props.activeLevel].time;
    this.breakDown();
  }

  breakDown(){
    this.activeWord = Levels[this.props.activeLevel].letters;
    this.answers = Words[this.activeWord];

    const startWordObject = {
      activeLetters: this.scrambleLetters(this.activeWord),
      numWords: this.answers.length,
      answers: this.answers,
      roundTime: this.seconds
    };

    this.props.startNewWord(startWordObject);
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
    return (
      <JumbleGame />
    );
  }
}

const mapStateToProps = state => {
  return {
    activeLetters: state.jumble.activeLetters,
    activeLevel: state.levels.activeLevel,
  };
};

export default connect(mapStateToProps, { startNewWord })(Game);
