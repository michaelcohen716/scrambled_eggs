import React from 'react';
import { View, Text, Image, Dimensions, ScrollView, FlatList } from 'react-native';
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
  { "item": "seeALetter",
    "firstImage": binocularsWhite,
    "secondImage": binocularsBlack,
    "cost": 450
  },
  { "item": "fireUp",
    "firstImage": flameWhite,
    "secondImage": flameBlack,
    "cost": 650
  },
  { "item": "shakeItUp",
    "firstImage": blenderWhite,
    "secondImage": blenderBlack,
    "cost": 75
  },
  { "item": "shakeItUp",
    "firstImage": blenderWhite,
    "secondImage": blenderBlack,
    "cost": 75
  },
  { "item": "shakeItUp",
    "firstImage": blenderWhite,
    "secondImage": blenderBlack,
    "cost": 75
  }
]

class FryingPan extends React.Component {
  constructor(props){
    super(props);
    this.markedItem = null;
    this.unmarkOtherItems = this.unmarkOtherItems.bind(this);
  }

  unmarkOtherItems(idx){
    this.markedItem = idx;
  }


  render(){
    const items = fryingItems.map((item, idx) => {
      return (
        <FryingPanItem info={item} itemsToggle={this.props.itemsToggle} idx={idx}
                       key={idx} inGame={this.props.inGame} marked={this.markedItem}
                       unmarkOtherItems={this.unmarkOtherItems.bind(this, idx)} />
              );
    });

    const eggcoinCounter = this.props.inGame ? (
      <View style={styles.fryingEggcoin}></View>
    ) : (
      <View style={styles.fryingEggcoin}>
        <Text style={styles.fryingPanText}>{CommaNumber(this.props.eggcoin)}</Text>
        <Image source={goldCoin} style={styles.goldEgg2} />
      </View>
    );

    const flatList = (
      <FlatList
          data={items} renderItem= { ({item}) => (item) } horizontal={true}
          style={styles.fryingItems}
      />
    );

    return (
      <View style={styles.fryingPan}>

        <View style={styles.fryingTopBar}>
          <Text style={styles.fryingPanText}>The Frying Pan</Text>
          {eggcoinCounter}
        </View>

        <View style={styles.fryingGallery}>
            {flatList}
            <View>
              <Text style={styles.itemMessage}>See A Letter</Text>
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 4,
    paddingBottom: 4
  },
  scrolling: {
    height: 50,
    width: 235,
  },
  itemMessage: {
    color: 'white',
  },
  fryingItems: {
    flex: 2,
    backgroundColor: 'black',
    flexDirection: 'row',
    marginLeft: 13,
    paddingTop: 8,
    paddingBottom: 8,
    // justifyContent: 'flex-start',
    overflow: 'hidden',
    borderColor: 'silver',
    borderWidth: 1,
    maxWidth: 250
  },
  fryingGallery: {
    flex: 2,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'flex-start'
  },
  fryingTopBar: {
    flex: 1,
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
    itemsToggle: state.items.itemsToggle
  };
};

export default connect(mapStateToProps, null)(FryingPan);
