import React from 'react';
import { View } from 'react-native';
import Tile from './Tile';
import { tapLetter } from '../actions';
import { connect } from 'react-redux';


class WordHolder extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };

  }

  render(){
    const tiles = this.props.activeLetters.map((letter, idx) => {
      console.log(idx);
      return (
        <Tile letter={letter} key={idx} letterIndex={idx}/>
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
   position: 'relative'
  }
};

const mapStateToProps = state => {
  return {
    activeLetters: state.game.activeLetters
  };
};

export default connect(mapStateToProps, { tapLetter })(WordHolder);
