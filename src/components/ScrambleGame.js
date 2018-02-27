import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import InfoBar from './InfoBar';
import ScrambleWordHolder from './ScrambleWordHolder';

class ScrambleGame extends React.Component {
  constructor(){
    super();
  }

  render(){
    const elements = [];

    return (
      <View>
        <InfoBar />
        <ScrambleWordHolder />


      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    inputWords: state.scramble.inputWords,
    inputChanges: state.scramble.inputChanges
  };
};

export default connect(mapStateToProps, null)(ScrambleGame);
