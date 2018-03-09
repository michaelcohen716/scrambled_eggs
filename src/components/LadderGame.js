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
    this.answers = this.props.answers; // [[], [ , ], [ , ]]

    this.answersArray = [
      this.answers[0][0].split(""),
      this.answers[1][0].split(""),
      this.answers[2][0].split("")
    ];
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.currentWordIndex != this.props.currentWordIndex){
      this.answersArray[this.props.currentWordIndex - 1] = this.props.attempts[this.props.currentWordIndex - 1];
    }
  }

  render(){
    const { answers, activeLetters, currentWordIndex } = this.props;

    return (
      <View style={styles.parent}>

        <InfoBar />

        <View style={styles.game}>
          <View style={styles.clues}>
            <LadderHolder letters={activeLetters} wordIndex={-1}
              wordLength={activeLetters.length} currentWordIndex={currentWordIndex}/>

            <View style={styles.messageBox}>
              <Text style={styles.message}>Hey</Text>
            </View>

            <LadderHolder letters={this.answersArray[0]} wordIndex={0}
              wordLength={activeLetters.length}  currentWordIndex={currentWordIndex}/>

            <LadderHolder letters={this.answersArray[1]} wordIndex={1}
              wordLength={activeLetters.length - 1} currentWordIndex={currentWordIndex}/>

            <LadderHolder letters={this.answersArray[2]} wordIndex={2} wordLength={activeLetters.length - 2} />

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
    currentWordIndex: state.ladder.wordIndex,
    answers: state.ladder.answers,
    attempts: state.ladder.attempts,
    activeLetters: state.ladder.activeLetters
  };
};

export default connect(mapStateToProps, null)(LadderGame);
