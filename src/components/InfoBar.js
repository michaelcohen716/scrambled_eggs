import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import ScoreKeeper from './ScoreKeeper';
import goldCoin from '../assets/goldCoin.png';
import undoButton from '../assets/undo.png';
import { undoWord } from '../actions';
import coinSpin from '../assets/coin_spin.gif';
import CommaNumber from 'comma-number';

class InfoBar extends React.Component {
  constructor(){
    super();
    this.state = {
      animateChange: 0,
      animation: null,
      millisecondIncrement: 0,
      prevScore: null,
      purchaseTimeline: 0
    };
    this.animate = this.animate.bind(this);
    this.undoWord = this.undoWord.bind(this);
    this.animatePurchase = this.animatePurchase.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.provisionalEggcoin !== this.props.provisionalEggcoin){
      const prevScore = this.props.provisionalEggcoin;
      const nextScore = nextProps.provisionalEggcoin;
      this.setState({ prevScore });
      const millisecondIncrement = 1000 / (nextScore - prevScore); // 1000 / (1500 - 1000) = 2ms

      let animation = setInterval(this.animate, millisecondIncrement);
      this.setState({ animation, animateChange: nextScore - prevScore, millisecondIncrement });
    }

    if(nextProps.eggcoinCost !== this.props.eggcoinCost){
      this.animatePurchase();
    }
  }

  animatePurchase(){
    this.setState({ purchaseTimeline: 1});
    setTimeout(() => {
      this.setState({ purchaseTimeline: 0});
    }, 800);
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

    if(this.props.advanceStagePage){
      animateDecrement = 7;
    }

    this.setState({ animateChange: this.state.animateChange - animateDecrement }); // control speed of score change animation
  }

  undoWord(){
    this.props.undoWord();
  }

  render(){
    let eggcoin = this.props.provisionalEggcoin;
    if(this.props.advanceStagePage){
      eggcoin = this.props.eggcoin;
    }

    const eggcoinDelta = eggcoin - this.state.prevScore;

    if(this.state.animateChange > 0){
      eggcoin = this.state.prevScore + (eggcoinDelta * ((eggcoinDelta - this.state.animateChange)) / eggcoinDelta); // 1000 + (500 * (( 500 - 500))
      eggcoin = eggcoin.toFixed(0);
    }

    if(this.state.purchaseTimeline === 1){
      eggcoin = (
        <View style={styles.coinInfo}>
          <Image source={coinSpin} style={styles.egg} />
        </View>
      );
    } else {
      eggcoin = (
        <View style={styles.coinInfo}>
          <Text style={styles.eggcoin}>
            {CommaNumber(eggcoin)}
          </Text>
          <Image source={goldCoin} style={styles.goldEgg} />
        </View>
      );
    }

    const undoButtonElement = this.props.advanceStagePage ? (
      <View></View>
    ) : (
      <TouchableOpacity style={styles.undoContainer} onPress={this.undoWord}>
        <Image source={undoButton} style={styles.undo}/>
      </TouchableOpacity>
    );

    const scoreKeeperElement = this.props.advanceStagePage ? (
      <View></View>
    ) : (
      <View style={styles.score}>
        <ScoreKeeper />
      </View>
    );

    return (
      <View style={styles.container}>

        {eggcoin}

        {undoButtonElement}

        {scoreKeeperElement}

      </View>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    borderColor: 'white',
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  egg: {
    height: 30,
    width: 30,
    marginLeft: 8
  },
  coinInfo: {
    flexDirection: 'row',
    flex: 0.33,
    height: 40,
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  eggcoin: {
    marginLeft: 8,
    marginTop: 3,
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black'
  },
  goldEgg: {
    height: 21,
    width: 21,
    marginLeft: 3,
    marginTop: 8
  },
  undo: {
    height: 35,
    width: 35,
    marginTop: 2.5
  },
  undoContainer: {
    height: 40,
    flex: 0.3333,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  score: {
    height: 44,
    flex: 0.33,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginRight: 2,
    marginBottom: 1
  }
};

const mapStateToProps = state => {
  let provisionalEggcoin = 0;
  if(!state.levels.advanceStagePage){
    provisionalEggcoin = state.score.userEggcoin + state.score.roundScore;
  } else {
    provisionalEggcoin = state.score.userEggcoin - state.score.eggcoinCost;
  }

  return {
    eggcoin: state.score.userEggcoin,
    roundScore: state.score.roundScore,
    provisionalEggcoin: provisionalEggcoin,
    activeLevelAttempted: state.score.activeLevelAttempted,
    wordIndex: state.jumble.wordIndex,
    eggcoinCost: state.score.eggcoinCost,
    advanceStagePage: state.levels.advanceStagePage
  };
};

export default connect(mapStateToProps, { undoWord })(InfoBar);
