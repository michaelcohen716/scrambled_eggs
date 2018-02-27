import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

class ClueHolder extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {this.props.clue}
        </Text>
      </View>
    );
  }
}

const styles = {
  container: {
    padding: 3,
    borderWidth: 0.5,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 23
  }
};



export default connect(null, null)(ClueHolder);
