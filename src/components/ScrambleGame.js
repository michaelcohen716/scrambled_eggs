import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Modal } from 'react-native';
import InfoBar from './InfoBar';
import ClueHolder from './ClueHolder';
import ScrambleEmptyHolder from './ScrambleEmptyHolder';
import ScrambleTile from './ScrambleTile';
import FryingPan from './FryingPan';
import ScrambleIntro from './ScrambleIntro';

class ScrambleGame extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      introVisible: true
    };
  }

  // componentWillReceiveProps(nextProps){
  //   if(nextProps.activeLevel === 2 && !nextProps.activeLevelAttempted){
  //     this.setState({ introVisible: true});
  //   }
  // }

  componentDidMount(){
    if(this.props.activeLevel === 2 && !this.props.activeLevelAttempted){
      this.setState({ introVisible: true });
    }
  }

  render(){
    const inputWords = this.props.inputWords;

    const firstClue = inputWords[0];

    const firstSet = firstClue.letters.slice(0, 5).split("");
    const firstSetLetters = firstSet.map((letter, idx) => {
      return (
        <ScrambleTile letter={letter} letterIndex={idx} key={idx} answerIndex={0}/>
      );
    });

    const secondSet = firstClue.letters.slice(5).split("");
    const secondSetLetters = secondSet.map((letter, idx) => {
      return (
        <ScrambleTile letter={letter} letterIndex={idx + 5} key={idx} answerIndex={0}/>
      );
    });

    const secondClue = inputWords[1];

    const inputChange = this.props.inputChanges[0];

    const emptySet = [];
    const secondSolutionLength = this.props.answers[1].length;
    for (var i = 0; i < secondSolutionLength; i++) {
      const emptyTile = <ScrambleTile key={i} />;
      emptySet.push(emptyTile);
    }

    const secondLettersHolder = this.props.wordIndex === 0 ? (
      emptySet
    ) : (
      secondClue.letters.split("").map((letter, idx) => {
        return (
          <ScrambleTile letter={letter} letterIndex={idx} key={idx} answerIndex={1} press={true}/>
        );
      })
    );

    return (
      <View style={styles.parent}>
        <InfoBar />
        {this.state.introVisible ? <ScrambleIntro /> : null}

        <View style={styles.clueHolder}>
          <ClueHolder clue={firstClue.clue} key={0} idx={1}/>
          <ScrambleEmptyHolder answerIndex={0} key={2} />
        </View>

        <View style={styles.lettersHolder}>
          <View style={styles.lettersHolder1}>
            {firstSetLetters}
          </View>

          <View style={styles.lettersHolder2}>
            {secondSetLetters}
          </View>

        </View>

        <View style={styles.change}>
          <Text style={styles.changeCommand}>{inputChange.clue} {inputChange.article} </Text>
          <ScrambleTile letter={inputChange.letter} />
        </View>

        <View style={styles.bottomLettersHolder}>
          <View style={styles.lettersHolder3}>
            {secondLettersHolder}
          </View>
        </View>

        <View style={styles.secondClue}>
          <ClueHolder style={styles.secondClueText} clue={secondClue.clue} idx={2}/>
          <View style={styles.secondClueRow}>
            <ScrambleEmptyHolder answerIndex={1} />
          </View>
        </View>

        <FryingPan inGame={true} />

      </View>
    );
  }
}

const styles = {
  parent: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'blue'
  },
  secondClueRow: {
    flexDirection: 'row'
  },
  bottomLettersHolder: {
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  lettersHolder3: {
    flexDirection: 'row',
    position: 'absolute',
    top: 180,
    right: 5
  },
  clueHolder: {
    flexDirection: 'column',
    position: 'absolute',
    top: 145,
    left: 3
  },
  lettersHolder: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginRight: 5
  },
  lettersHolder1: {
    flexDirection: 'row',
  },
  lettersHolder2: {
    flexDirection: 'row',
  },
  clue: {
    flexDirection: 'row'
  },
  change: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 268,
    right: 5,
    borderTopWidth: 1,
    borderColor: 'orange',
    paddingTop: 3
  },
  changeCommand: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'RobotoCondensed-Regular'
  },
  secondClueSetup: {
    position: 'absolute',
    top: 350,
    left: 8
  },
  setupClue: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 24,
    color: 'white'
  },
  secondClueText: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 24,
    color: 'white',
  },
  secondClue: {
    position: 'absolute',
    top: 385,
    left: 3,
    flex: 1,
  }
};

const mapStateToProps = state => {
  return {
    inputWords: state.scramble.inputWords,
    inputChanges: state.scramble.inputChanges,
    wordIndex: state.scramble.wordIndex,
    answers: state.scramble.answers,
    attempts: state.scramble.attempts,
    activeLevel: state.levels.activeLevel,
    activeLevelAttempted: state.score.activeLevelAttempted
  };
};

export default connect(mapStateToProps, null)(ScrambleGame);
