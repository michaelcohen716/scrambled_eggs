import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import InfoBar from './InfoBar';
import ScrambleWordHolder from './ScrambleWordHolder';
import ClueHolder from './ClueHolder';
import ScrambleEmptyHolder from './ScrambleEmptyHolder';

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
    // const units = this.props.inputWords.length;
    // const elements = [];
    //
    // for (var i = 0; i < units; i++) {
    //   const letters = this.props.inputWords[i].letters;
    //   const clue = this.props.inputWords[i].clue;
    //
    //   const clueElement = (
    //     <ClueHolder clue={clue} key={i + this.state.clues}/>
    //   );
    //   elements.push(clueElement);
    //
    //   const element = (
    //     <ScrambleWordHolder activeLetters={letters} answerIndex={i}
    //                         key={i + this.state.words}/>
    //   );
    //   elements.push(element);
    //
    //   const empty = (
    //     <ScrambleEmptyHolder answerIndex={i} key={i + this.state.empties}/>
    //   );
    //   elements.push(empty);
    //
    //
    // }

    // return (
    //   <View>
    //     <InfoBar />
    //     {elements}
    //
    //
    //   </View>
    // );
    const inputWords = this.props.inputWords;
    const firstClue = inputWords[0];
    const secondClue = inputWords[1];

    const inputChange = this.props.inputChanges[0];

    return (
      <View>
        <InfoBar />

        <ClueHolder clue={firstClue.clue} key={0} />
        <ScrambleWordHolder activeLetters={firstClue.letters} answerIndex={0} key={1} />
        <ScrambleEmptyHolder answerIndex={0} key={2} />

        <View style={styles.change}>
          <Text style={styles.changeCommand}>{inputChange.clue} {inputChange.article}</Text>
          <Text style={styles.changeLetter}>{inputChange.letter.toUpperCase()}</Text>
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
    inputChanges: state.scramble.inputChanges
  };
};

const styles = {
  change: {
    flexDirection: 'row'
  },
  changeCommand: {
    fontSize: 16
  },
  changeLetter: {
    fontSize: 24
  }
};

export default connect(mapStateToProps, null)(ScrambleGame);
