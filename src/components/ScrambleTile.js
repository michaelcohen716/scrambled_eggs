import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { tapScrambleLetter, verifyScramble } from '../actions';

class ScrambleTile extends React.Component {
  constructor(){
    super();
    this.press = this.press.bind(this);
  }

  // still a bug sometimes at end of round (usedLetters render incorrectly)

  press(){
    const { letter, letterIndex, attemptLength } = this.props;
    const answerLength = this.props.answers[this.props.wordIndex].length;

    if(attemptLength + 1 === answerLength){
      this.props.verifyScramble(letter, letterIndex);
    } else {
      this.props.tapScrambleLetter(letter, letterIndex);
    }
  }

  render(){
    const { letterIndex, usedLetters, answerIndex, wordIndex, pastUsedLetters } = this.props;

    const letter = this.props.letter ? this.props.letter.toUpperCase() : '';

    if(usedLetters[letterIndex] && wordIndex === answerIndex){ //used letter, active word
      return (
        <TouchableOpacity style={styles.pressedActive}>
          <Text style={styles.pressedActiveText}>{letter}</Text>
        </TouchableOpacity>
      );
    }

    if(answerIndex === 1 && !this.props.press){
      return (
        <TouchableOpacity style={styles.unpressed} >
          <Text style={styles.unpressedText}>{letter}</Text>
        </TouchableOpacity>
      );
    }

    if(answerIndex === 1 && this.props.press){ //second word letters holder
      return (
        <TouchableOpacity style={styles.lastLetters} onPress={this.press}>
          <Text style={styles.lastLettersText}>{letter}</Text>
        </TouchableOpacity>
      );
    }

    if(answerIndex !== wordIndex && pastUsedLetters[letterIndex]){ //inactive word, used letter
      return (
        <TouchableOpacity style={styles.unpressed}>
          <Text style={styles.unpressedText}>{letter}</Text>
        </TouchableOpacity>
      );
    }

    if(answerIndex !== wordIndex && pastUsedLetters[letterIndex] === false){ //inactive word, unused letter
      return (
        <TouchableOpacity style={styles.inactive}>
          <Text style={styles.inactiveText}>{letter}</Text>
        </TouchableOpacity>
      );
    }

    if(answerIndex !== wordIndex){
      return (
        <TouchableOpacity style={styles.unpressed} >
          <Text style={styles.unpressedText}>{letter}</Text>
        </TouchableOpacity>
      );
    }


    return ( //unpressed active
      <TouchableOpacity style={styles.unpressed} onPress={this.press}>
        <Text style={styles.unpressedText}>{letter}</Text>
      </TouchableOpacity>
    );

  }
}

const styles = {
  lastLetters: {
    height: 45,
    width: 45,
    padding: 2,
    margin: 4,
    backgroundColor: 'blue',
    borderColor: 'white',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  lastLettersText: {
    fontSize: 20,
    fontFamily: 'RobotoCondensed-Regular',
    color: 'white'
  },
  unpressed: {
    height: 45,
    width: 45,
    padding: 2,
    margin: 4,
    backgroundColor: 'orange',
    borderColor: 'white',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  unpressedText: {
    fontSize: 20,
    fontFamily: 'RobotoCondensed-Regular',
    color: 'black'
  },
  pressedActive: {
    height: 45,
    width: 45,
    padding: 2,
    margin: 4,
    backgroundColor: 'blue',
    borderColor: 'white',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  pressedActiveText: {
    fontSize: 20,
    fontFamily: 'RobotoCondensed-Regular',
    color: 'white'
  },
  inactive: {
    height: 45,
    width: 45,
    padding: 2,
    margin: 4,
    backgroundColor: 'darkgrey',
    borderColor: 'white',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  inactiveText: {
    fontSize: 20,
    fontFamily: 'RobotoCondensed-Regular',
    color: 'white'
  }
};

const mapStateToProps = state => {
  return {
    usedLetters: state.scramble.usedLetters,
    attemptLength: state.scramble.attemptLength,
    answers: state.scramble.answers,
    wordIndex: state.scramble.wordIndex,
    pastUsedLetters: state.scramble.pastUsedLetters
  };
};

export default connect(mapStateToProps, { tapScrambleLetter, verifyScramble })(ScrambleTile);
