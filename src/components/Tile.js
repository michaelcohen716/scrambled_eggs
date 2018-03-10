import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { tapLetter, verifyWord } from '../actions';

class Tile extends React.Component {
  constructor(props){
    super(props);
    this.letterIndex = this.props.letterIndex;
    this.press = this.press.bind(this);
  }

  press(){
    const { letter, letterIndex } = this.props;
    const { wordLength, attemptLength } = this.props;

    if(wordLength - 1 === attemptLength){
      this.props.verifyWord(letter, letterIndex);
    } else {
      this.props.tapLetter(letter, letterIndex);
    }
  }

  render(){
    const letter = this.props.letter ? this.props.letter.toUpperCase() : '';

    const sizeStyle = this.props.size === 'large' ? styles.containerSizeLarge : styles.containerSizeSmall;
    const fontSize = this.props.size === 'large' ? styles.fontSizeLarge : styles.fontSizeSmall;

    if(this.props.untappable){
      return(
        <TouchableOpacity style={[styles.unusedHolder, sizeStyle]}>
          <Text style={[styles.unusedText, fontSize]}>{letter}</Text>
        </TouchableOpacity>
      );
    }

    if(this.props.topHolder && this.props.usedLetters[this.props.letterIndex]){
      return (
        <TouchableOpacity style={[styles.usedHolder, sizeStyle]}>
          <Text style={[styles.usedText, fontSize]}>{letter}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity style={[styles.unusedHolder, sizeStyle]} onPress={this.press}>
        <Text style={[styles.unusedText, fontSize]}>{letter}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = {
  containerSizeLarge: {
    width: 50,
    minHeight: 50,
    borderRadius: 10,
    padding: 4,
    margin: 5,
    borderWidth: 3,
  },
  containerSizeSmall: {
    width: 45,
    minHeight: 45,
    borderRadius: 8,
    padding: 3,
    margin: 4,
    borderWidth: 2.5
  },
  unusedHolder: {
    // borderWidth: 3,
    backgroundColor: 'orange',
    flexDirection: 'row',
    borderColor: 'white',
    position: 'relative',
    // width: 50,
    // padding: 4,
    // margin: 5,
    // borderRadius: 10,
    justifyContent: 'center',
    // minHeight: 50
  },
  usedHolder: {
    // borderWidth: 3,
    backgroundColor: 'gray',
    flexDirection: 'row',
    borderColor: 'white',
    position: 'relative',
    // width: 50,
    // padding: 4,
    // margin: 5,
    // borderRadius: 10,
    justifyContent: 'center',
    // minHeight: 50
  },
  unusedText: {
    // fontSize: 30,
  },
  fontSizeSmall: {
    fontSize: 25,
    marginTop: 3
  },
  fontSizeLarge: {
    fontSize: 30
  },
  usedText: {
    // fontSize: 30,
    color: 'white'
  }
};

const mapStateToProps = state => {
  return {
    wordIndex: state.jumble.wordIndex, // ^ on word level
    usedLetters: state.jumble.usedLetters,
    attemptLength: state.jumble.attemptLength, //how many letters in are we
    wordLength: state.jumble.activeLetters.length,
    answers: state.jumble.answers,
    attempts: state.jumble.attempts
  };
};

export default connect(mapStateToProps, { tapLetter, verifyWord })(Tile);
