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

    return (
      <View style={styles.active}>
        {tiles}
      </View>
    );

  }
}

const styles = {
  active: {
   flexDirection: 'row',
   position: 'relative',
   marginTop: 5,
   minHeight: 50,
   maxHeight: 50
 },
 inactive: {
   borderBottomWidth: 1,
   padding: 5,
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
