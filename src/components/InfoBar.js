import React from 'react';
import ScoreKeeper from './ScoreKeeper';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

class InfoBar extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <Text>Username</Text>
        <ScoreKeeper />
      </View>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    borderColor: 'blue',
    borderWidth: 0.5,
    justifyContent: 'space-between',
    height: 35
  }
};

export default InfoBar;
