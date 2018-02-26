import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import ScoreKeeper from './ScoreKeeper';
import goldCoin from '../assets/goldCoin.png';

class InfoBar extends React.Component {
  constructor(){
    super();
    this.state = {
      animateChange: 0,
      animation: null,
      millisecondIncrement: 0,
      prevScore: null,
    };
    this.animate = this.animate.bind(this);
  }

  componentWillReceiveProps(nextProps){
    const prevScore = this.props.provisionalEggcoin;
    const nextScore = nextProps.provisionalEggcoin;
    this.setState({ prevScore });
    const millisecondIncrement = 1000 / (nextScore - prevScore); // 1000 / (1500 - 1000) = 2ms

    let animation = setInterval(this.animate, millisecondIncrement);
    this.setState({ animation, animateChange: nextScore - prevScore, millisecondIncrement });
  }

  animate(){
    if(this.state.animateChange - this.state.millisecondIncrement === 0){
      const animation = clearInterval(this.state.animation);
      this.setState({ animation });
    }
    let animateDecrement = 0;
    if(this.props.activeLevelAttempted){
      animateDecrement = 1;
    } else {
      animateDecrement = 7;
    }

    this.setState({ animateChange: this.state.animateChange - animateDecrement }); // control speed of score change animation
  }

  render(){
    let eggcoin = this.props.provisionalEggcoin;
    const eggcoinDelta = eggcoin - this.state.prevScore;

    if(this.state.animateChange > 0){
      eggcoin = this.state.prevScore + (eggcoinDelta * ((eggcoinDelta - this.state.animateChange)) / eggcoinDelta); // 1000 + (500 * (( 500 - 500))
      eggcoin = eggcoin.toFixed(0);
    }

    return (
      <View style={styles.container}>

        <Text style={styles.eggcoin}>
          {eggcoin}
        </Text>
        <Image source={goldCoin} style={styles.goldEgg} />
        <ScoreKeeper />
      </View>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    borderColor: 'blue',
    borderWidth: 0.5,
    justifyContent: 'space-between',
    height: 35
  },
  username: {
    marginLeft: 8,
    marginTop: 8
  },
  eggcoin: {
    marginLeft: 8,
    marginTop: 8,
    fontFamily: 'blockbrokers'
  },
  goldEgg: {
    height: 15,
    width: 15,
    marginLeft: 3,
    marginTop: 3
  }
};

const mapStateToProps = state => {
  return {
    eggcoin: state.score.userEggcoin,
    roundScore: state.score.roundScore,
    provisionalEggcoin: state.score.userEggcoin + state.score.roundScore,
    activeLevelAttempted: state.score.activeLevelAttempted
  };
};

export default connect(mapStateToProps, null)(InfoBar);
