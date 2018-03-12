import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CommaNumber from 'comma-number';
import SunnySideUp from '../assets/sunny_side_up.png';
import HardBoiled from '../assets/hard_boiled.png';
import OverEasy from '../assets/over_easy.png';
import Frittata from '../assets/frittata.png';

class RoundReview extends React.Component {
  proceed(){
    Actions.levels({ type:'reset' });
  }

  render(){
    let { completedWords, potentialWords, roundScore, activeLevel } = this.props;
    let summary = `You found ${completedWords} of ${potentialWords} words.`;
    let text = "Better luck next time!";
    let buttonText = "Try again!";

    roundScore = CommaNumber(roundScore);
    const { roundCompleted, levelType } = this.props;

    if(roundCompleted && levelType === "jumble"){
      summary = "You found every possible jumble!";
      text = `And you earned ${roundScore} eggcoin!`;
      buttonText = "Solve the next puzzle";
    }

    if(roundCompleted && levelType === "scramble"){
      summary = "You cracked the shell. Well done.";
      text = `And you earned ${roundScore} eggcoin!`;
      buttonText = "Solve the next puzzle";
    }

    if(roundCompleted && levelType === "ladder"){
      summary = "You climbed down the ladder. Nice!";
      text = `And you earned ${roundScore} eggcoin!`;
      buttonText = "Solve the next puzzle";
    }

    let image;
    if(activeLevel < 21){
      image = SunnySideUp;
    } else if(activeLevel < 41){
      image = HardBoiled;
    } else if(activeLevel < 61){
      image = OverEasy;
    } else if(activeLevel < 81){
      image = Frittata;
    }

    return (
      <View style={styles.container}>
        <View style={styles.stage}>
          <View style={styles.stageName}>
            <Text style={styles.stageText}>{this.props.stageName}</Text>
          </View>
          <View style={styles.picHolder}>
            <Image source={image} style={styles.image}/>
          </View>
        </View>

        <View style={styles.summary}>
          <Text style={styles.text}>
            {summary}
          </Text>

          <Text style={styles.text}>
            {text}
          </Text>
        </View>

        <View style={styles.proceedHolder}>
          <TouchableOpacity onPress={this.proceed} style={styles.proceed}>
            <Text style={styles.buttonText}>
              {buttonText}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.invite}>
          <TouchableOpacity style={styles.proceed}>
            <Text style={styles.buttonText}>Invite friends</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = {
  stageText: {
    fontSize: 27,
    fontFamily: 'RobotoCondensed-Regular',
    fontWeight: 'bold'
  },
  picHolder: {
    width: 90,
    height: 90
  },
  proceedHolder: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inviteFriends: {
    flex: 1,
    marginLeft: 40,
    marginRight: 40
  },
  stage: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  summary: {
    flex: 1,
    backgroundColor: 'blue',
    flexDirection: 'column'
  },
  invite: {
    flex: 3,
    backgroundColor: 'blue',
    alignItems: 'center'
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'contain',
  },
  container: {
    flexDirection: 'column',
    flex: 1
  },
  text: {
    fontSize: 23,
    color: 'white',
    fontFamily: 'RobotoCondensed-Regular',
    fontWeight: 'bold',
    margin: 5,
    textAlign: 'center'
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'RobotoCondensed-Regular',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  proceed: {
    justifyContent: 'center',
    height: 70,
    width: 200,
    marginTop: 8,
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: 'black',
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 5,

  }
};

const mapStateToProps = state => {
  const levelType = state.levels.levelType;

  return {
    roundCompleted: state[levelType].roundCompleted,
    potentialWords: state[levelType].attempts.length,
    completedWords: state[levelType].wordIndex,
    roundScore: state.score.roundScore,
    activeLevel: state.levels.activeLevel,
    stageName: state.levels.stage,
    levelType,
  };
};

export default connect(mapStateToProps, null)(RoundReview);
