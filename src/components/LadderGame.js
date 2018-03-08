import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import FryingPan from './FryingPan';
import InfoBar from './InfoBar';
// import WordHolder from './WordHolder';
import LadderTile from './LadderTile';

class LadderGame extends React.Component {
  constructor(props){
    super(props);
    this.letters = ["a", "b", "c", "d", "e"];
  }

  render(){
    const initialTiles = this.letters.map((letter, idx) => {
      return (
        <LadderTile letter={letter} key={idx} wordIndex={0} letterIndex={idx}/>
      );
    });

    const initialWordHolder = (
      <View style={styles.container}>
        {initialTiles}
      </View>
    );


    return (
      <View style={styles.parent}>

        <InfoBar />

        <View style={styles.game}>
          <View style={styles.clues}>
            {initialWordHolder}
          </View>

        </View>

        <FryingPan />

      </View>
    );
  }
}

const styles = {
  parent: {
    flex: 1
  },
  clues: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 2,
  },
  game: {
    flex: 1,
    backgroundColor: 'silver'
  },
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
    wordIndex: state.ladder.wordIndex
  }
}

export default connect(null, null)(LadderGame);
