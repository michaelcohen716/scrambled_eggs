import React from 'react';
import { View } from 'react-native';
import Tile from './Tile';
import { connect } from 'react-redux';

class EmptyHolder extends React.Component {
  constructor(props){
    super(props);
    this.fullWord = false;
  }

  render(){
    // word level
    const firstIndex = this.props.answerIndex;

    // idx == letter level
    const tiles = this.props.letters.map((letter, idx) => {
      // base condition
      this.fullWord = true;

      if(this.props.attempts[firstIndex][idx]){
        letter = this.props.attempts[firstIndex][idx];
      } else {
        letter = "";
        this.fullWord = false;
      }
      return (
        <Tile letter={letter} key={idx} letterIndex={idx}
              answerIndex={firstIndex} untappable={true}/>
      );
    });

    if(this.props.wordIndex === this.props.answerIndex){
      return (
        <View style={styles.active}>
          {tiles}
        </View>
      );
    }

    return (
      <View style={styles.inactive}>
        {tiles}
      </View>
    );
  }
}

const styles = {
  active: {
   borderBottomWidth: 1,
   padding: 2,
   backgroundColor: 'blue',
   justifyContent: 'center',
   flexDirection: 'row',
   borderColor: '#ddd',
   position: 'relative',
   marginBottom: 15
 },
 inactive: {
   borderBottomWidth: 1,
   padding: 2,
   backgroundColor: 'transparent',
   justifyContent: 'center',
   flexDirection: 'row',
   borderColor: '#ddd',
   position: 'relative',
   marginBottom: 15
 }
};

const mapStateToProps = state => {
  return {
    attempts: state.jumble.attempts,
    answers: state.jumble.answers,
    usedLetters: state.jumble.usedLetters,
    wordIndex: state.jumble.wordIndex
  };
};

export default connect(mapStateToProps, null)(EmptyHolder);
