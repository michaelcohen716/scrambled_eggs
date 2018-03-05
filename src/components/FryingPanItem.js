import React from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import { connect } from 'react-redux';

import goldCoin from '../assets/goldCoin.png';
import { makePurchase } from '../actions';

class FryingPanItem extends React. Component {
  constructor(props){
    super(props);
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
    const { name, firstImage, secondImage } = this.props.info;

    let firstStyle = styles.icon;
    if(name === "fireUp"){
      firstStyle = styles.fireUpIcon;
    } else if(name === "shakeItUp"){
      firstStyle = styles.blenderIcon;
    }

    let secondStyle = styles.icon;
    if(name === "shakeItUp"){
      secondStyle = styles.secondBlendIcon;
    }

    if(this.state.touch === 0){
      return (
        <TouchableOpacity style={styles.itemCard} onPress={this.onPress}>
          <Image source={firstImage} style={firstStyle} />
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
          <Image source={secondImage} style={secondStyle} />
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
    marginRight: 5
  },
  itemCardCost: {
    width: 50,
    height: 36,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 5,
    backgroundColor: 'black',
    marginRight: 5
  },
  itemCardBought: {
    width: 50,
    height: 36,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 5,
    backgroundColor: 'blue',
    marginRight: 5
  },
  outerCost: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 3,
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
    marginTop: 7,
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'cover'
  },
  fireUpIcon: {
    marginTop: 2.5,
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'cover'
  },
  blenderIcon: {
    marginTop: 2,
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'cover'
  },
  secondBlendIcon: {
    marginBottom: 2,
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'cover'
  }
};

export default connect(null, null)(FryingPanItem);
