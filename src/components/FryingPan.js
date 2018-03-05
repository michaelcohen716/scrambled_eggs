import React from 'react';
import { View, Text, Image, Dimensions, } from 'react-native';
import { connect } from 'react-redux';
import goldCoin from '../assets/goldCoin.png';
import CommaNumber from 'comma-number';

import FryingPanItem from './FryingPanItem';
import binocularsWhite from '../assets/binoculars_white.png';
import binocularsBlack from '../assets/binoculars_black.png';
import flameWhite from '../assets/flame_white.png';
import flameBlack from '../assets/flame_black.png';
import blenderWhite from '../assets/blender_white.png';
import blenderBlack from '../assets/blender_black.png';


var fryingItems = [
  { "name": "seeALetter",
    "firstImage": binocularsWhite,
    "secondImage": binocularsBlack,
    "cost": 450
  },
  { "name": "fireUp",
    "firstImage": flameWhite,
    "secondImage": flameBlack,
    "cost": 650
  },
  { "name": "shakeItUp",
    "firstImage": blenderWhite,
    "secondImage": blenderBlack,
    "cost": 75
  }
]

class FryingPan extends React.Component {
  render(){
    const items = fryingItems.map((item, idx) => {
      return (
        <FryingPanItem info={item} key={idx} />
      )
    })

    return (
      <View style={styles.fryingPan}>

        <View style={styles.fryingTopBar}>
          <Text style={styles.fryingPanText}>The Frying Pan</Text>
          <View style={styles.fryingEggcoin}>
            <Text style={styles.fryingPanText}>{CommaNumber(this.props.eggcoin)}</Text>
            <Image source={goldCoin} style={styles.goldEgg2} />
          </View>
        </View>

        <View style={styles.fryingGallery}>
          <View style={styles.fryingItems}>
            {items}
          </View>
          <View style={styles.fryingStore}>
            <Text>store</Text>
          </View>
        </View>
      </View>
    );
  }
}
var { width } = Dimensions.get('window');

const styles = {
  fryingStore: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'row'
  },
  fryingItems: {
    flex: 2,
    backgroundColor: 'black',
    flexDirection: 'row',
    paddingLeft: 14,
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: 'flex-start'
  },
  fryingGallery: {
    flex: 2,
    borderColor: 'yellow',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
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
  goldEgg2: {
    height: 20,
    width: 20,
    marginRight: 5,
    marginLeft: 3,
    marginTop: 6
  },
};

const mapStateToProps = state => {
  return {
    eggcoin: state.score.userEggcoin,
  };
};

export default connect(mapStateToProps, null)(FryingPan);
