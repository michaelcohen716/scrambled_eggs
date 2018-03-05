import React from 'react';
import { View, ScrollView, Text, Image, Dimensions } from 'react-native';
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
            Stage: <Text style={styles.stageBlue}>{this.props.stage}</Text>
          </Text>

          <Text style={styles.eggcoin}>
            {CommaNumber(this.props.eggcoin)}
            <Image source={goldCoin} style={styles.goldEgg} />
          </Text>
        </View>

          <View style={styles.levels}>
            <ScrollView horizontal={false} contentContainerStyle={styles.contentContainerStyle} >
              {levels}
            </ScrollView>
          </View>

        <View style={styles.fryingPan}>

          <View style={styles.fryingTopBar}>
            <Text style={styles.fryingPanText}>The Frying Pan</Text>
            <View style={styles.fryingEggcoin}>
              <Text style={styles.fryingPanText}>{CommaNumber(this.props.eggcoin)}</Text>
              <Image source={goldCoin} style={styles.goldEgg2} />
            </View>
          </View>

          <View style={styles.fryingGallery}>

          </View>
        </View>
      </View>
    );
  }
}

var { height, width } = Dimensions.get('window');

const styles = {
  parent: {
    flex: 1,
    flexDirection: 'column',
  },
  fryingGallery: {
    flex: 2,
    borderColor: 'yellow',
    borderWidth: 1
  },
  contentContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'flex-start',
  },
  fryingTopBar: {
    flex: 1,
    // height: 30,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  fryingPanText: {
    color: 'white',
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 22,
    marginTop: 1,
    marginLeft: 12
  },
  fryingEggcoin: {
    flexDirection: 'row',
    marginTop: 1,
    marginRight: 9
  },
  fryingPan: {
    height: 100,
    position: 'absolute',
    bottom: 0,
    width: width,
    alignSelf: 'stretch',
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 2
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
  goldEgg2: {
    height: 20,
    width: 20,
    marginRight: 5,
    marginLeft: 3,
    marginTop: 6
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
