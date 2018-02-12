import React from 'react';
import { View, Text } from 'react-native';

class Tile extends React.Component {
  render(){
    const letter = this.props.letter.toUpperCase();
    return (
      <View style={styles.view}>
        <Text style={styles.text}>{letter}</Text>
      </View>
    );
  }
}

const styles = {
  view: {
    borderWidth: 3,
    backgroundColor: 'orange',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
    width: 50,
    padding: 4,
    margin: 5,
    borderRadius: 10
  },
  text: {
    fontSize: 30,
    alignSelf: 'center'
  }
};

export default Tile;
