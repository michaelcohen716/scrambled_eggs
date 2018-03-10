import React from 'react';
import { View } from 'react-native';
import Tile from './Tile';
import { connect } from 'react-redux';

class WordHolder extends React.Component {
  render(){
    let size;
    if(this.props.activeLetters.length > 6){
      size = "small";
    } else {
      size = "large";
    }

    const tiles = this.props.activeLetters.map((letter, idx) => {
      return (
        <Tile letter={letter} key={idx} letterIndex={idx}
              topHolder={true} size={size}/>
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
   position: 'relative',
 },

};

const mapStateToProps = state => {
  return {
    activeLetters: state.jumble.activeLetters
  };
};

export default connect(mapStateToProps, null)(WordHolder);
