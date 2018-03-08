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
    const { wordLength, attemptLength } = this.props;

    if(wordLength - 1 === attemptLength){
      this.props.verifyLadderWord(letter, letterIndex);
    } else {
      this.props.tapLadderLetter(letter, letterIndex);
    }
  }

  render(){
    const { wordIndex, currentIndex, usedLetters, letterIndex } = this.props;
    const letter = this.props.letter ? this.props.letter.toUpperCase() : '';

    // if(currentIndex === wordIndex && usedLetters[letterIndex] === true){ //active used
      return (
        <TouchableOpacity style={styles.usedTile}>
          <Text style={styles.usedText}>{letter}</Text>
        </TouchableOpacity>
      );
    // }

    // if(currentIndex === wordIndex){ //active unused
    //   return (
    //     <TouchableOpacity style={styles.unusedTile} onPress={this.press}>
    //       <Text style={styles.unusedText}>{letter}</Text>
    //     </TouchableOpacity>
    //   );
    // }
    //
    // return (
    //   <View></View>
    // );

  }
}

const styles = {
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
    usedLetters: state.ladder.usedLetters
  };
};

export default connect(mapStateToProps, { tapLadderLetter, verifyLadderWord })(LadderTile);
