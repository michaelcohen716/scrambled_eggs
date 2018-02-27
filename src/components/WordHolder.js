import React from 'react';
import { View } from 'react-native';
import Tile from './Tile';
import { tapLetter } from '../actions';
import { connect } from 'react-redux';


class WordHolder extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const tiles = this.props.activeLetters.map((letter, idx) => {
      return (
        <Tile letter={letter} key={idx} letterIndex={idx} topHolder={true}/>
      );
    });

    return (
      <View>
        <View style={styles.container}>
          {tiles}
        </View>

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
    activeLetters: state.game.activeLetters,
  };
};

export default connect(mapStateToProps, { tapLetter })(WordHolder);
