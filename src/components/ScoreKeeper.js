import React from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import { awardWordCompletion } from '../actions';
import Timer from './Timer';
// import eggImage from '../assets/egg.png';
// import coinSpin from '../assets/coin_spin.gif';

class ScoreKeeper extends React.Component {
  constructor(){
    super();
    this.state = {
      animateTimeline: 0
    };
    this.animateEggCoin = this.animateEggCoin.bind(this);
  }

  componentWillReceiveProps(nextProps){
    const { activeLevelAttempted, unattemptedBaseScore, attemptedBaseScore } = this.props;

    if(this.props.wordIndex < nextProps.wordIndex){
      let scoreIncrement = 0;

      if(this.props.activeLevel < this.props.nextUnsolvedLevel){
        scoreIncrement = 0; // reiterated to be explicit...no points for solved level
      }
      else if(activeLevelAttempted){
        scoreIncrement = Math.floor(attemptedBaseScore * this.props.scoreMultiplier);
      }
      else {
        scoreIncrement = Math.floor(unattemptedBaseScore * this.props.scoreMultiplier);
      }

      this.props.awardWordCompletion(scoreIncrement);
      // this.animateEggCoin();
    }
  }

  animateEggCoin(){
    this.setState({animateTimeline: 1});

    setTimeout(() => {
      this.setState({animateTimeline: 0});
    }, 500);
  }

  render(){
    return (
      <Timer />
    );
  }
}


const mapStateToProps = state => {
  const levelType = state.levels.levelType;

  return {
    roundScore: state.score.roundScore,
    wordIndex: state[levelType].wordIndex,
    scoreMultiplier: state.score.scoreMultiplier,
    activeLevelAttempted: state.score.activeLevelAttempted,
    attemptedBaseScore: state.score.attemptedBaseScore,
    unattemptedBaseScore: state.score.unattemptedBaseScore,
    activeLevel: state.levels.activeLevel,
    nextUnsolvedLevel: state.levels.nextUnsolvedLevel
  };
};

export default connect(mapStateToProps, { awardWordCompletion } )(ScoreKeeper);
