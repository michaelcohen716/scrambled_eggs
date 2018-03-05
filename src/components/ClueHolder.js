import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

class ClueHolder extends React.Component {
  render(){
    return (
      <View style={styles.containerLeft}>
        <Text style={styles.text}>
          {this.props.clue}
        </Text>
      </View>
    );
  }
}

const styles = {
  containerLeft: {
    paddingTop: 3,
    paddingBottom: 2,
    paddingRight: 6,
    width: 280,
    marginTop: 10,
    borderColor: 'orange',
    borderTopWidth: 1,
    borderRadius: 5
  },
  text: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'RobotoCondensed-Italic',
    margin: 5,
    fontStyle: 'italic'
  }
};



export default connect(null, null)(ClueHolder);
