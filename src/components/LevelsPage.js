import React from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import Levels from '../games/levels.json';
import LevelButton from './LevelButton';
import goldCoin from '../assets/goldCoin.png';
import CommaNumber from 'comma-number';

class LevelsPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeLevel: null
    };
    this.levels = Object.keys(Levels).length; //total levels in game
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
          <Text style={styles.stage}>
            Stage: <Text style={styles.stageBlue}>{this.props.stage}</Text>
          </Text>

          <Text style={styles.eggcoin}>
            {CommaNumber(this.props.eggcoin)}
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
    justifyContent: 'space-between',
    height: 40,
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: 'black'
  },
  levels: {
    padding: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'black'
  },
  eggcoin: {
    marginRight: 12,
    marginTop: 2,
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'RobotoCondensed-Regular',
    color: 'white'
  },
  goldEgg: {
    height: 20,
    width: 20,
    marginRight: 5,
    marginLeft: 3,
    marginTop: 2
  },
  stage: {
    fontSize: 25,
    fontFamily: 'RobotoCondensed-Regular',
    marginLeft: 13,
    marginBottom: 4,
    color: 'blue'
  },
  stageBlue: {
    color: 'white'
  }
};

const mapStateToProps = state => {
  return {
    eggcoin: state.score.userEggcoin,
    stage: state.levels.stage,
  };
};

export default connect(mapStateToProps, null)(LevelsPage);
