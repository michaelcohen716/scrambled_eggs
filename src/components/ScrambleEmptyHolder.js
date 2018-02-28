import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import ScrambleTile from './ScrambleTile';

class ScrambleEmptyHolder extends React.Component {
  constructor(){
    super();

  }

  render(){
    const { answerIndex } = this.props;
    const length = this.props.answers[answerIndex].length;
    const tiles = [];
    for (var i = 0; i < length; i++) {
      let letter = '';

      if(this.props.attempts[answerIndex][i]){
        letter = this.props.attempts[answerIndex][i];
      }

      const tile = <ScrambleTile letter={letter} key={i}/>;
      tiles.push(tile);
    }

    if(this.props.clueIndex > answerIndex){
      return (
        <View style={styles.inactive}>
          {tiles}
        </View>
      );
    } else {
      return (
        <View style={styles.active}>
          {tiles}
        </View>
      );
    }
  }
}

const styles = {
  active: {
   borderBottomWidth: 1,
   padding: 5,
   backgroundColor: 'blue',
   justifyContent: 'center',
   flexDirection: 'row',
   borderColor: '#ddd',
   position: 'relative',
   marginTop: 5
 },
 inactive: {
   borderBottomWidth: 1,
   padding: 5,
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
    answers: state.scramble.answers,
    clueIndex: state.scramble.clueIndex,
    attempts: state.scramble.attempts
  };
};

export default connect(mapStateToProps, null)(ScrambleEmptyHolder);
