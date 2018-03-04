import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CommaNumber from 'comma-number';

class RoundReview extends React.Component {
  proceed(){
    Actions.levels({ type:'reset' });
  }

  render(){
    let { completedWords, potentialWords, roundScore } = this.props;
    let summary = `You found ${completedWords} of ${potentialWords} words`;
    let text = "Better luck next time!";
    let buttonText = "Try again!";

    roundScore = CommaNumber(roundScore);

    if(this.props.roundCompleted && this.props.levelType === "jumble"){
      summary = `Congrats, you found all ${potentialWords} words.`;
      text = `You earned ${roundScore} eggcoin!`;
      buttonText = "Solve the next puzzle";
    }

    if(this.props.roundCompleted && this.props.levelType === "scramble"){
      summary = "You cracked the shell. Well done.";
      text = `You earned ${roundScore} eggcoin!`;
      buttonText = "Solve the next puzzle";
    }

    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <Text style={styles.text}>
            {summary}
          </Text>

          <Text style={styles.text}>
            {text}
          </Text>
        </View>

        <TouchableOpacity onPress={this.proceed} style={styles.proceed}>
          <Text style={styles.buttonText}>
            {buttonText}
          </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'column',
    flex: 1
  },
  text: {
    fontSize: 20,
    color: 'blue',
    margin: 5,
    textAlign: 'center'
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  inner: {
    marginTop: 75
  },
  proceed: {
    justifyContent: 'center',
    flex: 0.12,
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: 'blue',
    borderWidth: 1,
    borderRadius: 5
  }
};

const mapStateToProps = state => {
  const levelType = state.levels.levelType;

  return {
    roundCompleted: state.jumble.roundCompleted,
    potentialWords: state.jumble.attempts.length,
    completedWords: state.jumble.wordIndex,
    levelType: state.levels.levelType,
    roundScore: state.score.roundScore
  };
};

export default connect(mapStateToProps, null)(RoundReview);
