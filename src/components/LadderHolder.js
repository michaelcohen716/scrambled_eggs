import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import LadderTile from './LadderTile';

class LadderHolder extends React.Component {
  render(){
    const { wordIndex, currentWordIndex } = this.props;
    const tiles = this.props.letters.map((letter, idx) => {
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

    else if(wordIndex < currentWordIndex) { // solved, letters not active
      return (
        <View>
        </View>
      );
    }
  }
}

const styles = {
  lettersActive: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: 'blue',
    justifyContent: 'center',
    flexDirection: 'row',
    borderColor: '#ddd',
      // position: 'relative'
    flex: 1
  },
  attemptActive: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: 'black',
    justifyContent: 'center',
    flexDirection: 'row',
    borderColor: '#ddd',
    flex: 1
  }
};

const mapStateToProps = state => {
  return {
    currentWordIndex: state.ladder.wordIndex
  };
};

export default connect(mapStateToProps, null)(LadderHolder);
