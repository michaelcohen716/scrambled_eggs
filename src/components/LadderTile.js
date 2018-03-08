import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';


class LadderTile extends React.Component {
  constructor(props){
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress(){
    
  }

  render(){
    const { wordIndex, currentIndex, usedLetters, letterIndex } = this.props;

    if(currentIndex === wordIndex && usedLetters[letterIndex] === true){ //active used
      return (
        <TouchableOpacity style={styles.usedTile}>
          <Text style={styles.usedText}>{this.props.letter.toUpperCase()}</Text>
        </TouchableOpacity>
      );
    }

    if(currentIndex === wordIndex){ //active unused
      return (
        <TouchableOpacity style={styles.unusedTile} onPress={this.onPress}>
          <Text style={styles.unusedText}>{this.props.letter.toUpperCase()}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View></View>
    );

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
    // color: 'blue'
  }
};

const mapStateToProps = state => {
  return {
    currentIndex: state.ladder.wordIndex,
    usedLetters: state.ladder.usedLetters
  };
};

export default connect(mapStateToProps, null)(LadderTile);
