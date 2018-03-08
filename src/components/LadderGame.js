import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import FryingPan from './FryingPan';
import InfoBar from './InfoBar';

class LadderGame extends React.Component {
  render(){
    return (
      <View style={styles.parent}>

        <InfoBar />

        <View style={styles.game}>



        </View>

        <FryingPan />

      </View>
    );
  }
}

const styles = {
  parent: {
    flex: 1
  },
  game: {
    flex: 1,
    backgroundColor: 'silver'
  },

};

export default connect(null, null)(LadderGame);
