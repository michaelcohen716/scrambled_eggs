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
    const attemptHolders = this.answers.map((answer, idx) => {
      return (
        <LadderHolder letters={answer.split("")} wordIndex={idx} key={idx} />
      );
    });

    console.log(attemptHolders);

    return (
      <View style={styles.parent}>

        <InfoBar />

        <View style={styles.game}>
          <View style={styles.clues}>
            <LadderHolder letters={this.letters} wordIndex={-1}/>

            <View style={styles.messageBox}>
              <Text style={styles.message}>Hey</Text>
            </View>

            {attemptHolders}

          </View>
          <View style={styles.filler}>

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
    flex: 4,
    flexDirection: 'column',
  },
  messageBox: {
    flex: 1,
    backgroundColor: 'silver',
    alignItems: 'center',
    justifyContent: 'center'
  },
  message: {
    fontSize: 24,
    fontFamily: 'RobotoCondensed-Regular',
  },
  filler: {
    flex: 2
  },
  game: {
    flex: 1,
    backgroundColor: 'silver'
  },
  holders: {
    // flex: 1,
    flexDirection: 'column'
  }

};

const mapStateToProps = state => {
  return {
    wordIndex: state.ladder.wordIndex,
    answers: state.ladder.answers,
    attempts: state.ladder.attempts
  };
};

export default connect(null, null)(LadderGame);
