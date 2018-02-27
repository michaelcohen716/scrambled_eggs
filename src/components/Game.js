import React from 'react';
import Words from '../games/scrambled.json';
import Levels from '../games/levels.json';
import { View, Text } from 'react-native';
import WordHolder from './WordHolder';
import EmptyHolder from './EmptyHolder';
// import Timer from './Timer';
import InfoBar from './InfoBar';
import { connect } from 'react-redux';
import { startNewWord } from '../actions';

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
    const currentWord = {
      word: this.activeWord,
      letters: this.letters,
      scrambles: this.scrambles
    };

    const empties = this.answers.map((scramble, idx) => {
      return (
        <EmptyHolder letters={this.props.activeLetters} answerIndex={idx} key={idx}/>
      );
    });

    return (
      <View>
        <InfoBar />
        <WordHolder active={currentWord} />

        <View style={styles.messageContainer}>
          <Text style={styles.message}>{this.props.message}</Text>
        </View>

        <View style={styles.container}>
          {empties}
        </View>
      </View>
    );
  }
}

// <Timer seconds={this.seconds}/>
const styles = {
  container: {
    marginTop: 30
  },
  message: {
    fontSize: 22,
    marginTop: 7
  },
  messageContainer: {
    minHeight: 32,
    maxHeight: 32,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
  }
};

const mapStateToProps = state => {
  return {
    activeLetters: state.game.activeLetters,
    message: state.game.message,
    activeLevel: state.levels.activeLevel,
    activeLevelAttempted: state.score.activeLevelAttempted
  };
};

export default connect(mapStateToProps, { startNewWord })(Game);
