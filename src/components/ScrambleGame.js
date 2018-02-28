import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import InfoBar from './InfoBar';
import ScrambleWordHolder from './ScrambleWordHolder';
import ClueHolder from './ClueHolder';
import ScrambleEmptyHolder from './ScrambleEmptyHolder';
import ScrambleTile from './ScrambleTile';

class ScrambleGame extends React.Component {
  constructor(){
    super();
    this.state = {
      clues: 2, //just so unique key error doesn't show
      words: 7,
      empties: 11
    };
  }

  render(){
    const inputWords = this.props.inputWords;
    const firstClue = inputWords[0];
    const secondClue = inputWords[1];

    const inputChange = this.props.inputChanges[0];

    const firstClueGroup = this.props.wordIndex === 0 ?
      (
        <View>
          <ClueHolder clue={firstClue.clue} key={0} />
          <ScrambleWordHolder activeLetters={firstClue.letters} answerIndex={0} key={1} />
          <ScrambleEmptyHolder answerIndex={0} key={2} />
        </View>
      ) : (
        <View>
          <ScrambleEmptyHolder answerIndex={0} key={2} />
        </View>
      );

    return (
      <View>
        <InfoBar />

        {firstClueGroup}

        <View style={styles.change}>
          <Text style={styles.changeCommand}>{inputChange.clue} {inputChange.article}</Text>
          <ScrambleTile letter={inputChange.letter} />

        </View>

        <ClueHolder clue={secondClue.clue} key={3} />
        <ScrambleWordHolder activeLetters={secondClue.letters} answerIndex={1} key={4} />
        <ScrambleEmptyHolder answerIndex={1} key={5} />

      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    inputWords: state.scramble.inputWords,
    inputChanges: state.scramble.inputChanges,
    wordIndex: state.scramble.wordIndex
  };
};

const styles = {
  change: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  changeCommand: {
    fontSize: 22
  }
};

export default connect(mapStateToProps, null)(ScrambleGame);
