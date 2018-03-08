import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import LadderTile from './LadderTile';

class LadderHolder extends React.Component {
  render(){
    const { wordIndex, currentWordIndex, attempts, attemptLength } = this.props;

    const tiles = this.props.letters.map((letter, idx) => {
      if(currentWordIndex === wordIndex && idx < attemptLength){ //active guessing attempt, letter present
        letter = attempts[wordIndex][idx];
      } else if(currentWordIndex === wordIndex && idx >= attemptLength){ //active attempts, letter not present
        letter = '';
      } else if(currentWordIndex < wordIndex){ //still inactive word
        letter = '';
      }

      return (
        <LadderTile letter={letter} letterIndex={idx} key={idx} wordIndex={wordIndex}/>
      );
    });

    if(wordIndex + 1 === currentWordIndex){ //tapping these letters
      return (
        <View style={styles.lettersActive}>
          {tiles}
        </View>
      );
    } else if(wordIndex === currentWordIndex){ //active answer attempt
      return (
        <View style={styles.attemptActive}>
          {tiles}
        </View>
      );
    }
    else {
    // else if(wordIndex < currentWordIndex) { // solved, letters not active
      return (
        <View style={styles.stillEmpty}>
          {tiles}
        </View>
      );
    }
  }
}

const styles = {
  stillEmpty: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    // minHeight: 50,
    marginBottom: 13
  },
  lettersActive: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',

    flexDirection: 'row',
    flex: 1,
    // minHeight: 50,
    marginBottom: 13

  },
  attemptActive: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',

    flexDirection: 'row',
    flex: 1,
    // minHeight: 50,
    marginBottom: 13

  }
};

const mapStateToProps = state => {
  return {
    currentWordIndex: state.ladder.wordIndex,
    attempts: state.ladder.attempts,
    attemptLength: state.ladder.attemptLength
  };
};

export default connect(mapStateToProps, null)(LadderHolder);
