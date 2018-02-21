import React from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { awardWordCompletion } from '../actions';
import eggImage from '../assets/egg.png';
import CoinSpin from '../assets/Coin_spin.gif';

class ScoreKeeper extends React.Component {
  componentWillReceiveProps(nextProps){
    if(this.props.wordIndex < nextProps.wordIndex){
      this.props.awardWordCompletion();
    }
  }

  render(){
    const roundScore = this.props.roundScore;
    const egg = (key) => <Image source={eggImage} style={styles.egg} key={key}/>;
    const eggs = [];
    for (var i = 0; i < roundScore; i++) {
      eggs.push(egg(i));
    }

    return (
      <View style={styles.container}>
        {eggs}
        <Image source={CoinSpin} style={styles.egg} />
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
    wordIndex: state.game.wordIndex
  };
};

export default connect(mapStateToProps, { awardWordCompletion } )(ScoreKeeper);
