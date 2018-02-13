import React from 'react';
import { View } from 'react-native';
import Tile from './Tile';
import { connect } from 'react-redux';

class EmptyHolder extends React.Component {
  constructor(props){
    super(props);
    this.index = this.props.idx;
  }

  render(){
    // console.log(this.props.scramble);
    const firstIndex = this.index;
    const tiles = this.props.letters.map((letter, idx) => {
      letter = "";
      if(this.props.scrambles[firstIndex][idx]){
        letter = this.props.scrambles[firstIndex][idx];
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
  const scrambles = state.game.scrambles;
  return {
    scrambles
  };
};

export default connect(mapStateToProps, null)(EmptyHolder);
