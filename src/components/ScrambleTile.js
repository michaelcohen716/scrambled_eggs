import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { tapScrambleLetter, verifyScramble } from '../actions';

class ScrambleTile extends React.Component {
  constructor(){
    super();
    this.press = this.press.bind(this);
  }

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

    const letter = this.props.letter ? this.props.letter.toUpperCase() : '';

    // ADD different cases here
    return (
      <TouchableOpacity style={styles.unusedHolder} onPress={this.press}>
        <Text style={styles.unusedText}>{letter}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = {
  unusedHolder: {
    borderWidth: 3,
    backgroundColor: 'orange',
    flexDirection: 'row',
    borderColor: 'white',
    position: 'relative',
    width: 50,
    padding: 4,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    minHeight: 50
  },
  unusedText: {
    fontSize: 30,
  },
};

const mapStateToProps = state => {
  return {
    usedLetters: state.scramble.usedLetters,
    attemptLength: state.scramble.attemptLength,
    answers: state.scramble.answers,
    wordIndex: state.scramble.wordIndex
  };
};

export default connect(mapStateToProps, { tapScrambleLetter, verifyScramble })(ScrambleTile);
