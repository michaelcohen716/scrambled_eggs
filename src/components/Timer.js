import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { endRound, recordScore, reduceScoreMultiplier } from '../actions';

class Timer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      seconds: this.props.seconds, //10
      timer: null
    };
    this.initialTime = this.props.seconds; //10
    this.tick = this.tick.bind(this);
    this.tickJumble = this.tickJumble.bind(this);
    this.decrement = 100 / this.initialTime; // 100/10 = 10
  }

  componentDidMount(){
    let timer = setInterval(this.tick, 1000);
    this.setState({ timer });
  }

  tick(){
    // const { roundScore, activeLevel, eggcoin } = this.props;
    //
    // if(this.props.wordIndex === this.props.attempts.length){
    //   setTimeout(() => {
    //     const provisionalEggcoin = eggcoin + roundScore;
    //     this.props.recordScore(roundScore, provisionalEggcoin);
    //     this.props.endRound(true, activeLevel);
    //   }, 800);
    //
    //   const timer = this.state.timer;
    //   this.setState({ timer: clearInterval(timer) });
    //   return;
    // }
    //
    // const timeElapsed = this.initialTime - this.state.seconds;
    // if(timeElapsed + 1 == this.initialTime){
    //   this.props.endRound(false, activeLevel);
    //   const timer = this.state.timer;
    //   this.setState({ timer: clearInterval(timer) });
    // }
    if(this.props.levelType === "jumble"){
      this.tickJumble();
    }

    this.props.reduceScoreMultiplier(this.decrement);
    this.setState({ seconds: this.state.seconds - 1});
  }

  tickJumble(){
    const { roundScore, activeLevel, eggcoin } = this.props;

    if(this.props.wordIndex === this.props.attempts.length){
      setTimeout(() => {
        const provisionalEggcoin = eggcoin + roundScore;
        this.props.recordScore(roundScore, provisionalEggcoin);
        this.props.endRound(true, activeLevel);
      }, 800);

      const timer = this.state.timer;
      this.setState({ timer: clearInterval(timer) });
      return;
    }

    const timeElapsed = this.initialTime - this.state.seconds;
    if(timeElapsed + 1 == this.initialTime){
      this.props.endRound(false, activeLevel);
      const timer = this.state.timer;
      this.setState({ timer: clearInterval(timer) });
    }
  }

  render(){
    return (
      <View style={styles.timeCircle}>
        <Text style={styles.seconds}>
          {this.state.seconds}
        </Text>
      </View>
    );
  }
}

const styles = {
  timeCircle: {
    height: 46,
    width: 46,
    borderRadius: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 2
  },
  seconds: {
    fontSize: 22,
    color: 'white',
  }
};

const mapStateToProps = state => {
  let levelType = state.levels.levelType;

  if(levelType === "jumble"){
    return {
      wordIndex: state.jumble.wordIndex,
      attempts: state.jumble.attempts,
      roundScore: state.score.roundScore,
      eggcoin: state.score.userEggcoin,
      activeLevel: state.levels.activeLevel,
      seconds: state.jumble.roundTime,
      levelType
    };
  } else {
    return {
      seconds: state.scramble.roundTime,
      levelType
    };
  }

};

export default connect(mapStateToProps, {
  endRound, recordScore, reduceScoreMultiplier
})(Timer);
