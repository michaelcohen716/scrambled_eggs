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
    const { letterIndex, usedLetters } = this.props;

    const letter = this.props.letter ? this.props.letter.toUpperCase() : '';

    return (
      <TouchableOpacity style={styles.newType} onPress={this.press}>
        <Text style={styles.newText}>{letter}</Text>
      </TouchableOpacity>
    );


    // test different cases here
    // if(this.props.lettersHolder && !usedLetters[letterIndex]){ //untapped scrambled letters
    //   return (
    //     <TouchableOpacity style={styles.unusedHolder} onPress={this.press}>
    //       <Text style={styles.unusedText}>{letter}</Text>
    //     </TouchableOpacity>
    //   );
    // }
    //
    // if(this.props.lettersHolder){ //tapped scrambled letter
    //   return (
    //     <TouchableOpacity style={styles.usedHolder} >
    //       <Text style={styles.unusedText}>{letter}</Text>
    //     </TouchableOpacity>
    //   );
    // }
    //
    // return (
    //   <TouchableOpacity style={styles.attemptLetterHolder}>
    //     <Text style={styles.unusedText}>{letter}</Text>
    //   </TouchableOpacity>
    // );

  }
}

const styles = {
  newType: {
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
  newText: {
    fontSize: 20,
    fontFamily: 'RobotoCondensed-Regular'
  }
};

// const styles = {
//   unusedHolder: {
//     borderWidth: 3,
//     backgroundColor: 'orange',
//     flexDirection: 'row',
//     borderColor: 'white',
//     position: 'relative',
//     width: 50,
//     padding: 4,
//     margin: 5,
//     borderRadius: 10,
//     justifyContent: 'center',
//     minHeight: 50
//   },
//   unusedText: {
//     fontSize: 30,
//     fontFamily: 'RobotoCondensed-Regular',
//   },
//   usedHolder: {
//     borderWidth: 3,
//     backgroundColor: 'orange',
//     flexDirection: 'row',
//     borderColor: 'white',
//     position: 'relative',
//     width: 50,
//     padding: 4,
//     margin: 5,
//     borderRadius: 10,
//     justifyContent: 'center',
//     minHeight: 50,
//     opacity: 0.5
//   },
//   attemptLetterHolder: {
//     borderWidth: 3,
//     backgroundColor: 'orange',
//     flexDirection: 'row',
//     borderColor: 'white',
//     position: 'relative',
//     width: 50,
//     padding: 4,
//     margin: 5,
//     borderRadius: 10,
//     justifyContent: 'center',
//     minHeight: 50,
//     opacity: 0.5
//   }
// };
//
const mapStateToProps = state => {
  return {
    usedLetters: state.scramble.usedLetters,
    attemptLength: state.scramble.attemptLength,
    answers: state.scramble.answers,
    wordIndex: state.scramble.wordIndex
  };
};

export default connect(mapStateToProps, { tapScrambleLetter, verifyScramble })(ScrambleTile);
