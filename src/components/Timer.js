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
    this.decrement = 100 / this.initialTime; // 100/10 = 10
  }

  componentDidMount(){
    let timer = setInterval(this.tick, 1000);
    this.setState({ timer });
  }

  tick(){
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

    this.props.reduceScoreMultiplier(this.decrement);
    this.setState({ seconds: this.state.seconds - 1});
  }

  render(){
    var fillerUnit = 1 / this.initialTime; // 1/30 = 1 / 30
    var styles = {
      filler: {
        backgroundColor: 'black',
        height: 5,
        flex: fillerUnit
      },
      holder: {
        borderColor: 'black',
        borderWidth: 1,
        height: 6,
        backgroundColor: 'white',
        flexDirection: 'row',
      }
    };

    const filler = (id) => (
      <View style={styles.filler} key={id}>
      </View>
    );

    const timeElapsed = this.initialTime - this.state.seconds; // 20 = 30 - 10

    let fillers = [];
    for (var i = 0; i < timeElapsed; i++) {
      const nextFiller = filler(i);
      fillers.push(nextFiller);
    }

    return (
      <View style={styles.holder}>
        {fillers}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    wordIndex: state.game.wordIndex,
    attempts: state.game.attempts,
    roundScore: state.score.roundScore,
    eggcoin: state.score.userEggcoin,
    activeLevel: state.levels.activeLevel
  };
};

export default connect(mapStateToProps, {
  endRound, recordScore, reduceScoreMultiplier
})(Timer);
