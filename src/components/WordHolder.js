import React from 'react';
import { View } from 'react-native';
import Tile from './Tile';

class WordHolder extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };

  }

  render(){
    const tiles = this.props.active.letters.map((letter, idx) => {
      return (
        <Tile letter={letter} key={idx}/>
      );
    });

    return (
      <View style={styles.container}>
        {tiles}
      </View>
    );
  }
}

const styles = {
  container: {
   borderBottomWidth: 1,
   padding: 5,
   backgroundColor: 'blue',
   justifyContent: 'flex-start',
   flexDirection: 'row',
   borderColor: '#ddd',
   position: 'relative'
  }
};

export default WordHolder;
