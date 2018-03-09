import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { tapLadderLetter, verifyLadderWord } from '../actions';


class LadderTile extends React.Component {
  constructor(props){
    super(props);
    this.press = this.press.bind(this);
  }

  press(){
    const { letter, letterIndex } = this.props;
    const { currentWordLength, attemptLength } = this.props;
    if(currentWordLength - 1 === attemptLength){
      this.props.verifyLadderWord(letter, letterIndex);
    } else {
      this.props.tapLadderLetter(letter, letterIndex);
    }
  }

  render(){
    const { wordIndex, currentIndex, usedLetters, letterIndex } = this.props;
    const letter = this.props.letter ? this.props.letter.toUpperCase() : '';

    if(currentIndex - 1 === wordIndex && usedLetters[letterIndex] === true){ //active letters, tapped
      return (
        <TouchableOpacity style={styles.usedTile}>
          <Text style={styles.usedText}>{letter}</Text>
        </TouchableOpacity>
      );
    }

    if(currentIndex - 1 === wordIndex){ //active unused
      return (
        <TouchableOpacity style={styles.unusedTile} onPress={this.press}>
          <Text style={styles.unusedText}>{letter}</Text>
        </TouchableOpacity>
      );
    }

    if(currentIndex === wordIndex){ //current attempt holder
      return (
        <TouchableOpacity style={styles.attemptTile}>
          <Text style={styles.attemptText}>{letter}</Text>
        </TouchableOpacity>
      );
    }

    if(currentIndex > wordIndex){ //answer found
      return (
        <TouchableOpacity style={styles.pastTile}>
          <Text style={styles.unusedText}>{letter}</Text>
        </TouchableOpacity>
      );
    }

    else {
      return (
        <TouchableOpacity style={styles.unreachedTile} />
      );
    }
  }
}

const styles = {
  attemptTile: {
    width: 50,
    height: 50,
    backgroundColor: 'blue',
    borderColor: 'white',
    borderWidth: 3,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pastTile: {
    width: 50,
    height: 50,
    backgroundColor: 'orange',
    borderColor: 'white',
    borderWidth: 3,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5
  },
  attemptText: {
    fontSize: 24,
    fontFamily: 'RobotoCondensed-Regular',
    color: 'white'
  },
  unreachedTile: {
    width: 50,
    height: 50,
    backgroundColor: 'orange',
    borderColor: 'white',
    borderWidth: 3,
    margin: 5,
    borderRadius: 10,
  },
  usedTile: {
    width: 50,
    height: 50,
    backgroundColor: 'blue',
    borderColor: 'white',
    borderWidth: 3,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  usedText: {
    fontSize: 24,
    fontFamily: 'RobotoCondensed-Regular',
    color: 'white'
  },
  unusedTile: {
    width: 50,
    height: 50,
    backgroundColor: 'orange',
    borderColor: 'white',
    borderWidth: 3,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  unusedText: {
    fontSize: 24,
    fontFamily: 'RobotoCondensed-Regular',
  }
};

const mapStateToProps = state => {
  return {
    currentIndex: state.ladder.wordIndex,
    usedLetters: state.ladder.usedLetters,
    attemptLength: state.ladder.attemptLength,
    currentWordLength: state.ladder.currentWordLength
  };
};

export default connect(mapStateToProps, { tapLadderLetter, verifyLadderWord })(LadderTile);
