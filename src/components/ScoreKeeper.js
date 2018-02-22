import React from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import { awardWordCompletion } from '../actions';
import eggImage from '../assets/egg.png';
import coinSpin from '../assets/coin_spin.gif';
var baseScore = 5; // figure out cleaner way to do this

class ScoreKeeper extends React.Component {
  constructor(){
    super();
    this.state = {
      animateTimeline: 0
    };
    this.animateEggCoin = this.animateEggCoin.bind(this);
  }

  componentWillReceiveProps(nextProps){
    const scoreIncrement = baseScore * this.props.scoreMultiplier;

    if(this.props.wordIndex < nextProps.wordIndex){
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
    const egg = (key) => {
      if(this.state.animateTimeline === 1){
        return (
          <Image source={coinSpin} style={styles.egg} key={key} idx={key}/>
        );
      } else {
        return (
          <Image source={eggImage} style={styles.egg} key={key} idx={key}/>
        );
      }
    };

    const eggs = [];
    const wordIndex = this.props.wordIndex;
    for (var i = 0; i < wordIndex; i++) {
      eggs.push(egg(i));
    }


    return (
      <View style={styles.container}>
        {eggs}
      </View>
    );
  }
}

const styles = {
  container: {
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  score: {
    fontSize: 18
  },
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
    scoreMultiplier: state.score.scoreMultiplier
  };
};

export default connect(mapStateToProps, { awardWordCompletion } )(ScoreKeeper);
