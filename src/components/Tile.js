import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { tapLetter } from '../actions';

class Tile extends React.Component {
  constructor(props){
    super(props);
    this.letterIndex = this.props.letterIndex;
  }

  press(){
    const { letter, letterIndex } = this.props;
    this.props.tapLetter(letter, letterIndex);
  }


  render(){
    const letter = this.props.letter ? this.props.letter.toUpperCase() : '';

    if(this.props.usedLetters[this.props.letterIndex]){
      return (
        <TouchableHighlight style={styles.usedHolder}>
          <Text style={styles.usedText}>{letter}</Text>
        </TouchableHighlight>
      );
    }

    return (
      <TouchableHighlight style={styles.unusedHolder} onPress={()=>this.press()}>
        <Text style={styles.unusedText}>{letter}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = {
  unusedHolder: {
    borderWidth: 3,
    backgroundColor: 'orange',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
    width: 50,
    padding: 4,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    minHeight: 50
  },
  usedHolder: {
    borderWidth: 3,
    backgroundColor: 'gray',
    flexDirection: 'row',
    borderColor: '#ddd',
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
  usedText: {
    fontSize: 30,
    color: 'white'
  }
};

const mapStateToProps = state => {
  return {
    wordIndex: state.game.wordIndex, // ^ on word level
    usedLetters: state.game.usedLetters
  };
};

export default connect(mapStateToProps, { tapLetter })(Tile);
