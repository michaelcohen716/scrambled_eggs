import React from 'react';
import Words from '../games/scrambled.json';
import { View } from 'react-native';
import WordHolder from './WordHolder';
import EmptyHolder from './EmptyHolder';
import { connect } from 'react-redux';
import { startNewWord } from '../actions';

class Game extends React.Component {
  constructor(props){
    super(props);
    this.queue = Object.keys(Words);
    this.breakDown();
  }

  breakDown(){
    this.activeWord = this.queue[0];
    this.answers = Words[this.activeWord];

    const startWordObject = {
      activeLetters: this.scrambleLetters(this.activeWord),
      numWords: this.answers.length,
      answers: this.answers
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
        <WordHolder active={currentWord} />
        <View style={styles.container}>
          {empties}
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    marginTop: 60
  }
};

const mapStateToProps = state => {
  return {
    activeLetters: state.game.activeLetters
  };
};

export default connect(mapStateToProps, { startNewWord })(Game);
