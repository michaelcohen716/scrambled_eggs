import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { tapLetter } from '../actions';

class Tile extends React.Component {
  press(){
    const { letter, activeIndex } = this.props;
    this.props.tapLetter(letter, activeIndex);
  }


  render(){
    const letter = this.props.letter ? this.props.letter.toUpperCase() : '';
    return (
      <TouchableHighlight style={styles.container} onPress={()=>this.press()}>
        <Text style={styles.text}>{letter}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = {
  container: {
    borderWidth: 3,
    backgroundColor: 'orange',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
    width: 50,
    padding: 4,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    minHeight: 50
  },
  text: {
    fontSize: 30,
  }
};

const mapStateToProps = state => {
  return {
    activeIndex: state.game.activeIndex
  };
};

export default connect(mapStateToProps, { tapLetter })(Tile);
