import React from 'react';
import { View, ScrollView, Text, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Levels from '../games/levels.json';
import LevelButton from './LevelButton';
import FryingPan from './FryingPan';
import goldCoin from '../assets/goldCoin.png';
import CommaNumber from 'comma-number';

class LevelsPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeLevel: null
    };
    this.levels = Object.keys(Levels); //all levels in game
    this.numLevels = this.levels.length;
  }

  render(){
    const levels = this.levels.map((level, idx) => {
      return (
        <LevelButton num={idx+1} key={idx} />
      );
    });

    return (
      <View style={styles.parent} animationOut={'fadeOut'}>

        <View style={styles.info}>
          <Text style={styles.stage}>
            {this.props.stage}
          </Text>

        </View>

        <View style={styles.levels}>
          <ScrollView horizontal={false} contentContainerStyle={styles.contentContainerStyle} >
            {levels}
          </ScrollView>
        </View>

        <FryingPan />

      </View>
    );
  }
}

const styles = {
  parent: {
    flex: 1,
    flexDirection: 'column',
  },

  contentContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'flex-start',
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
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: 'black',
    alignItems: 'flex-start',
    flex: 1,
    height: 300
  },
  eggcoin: {
    marginRight: 17,
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
    color: 'white'
  },

};

const mapStateToProps = state => {
  return {
    eggcoin: state.score.userEggcoin,
    stage: state.levels.stage,
  };
};

export default connect(mapStateToProps, null)(LevelsPage);
