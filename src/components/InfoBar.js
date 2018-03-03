import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import ScoreKeeper from './ScoreKeeper';
import goldCoin from '../assets/goldCoin.png';
import undoButton from '../assets/undo.png';
import { undoWord } from '../actions';

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
    this.undoWord = this.undoWord.bind(this);
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

  undoWord(){
    this.props.undoWord();
  }

  render(){
    let eggcoin = this.props.provisionalEggcoin;
    const eggcoinDelta = eggcoin - this.state.prevScore;

    if(this.state.animateChange > 0){
      eggcoin = this.state.prevScore + (eggcoinDelta * ((eggcoinDelta - this.state.animateChange)) / eggcoinDelta); // 1000 + (500 * (( 500 - 500))
      eggcoin = eggcoin.toFixed(0);
    }

    const undoButtonElement = this.props.advanceStagePage ? (
      <View></View>
    ) : (
      <TouchableOpacity style={styles.undoContainer} onPress={this.undoWord}>
        <Image source={undoButton} style={styles.undo}/>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>

        <View style={styles.coinInfo}>
          <Text style={styles.eggcoin}>
            {eggcoin}
          </Text>
          <Image source={goldCoin} style={styles.goldEgg} />
        </View>

        {undoButtonElement}

        <View style={styles.score}>
          <ScoreKeeper />
        </View>
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
  return {
    eggcoin: state.score.userEggcoin,
    roundScore: state.score.roundScore,
    provisionalEggcoin: state.score.userEggcoin + state.score.roundScore,
    activeLevelAttempted: state.score.activeLevelAttempted,
    wordIndex: state.jumble.wordIndex
  };
};

export default connect(mapStateToProps, { undoWord })(InfoBar);
