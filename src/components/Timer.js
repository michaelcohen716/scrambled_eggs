import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { endRound, recordScore, reduceScoreMultiplier } from '../actions';

class Timer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      seconds: this.props.seconds,
      timer: null
    };
    this.initialTime = this.props.seconds; //10
    this.tick = this.tick.bind(this);
    this.decrement = 100 / this.initialTime; // 100/10 = 10
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.addTimeToggle === true && this.props.addTimeToggle === false){
      // this.props.reduceScoreMultiplier(-(100 / this.initialTime * 20)); //add back score potential
      // this.setState({seconds: this.state.seconds + 20});
    }
  }

  componentDidMount(){
    let timer = setInterval(this.tick, 1000);
    this.setState({ timer });
  }

  tick(){
    const { roundScore, activeLevel, eggcoin, itemsToggle } = this.props;

    // executing 'recordScore' twice for some reason
    if(this.props.wordIndex === this.props.attempts.length){
      const timer = this.state.timer;
      this.setState({ timer: clearInterval(timer) });

      setTimeout(() => {
       const provisionalEggcoin = eggcoin + roundScore;

       this.props.recordScore(roundScore, provisionalEggcoin);

       const endRoundObject = {
         roundCompleted: true,
         activeLevel,
         itemsToggle
       };
       this.props.endRound(endRoundObject);

       return;
    }, 800);

    }

    const timeElapsed = this.initialTime - this.state.seconds;
    if(timeElapsed + 1 === this.initialTime){
      const endRoundObject = {
        roundCompleted: false,
        activeLevel,
        itemsToggle
      };

      this.props.endRound(endRoundObject);
      const timer = this.state.timer;
      this.setState({ timer: clearInterval(timer) });
      return;
    }

    this.props.reduceScoreMultiplier(this.decrement);
    this.setState({ seconds: this.state.seconds - 1});
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
    height: 44,
    width: 44,
    borderRadius: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2.5,
    borderColor: 'orange',
    borderWidth: 2,
  },
  seconds: {
    fontSize: 22,
    fontFamily: 'RobotoCondensed-Regular',
    color: 'white',
    marginBottom: 2
  }
};

const mapStateToProps = state => {
  let levelType = state.levels.levelType;

  return {
    wordIndex: state[levelType].wordIndex,
    attempts: state[levelType].attempts,
    roundScore: state.score.roundScore,
    eggcoin: state.score.userEggcoin,
    activeLevel: state.levels.activeLevel,
    seconds: state[levelType].roundTime,
    itemsToggle: state.items.itemsToggle,
    addTimeToggle: state.items.addTimeToggle,
    levelType
  };
};

export default connect(mapStateToProps, {
  endRound, recordScore, reduceScoreMultiplier
})(Timer);
