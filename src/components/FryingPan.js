import React from 'react';
import { View, Text, Image, Dimensions,
  FlatList, TouchableOpacity }
  from 'react-native';
import { connect } from 'react-redux';
import goldCoin from '../assets/goldCoin.png';
import CommaNumber from 'comma-number';
import EggcoinMarket from './EggcoinMarket';

import FryingPanItem from './FryingPanItem';
import binocularsWhite from '../assets/binoculars_white.png';
import binocularsBlack from '../assets/binoculars_black.png';
import blenderWhite from '../assets/blender_white.png';
import blenderBlack from '../assets/blender_black.png';
import giftWhite from '../assets/gift_white.png';
import giftBlack from '../assets/gift_black.png';
import flameWhite from '../assets/flame_white.png';
import flameBlack from '../assets/flame_black.png';
import clockWhite from '../assets/clock_white.png';
import clockBlack from '../assets/clock_black.png';

var fryingItems = [
  { "item": "seeALetter",
    "firstImage": binocularsWhite,
    "secondImage": binocularsBlack,
    "cost": 250,
    "description": "See a letter"
  },
  { "item": "unlockAWord",
    "firstImage": giftWhite,
    "secondImage": giftBlack,
    "cost": 600,
    "description": "Unlock a word"
  },
  { "item": "shakeItUp",
    "firstImage": blenderWhite,
    "secondImage": blenderBlack,
    "cost": 75,
    "description": "Shake up letters"
  },
  { "item": "fireUp",
    "firstImage": flameWhite,
    "secondImage": flameBlack,
    "cost": 825,
    "description": "2x eggcoin earnings"
  },
  { "item": "addTime",
    "firstImage": clockWhite,
    "secondImage": clockBlack,
    "cost": 475,
    "description": "Add 20 seconds"
  },
];

class FryingPan extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      marked: null,
      eggcoinMarket: false
    };
    this.unmarkOtherItems = this.unmarkOtherItems.bind(this);
    this.renderMarket = this.renderMarket.bind(this);
  }

  unmarkOtherItems(idx){
    this.setState({ marked: idx});
  }

  renderMarket(){
    this.setState({ eggcoinMarket: true });
  }

  render(){
    const items = fryingItems.map((item, idx) => {
      return (
        <FryingPanItem info={item} itemsToggle={this.props.itemsToggle} idx={idx}
                       key={idx} inGame={this.props.inGame} marked={this.state.marked}
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

    const buyEggcoinButton = (
      this.props.itemMessage === 'Buy Some Eggcoin' ? (
        <TouchableOpacity style={styles.buyEggcoinButton} onPress={this.renderMarket}>
          <Text style={[styles.itemMessage, styles.eggcoinSale]}>Buy Eggcoin</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.itemMessage}>{this.props.itemMessage}</Text>
      )
    );

    return (
      <View style={styles.fryingPan}>

        {this.state.eggcoinMarket ? <EggcoinMarket /> : null }

        <View style={styles.fryingTopBar}>
          <Text style={styles.fryingPanText}>The Frying Pan</Text>
          {eggcoinCounter}
        </View>

        <View style={styles.fryingGallery}>
            <View style={styles.scrolling}>
              {flatList}
            </View>

            <View style={styles.fryingMessage}>
              {buyEggcoinButton}
            </View>
        </View>
      </View>
    );
  }
}

var { width } = Dimensions.get('window');

const styles = {
  eggcoinSale: {
    marginBottom: 10
  },
  buyEggcoinButton: {
    borderColor: 'blue',
    borderWidth: 2,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 8,
    marginBottom: 9,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: 120
  },
  fryingMessage: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrolling: {
    flex: 4
  },
  itemMessage: {
    color: 'white',
    fontSize: 18,
    marginTop: 14,
    fontFamily: 'RobotoCondensed-Regular',
  },
  fryingItems: {
    flex: 2,
    backgroundColor: 'black',
    flexDirection: 'row',
    marginLeft: 13,
    paddingTop: 8,
    paddingBottom: 8,
    overflow: 'hidden',
  },
  fryingGallery: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderColor: 'red',
    borderWidth:1
  },
  fryingTopBar: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'yellow',
    borderWidth: 1
  },
  fryingPanText: {
    color: 'white',
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 23,
    marginBottom: 1,
    marginLeft: 12
  },
  fryingEggcoin: {
    flexDirection: 'row',
    marginBottom: 1,
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
    borderWidth: 2,
    flexDirection: 'column'
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
    itemsToggle: state.items.itemsToggle,
    itemMessage: state.items.message
  };
};

export default connect(mapStateToProps, null)(FryingPan);
