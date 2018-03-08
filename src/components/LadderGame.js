import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import FryingPan from './FryingPan';
import InfoBar from './InfoBar';
import LadderHolder from './LadderHolder';


class LadderGame extends React.Component {
  constructor(props){
    super(props);
    this.letters = ["e", "m", "o", "r", "h","c"];
    this.answers = ["chrome", "homer", "more"];
  }

  render(){


    return (
      <View style={styles.parent}>

        <InfoBar />

        <View style={styles.game}>
          <View style={styles.clues}>
            <LadderHolder letters={this.letters} wordIndex={-1}/>

            <LadderHolder letters={this.letters} />

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
    flexDirection: 'column',
    borderWidth: 2,
  },
  game: {
    flex: 1,
    backgroundColor: 'silver'
  },



};

const mapStateToProps = state => {
  return {
    wordIndex: state.ladder.wordIndex,
    activeAnswer
  }
}

export default connect(null, null)(LadderGame);
