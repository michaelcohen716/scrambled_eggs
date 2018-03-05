import React from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import { connect } from 'react-redux';

import goldCoin from '../assets/goldCoin.png';
import { makePurchase, shakeItUp } from '../actions';

class FryingPanItem extends React. Component {
  constructor(props){
    super(props);
    this.state = {
      touch: 0
    };
    this.onPress = this.onPress.bind(this);
    this.makePurchase = this.makePurchase.bind(this);
    this.item = this.props.info.item;
    this.cost = this.props.info.cost;
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.itemsToggle !== this.props.itemsToggle){
      if(nextProps.itemsToggle[this.item] === true){
        this.setState({ touch: 2});
      }
    }
  }

  componentDidMount(){
    if(this.props.itemsToggle[this.item] === true){
      this.setState({ touch: 2});
    }
  }

  onPress(){
    if(this.state.touch === 0){
      this.setState({ touch: 1});

    } else if(this.state.touch === 1) {
      this.makePurchase();
      this.setState({ touch: 2});

    } else { //touch == 2
      this.props.shakeItUp({
        itemsToggle: this.props.itemsToggle,
        levelType: this.props.levelType
      });
      
      this.setState({ touch: 0});
    }
  }

  makePurchase(){
    const object = {
      item: this.item,
      cost: this.cost,
      itemsToggle: this.props.itemsToggle
    };
    this.props.makePurchase(object);
  }

  render(){
    const { item, firstImage, secondImage, cost } = this.props.info;

    let firstStyle = styles.icon;
    if(item === "fireUp"){
      firstStyle = styles.fireUpIcon;
    } else if(item === "shakeItUp"){
      firstStyle = styles.blenderIcon;
    }

    let secondStyle = styles.icon;
    if(item === "shakeItUp"){
      secondStyle = styles.secondBlendIcon;
    }

    if(this.state.touch === 0 && this.props.inGame){ //inGame, unbought
      return (
        <TouchableOpacity style={styles.itemCard}>
          <Image source={firstImage} style={firstStyle} />
        </TouchableOpacity>
      );
    }

    if(this.state.touch === 0){ //levels page unbought
      return (
        <TouchableOpacity style={styles.itemCard} onPress={this.onPress}>
          <Image source={firstImage} style={firstStyle} />
        </TouchableOpacity>
      );
    }

    if (this.state.touch === 1) { //levels page about to buy
      return (
        <TouchableOpacity style={styles.itemCardCost} onPress={this.onPress}>
          <View style={styles.outerCost}>
            <Text style={styles.itemCost}>{cost}</Text>
            <Image source={goldCoin} style={styles.coin} />
          </View>
        </TouchableOpacity>
      );
    }

    return ( // game page bought, unspent
      <TouchableOpacity style={styles.itemCardBought} onPress={this.onPress}>
        <Image source={secondImage} style={secondStyle} />
      </TouchableOpacity>
    );
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
    marginBottom: 0.5,
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

const mapStateToProps = state => {
  return {
    itemsToggle: state.items.itemsToggle,
    levelType: state.levels.levelType
  };
};

export default connect(mapStateToProps, {
  makePurchase, shakeItUp
})(FryingPanItem);
