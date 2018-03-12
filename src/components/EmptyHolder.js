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
    let marginStyle = styles.bigMargin;
    if(this.props.numAnswers > 5){
      marginStyle = styles.smallMargin;
    }
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
        <View style={[styles.active, marginStyle]}>
          {tiles}
        </View>
      );
    }

    return (
      <View style={[styles.inactive, marginStyle]}>
        {tiles}
      </View>
    );
  }
}

const styles = {
  active: {
   borderBottomWidth: 1,
   backgroundColor: 'blue',
   justifyContent: 'center',
   flexDirection: 'row',
   borderColor: '#ddd',
   position: 'relative',
 },
 inactive: {
   borderBottomWidth: 1,
   backgroundColor: 'transparent',
   justifyContent: 'center',
   flexDirection: 'row',
   borderColor: '#ddd',
   position: 'relative',
 },
 smallMargin: {
   marginBottom: 2,
   padding: 1
 },
 bigMargin: {
   marginBottom: 15,
   padding: 2
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
