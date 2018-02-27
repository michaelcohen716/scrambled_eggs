import React from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import { awardWordCompletion } from '../actions';
import Timer from './Timer';
import eggImage from '../assets/egg.png';
import coinSpin from '../assets/coin_spin.gif';

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
      this.animateEggCoin();
    }
  }

  animateEggCoin(){
    this.setState({animateTimeline: 1});

    setTimeout(() => {
      this.setState({animateTimeline: 0});
    }, 500);
  }

  render(){
    // const egg = (key) => {
    //   if(this.state.animateTimeline === 1){
    //     return (
    //       <Image source={coinSpin} style={styles.egg} key={key} idx={key}/>
    //     );
    //   } else {
    //     return (
    //       <Image source={eggImage} style={styles.egg} key={key} idx={key}/>
    //     );
    //   }
    // };
    //
    // const eggs = [];
    // const wordIndex = this.props.wordIndex;
    // for (var i = 0; i < wordIndex; i++) {
    //   eggs.push(egg(i));
    // }

    return (
      <Timer />
    );
  }
}

// <View style={styles.container}>
//   {eggs}
// </View>
const styles = {
  container: {
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  // score: {
  //   fontSize: 18
  // },
  egg: {
    width: 15,
    height: 20,
    marginBottom: 6.5,
    marginRight: 3
  }
};

const mapStateToProps = state => {
  return {
    roundScore: state.score.roundScore,
    wordIndex: state.game.wordIndex,
    scoreMultiplier: state.score.scoreMultiplier,
    activeLevelAttempted: state.score.activeLevelAttempted,
    attemptedBaseScore: state.score.attemptedBaseScore,
    unattemptedBaseScore: state.score.unattemptedBaseScore,
    activeLevel: state.levels.activeLevel,
    nextUnsolvedLevel: state.levels.nextUnsolvedLevel
  };
};

export default connect(mapStateToProps, { awardWordCompletion } )(ScoreKeeper);
