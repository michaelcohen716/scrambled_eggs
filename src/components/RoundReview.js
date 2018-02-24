import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

class RoundReview extends React.Component {
  proceed(){
    Actions.levels({ type:'reset' });
  }

  render(){
    const { completedWords, potentialWords } = this.props;

    let text = "Better luck next time!";
    let summary = `You found ${completedWords} of ${potentialWords} words`;
    let buttonText = "Try again!";

    if(this.props.roundCompleted){
      text = "Congrats on completing the puzzle!";
      summary = `You found all ${potentialWords} words.`;
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
  return {
    roundCompleted: state.game.roundCompleted,
    potentialWords: state.game.attempts.length,
    completedWords: state.game.wordIndex
  };
};

export default connect(mapStateToProps, null)(RoundReview);
