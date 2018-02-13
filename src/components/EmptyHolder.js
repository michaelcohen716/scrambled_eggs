import React from 'react';
import { View } from 'react-native';
import Tile from './Tile';
import { connect } from 'react-redux';

class EmptyHolder extends React.Component {
  render(){
    const tiles = this.props.letters.map((letter, idx) => {
      letter = "";
      if(this.props.scramble[idx]){
        letter = this.props.scramble[idx];
      }
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
   justifyContent: 'center',
   flexDirection: 'row',
   borderColor: '#ddd',
   position: 'relative',
   marginBottom: 15
  }
};

const mapStateToProps = state => {
  const scramble = state.game.scramble;
  console.log("mapstate");
  console.log(state);
  return {
    scramble
  };
};

export default connect(mapStateToProps, null)(EmptyHolder);
