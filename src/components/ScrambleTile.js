import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { tapScrambleLetter } from '../actions';

class ScrambleTile extends React.Component {
  constructor(){
    super();
    // this.letterIndex = this.props.letterIndex;
    this.press = this.press.bind(this);
  }

  press(){

    this.props.tapScrambleLetter();
  }

  render(){


    const letter = this.props.letter ? this.props.letter.toUpperCase() : '';


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
    usedLetters: state.scramble.usedLetters
  };
};

export default connect(mapStateToProps, { tapScrambleLetter })(ScrambleTile);
