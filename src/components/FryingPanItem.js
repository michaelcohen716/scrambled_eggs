import React from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import { connect } from 'react-redux';

import goldCoin from '../assets/goldCoin.png';
import { makePurchase, shakeItUp,
  showItemDescription, seeALetter,
  unlockAWord
} from '../actions';

class FryingPanItem extends React. Component {
  constructor(props){
    super(props);
    this.state = {
      touch: 0
    };
    this.onPress = this.onPress.bind(this);
    this.makePurchase = this.makePurchase.bind(this);
    this.unmarkOtherItems = this.unmarkOtherItems.bind(this);
    this.showDescription = this.showDescription.bind(this);
    this.useItem = this.useItem.bind(this);

    this.item = this.props.info.item;
    this.cost = this.props.info.cost;
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.itemsToggle !== this.props.itemsToggle){
      if(nextProps.itemsToggle[this.item] === true){
        this.setState({ touch: 2});
      }
    }

    if(this.props.marked !== nextProps.marked && nextProps.marked !== this.props.idx){
      if(this.state.touch === 1){
        this.setState({ touch: 0});
      }
    }
  }

  componentDidMount(){
    if(this.props.itemsToggle[this.item] === true){
      this.setState({ touch: 2});
    }
  }

  unmarkOtherItems(){
    this.props.unmarkOtherItems(this.props.idx);
  }

  onPress(){
    if(this.state.touch === 0 && !this.props.inGame){
      this.setState({ touch: 1});
      this.unmarkOtherItems();
      this.showDescription();


    } else if(this.state.touch === 1) {
      this.makePurchase();
      // this.setState({ touch: 2});

    } else { //touch == 2
      this.setState({ touch: 0}, () => {
        const itemObject = {
          itemsToggle: this.props.itemsToggle,
          levelType: this.props.levelType,
          item: this.item
        };

        this.useItem(itemObject);
      });
    }
  }

  useItem(itemObject){
    //score powerup controlled in scorekeeper component (or score reducer)
    switch(this.item){
      case "shakeItUp":
        this.props.shakeItUp(itemObject);
        return;
      case "seeALetter":
        this.props.seeALetter(itemObject);
        return;
      case "unlockAWord":
        this.props.unlockAWord(itemObject);
        return;
    }
  }

  showDescription(){
    this.props.showItemDescription(this.props.info.description);
    this.unmarkOtherItems();
  }

  makePurchase(){
    if(this.props.eggcoin > this.cost){
      const object = {
        item: this.item,
        cost: this.cost,
        itemsToggle: this.props.itemsToggle,
        eggcoin: this.props.eggcoin
      };

      this.props.makePurchase(object);
      this.setState({ touch: 2});

    } else {
      this.setState({ touch: 0});
      this.props.showItemDescription("Buy Some Eggcoin");
    }
  }

  render(){
    const { item, firstImage, secondImage, cost } = this.props.info;

    let firstStyle = styles.icon;
    if(item === "unlockAWord" || item === "addTime"){
      firstStyle = styles.giftIcon;
    } else if(item === "shakeItUp"){
      firstStyle = styles.blenderIcon;
    }

    let secondStyle = styles.icon;
    if(item === "shakeItUp" || item === "addTime"){
      secondStyle = styles.secondBlendIcon;
    } else if(item === "unlockAWord"){
      secondStyle = styles.secondGiftIcon;
    }

    if(this.state.touch === 2 && !this.props.inGame){ //level page bought
      return (
        <TouchableOpacity style={styles.itemCardBought} onPress={this.showDescription}>
          <Image source={secondImage} style={secondStyle} />
        </TouchableOpacity>
      );
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
    height: 46,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: 'silver',
    marginRight: 7
  },
  itemCardExpand: {
    width: 50,
    height: 46,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: 'silver',
    marginRight: 7
  },
  itemCardCost: {
    width: 50,
    height: 46,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 5,
    backgroundColor: 'black',
    marginRight: 7
  },
  itemCardBought: {
    width: 50,
    height: 46,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 5,
    backgroundColor: 'blue',
    marginRight: 7
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
    fontWeight: 'bold',
    marginTop: 5
  },
  coin: {
    height: 14,
    width: 14,
    marginTop: 9,
    marginLeft: 2
  },
  icon: {
    marginTop: 7,
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'cover'
  },
  giftIcon: {
    // marginTop: 2,
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'contain',
  },
  secondGiftIcon: {
    marginTop: 2,
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'contain'
  },
  blenderIcon: {
    marginTop: 2.5,
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'contain'
  },
  secondBlendIcon: {
    marginTop: 1,
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'contain'
  }
};

const mapStateToProps = state => {
  return {
    itemsToggle: state.items.itemsToggle,
    levelType: state.levels.levelType,
    eggcoin: state.score.userEggcoin
  };
};

export default connect(mapStateToProps, {
  makePurchase, shakeItUp, showItemDescription,
  seeALetter, unlockAWord
})(FryingPanItem);
