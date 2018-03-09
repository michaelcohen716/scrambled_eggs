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
    this.answers = this.props.answers;
  }

  render(){
    const { answers, activeLetters, wordIndex } = this.props;

    const holders = answers.map((answer, idx) => {
      if(wordIndex > idx){

      }
    });

    return (
      <View style={styles.parent}>

        <InfoBar />

        <View style={styles.game}>
          <View style={styles.clues}>
            <LadderHolder letters={activeLetters} wordIndex={-1} wordLength={activeLetters.length}/>

            <View style={styles.messageBox}>
              <Text style={styles.message}>Hey</Text>
            </View>

            <LadderHolder letters={this.answers[0].split('')} wordIndex={0} wordLength={activeLetters.length}/>
            <LadderHolder letters={this.answers[1].split('')} wordIndex={1} wordLength={activeLetters.length - 1} />
            <LadderHolder letters={this.answers[2].split('')} wordIndex={2} wordLength={activeLetters.length - 2} />

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
    attempts: state.ladder.attempts,
    activeLetters: state.ladder.activeLetters
  };
};

export default connect(mapStateToProps, null)(LadderGame);
