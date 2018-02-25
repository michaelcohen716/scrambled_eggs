import React from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import LevelButton from './LevelButton';
import Levels from '../games/levels.json';
import goldCoin from '../assets/goldCoin.png';

class LevelsPage extends React.Component {
  constructor(props){
    super(props);
    this.levels = Object.keys(Levels).length; //total levels in game
    this.state = {
      activeLevel: null
    };
  }

  render(){
    let levels = [];
    for (var i = 0; i < this.levels; i++) {
      const thisLevel = <LevelButton num={i+1} key={i}/>;
      levels.push(thisLevel);
    }

    return (
      <View style={styles.parent} animationOut={'fadeOut'}>
        <View style={styles.info}>
          <Text style={styles.eggcoin}>
            {this.props.eggcoin}
            <Image source={goldCoin} style={styles.goldEgg} />
          </Text>
        </View>
        <View style={styles.levels}>
          {levels}
        </View>
      </View>
    );
  }
}

const styles = {
  parent: {
    flex: 1,
    flexDirection: 'column'
  },
  info: {
    flexDirection: 'row',
    height: 40,
    borderColor: 'black',
    borderWidth: 0.3
  },
  levels: {
    padding: 5,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  eggcoin: {
    marginLeft: 8,
    marginTop: 9,
    fontSize: 15,
    fontWeight: 'bold'
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
    eggcoin: state.score.userEggcoin
  };
};

export default connect(mapStateToProps, null)(LevelsPage);
