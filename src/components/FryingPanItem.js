import React from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import { connect } from 'react-redux';
import binocularsWhite from '../assets/binoculars_white.png';
import binocularsBlack from '../assets/binoculars_black.png';
import goldCoin from '../assets/goldCoin.png';

class FryingPanItem extends React. Component {
  constructor(){
    super();
    this.state = {
      touch: 0
    };
    this.onPress = this.onPress.bind(this);
  }

  onPress(){
    if(this.state.touch === 0){
      this.setState({ touch: 1});
    } else if(this.state.touch === 1) {
      this.setState({ touch: 2});
    }

  }

  render(){
    if(this.state.touch === 0){
      return (
        <TouchableOpacity style={styles.itemCard} onPress={this.onPress}>
          <Image source={binocularsWhite} style={styles.icon} />
        </TouchableOpacity>
      );
    } else if (this.state.touch === 1) {
      return (
        <TouchableOpacity style={styles.itemCardCost} onPress={this.onPress}>
          <View style={styles.outerCost}>
            <Text style={styles.itemCost}>450</Text>
            <Image source={goldCoin} style={styles.coin} />
          </View>
        </TouchableOpacity>
      );
    }
    else {
      return (
        <TouchableOpacity style={styles.itemCardBought} onPress={this.onPress}>
          <Image source={binocularsWhite} style={styles.icon} />
        </TouchableOpacity>
      );
    }
  }
}

const styles = {
  itemCard: {
    width: 50,
    height: 36,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: 'silver',
  },
  itemCardCost: {
    width: 50,
    height: 36,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 5,
    backgroundColor: 'black',
  },
  itemCardBought: {
    width: 50,
    height: 36,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 5,
    backgroundColor: 'blue',
  },
  outerCost: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 3,
    // alignItems: 'center'
  },
  itemCost: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  },
  coin: {
    height: 14,
    width: 14,
    marginTop: 4,
    marginLeft: 2
  },
  icon: {
    marginTop: 5,
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'cover'
  }
};

export default connect(null, null)(FryingPanItem);
