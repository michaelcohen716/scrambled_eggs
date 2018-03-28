import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity,
        Image, Modal, Dimensions, TouchableWithoutFeedback,
        Platform
} from 'react-native';
import * as RNIap from 'react-native-iap';
import goldCoin from '../assets/goldCoin.png';
import { purchaseEggcoin } from '../actions';
// import { NativeModules } from 'react-native';
import CommaNumber from 'comma-number';
// const { InAppUtils } = NativeModules;
const itemSkus = Platform.select({
  ios: [
    'com.scrambledeggs.scrambledeggs.eggcoin',
    'com.scrambledeggs.scrambledeggs.eggcoin20000',
    'com.scrambledeggs.scrambledeggs.eggcoin30000',
  ]
});

class EggcoinMarket extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: this.props.visible,
      productList: [],
      receipt: '',
      availableItemsMessage: ''
    };
    this.buyEggcoin = this.buyEggcoin.bind(this);
    this.buyItem = this.buyItem.bind(this);
  }

  async componentDidMount(){
    try {
      await RNIap.prepare();
      const products = await RNIap.getProducts(itemSkus);
      console.log('Products', products);
      this.setState({ productList: products });
    } catch (err) {
      console.warn(err.code, err.message);
    }
  }



  buyEggcoin(eggcoin, price){
    let eggcoinSKU;
    if(eggcoin === 10000){
      eggcoinSKU = 'com.scrambledeggs.scrambledeggs.eggcoin';
    } else if(eggcoin === 20000){
      eggcoinSKU = 'com.scrambledeggs.scrambledeggs.eggcoin20000';
    } else if(eggcoin === 30000){
      eggcoinSKU = 'com.scrambledeggs.scrambledeggs.eggcoin30000';
    }


    this.buyItem(eggcoinSKU);

    this.props.purchaseEggcoin(eggcoin, this.props.currentEggcoin);
  }

  async buyItem(sku){
    try {
      const purchase = await RNIap.buyProduct(sku);
    } catch(err) {
      console.log(err)
    }
  }

  async appStorePurchase(sku){
    RNIap.buyProduct(sku);
  }

  render(){
    const eggcoinBalance = CommaNumber(this.props.currentEggcoin);
    return (
      <Modal animationType="slide" transparent={true}
        visible={this.state.modalVisible}>
        <View style={styles.modalHolder}>
          <TouchableOpacity onPress={()=>this.setState({modalVisible:false})} style={{flex: 1}}>
            <View style={{opacity:0, flex:1 }}/>
          </TouchableOpacity>

          <View style={styles.contentHolder}>
            <View style={styles.eggcoinBar}>
              <Text style={styles.barText}>Eggcoin balance: {eggcoinBalance}</Text>
            </View>

            <View style={styles.dealHolder}>
              <View style={styles.eggcoinPrice}>
                <Text style={styles.eggcoinNumber}>10,000</Text>
                <Image source={goldCoin} style={styles.eggcoin} />
              </View>
              <View style={styles.dollarPrice}>
                <TouchableWithoutFeedback style={styles.buyButton} onPress={() => this.buyEggcoin(10000, 0.99)}>
                  <Text style={styles.dollarNumber}>$0.99</Text>
                </TouchableWithoutFeedback>
              </View>
            </View>

            <View style={styles.dealHolder}>
              <View style={styles.eggcoinPrice}>
                <Text style={styles.eggcoinNumber}>20,000</Text>
                <Image source={goldCoin} style={styles.eggcoin} />
              </View>
              <View style={styles.dollarPrice}>
                <TouchableWithoutFeedback style={styles.buyButton} onPress={() => this.buyEggcoin(20000, 1.99)}>
                  <Text style={styles.dollarNumber}>$1.99</Text>
                </TouchableWithoutFeedback>
              </View>
            </View>

            <View style={styles.dealHolder}>
              <View style={styles.eggcoinPrice}>
                <Text style={styles.eggcoinNumber}>30,000</Text>
                <Image source={goldCoin} style={styles.eggcoin} />
              </View>
              <View style={styles.dollarPrice}>
                <TouchableWithoutFeedback style={styles.buyButton} onPress={() => this.buyEggcoin(30000, 2.99)}>
                  <Text style={styles.dollarNumber}>$2.99</Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>

          <TouchableOpacity onPress={()=>this.setState({modalVisible:false})} style={{flex: 1}}>
            <View style={{opacity:0, flex:1 }}/>
          </TouchableOpacity>


        </View>
      </Modal>
    );
  }

}

var { width } = Dimensions;

const styles = {
  eggcoinBar: {
    flex: 1,
    justifyContent: 'center'
  },
  barText: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 20,
    color: 'white'
  },
  eggcoinNumber: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white'
  },
  dollarNumber: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white'
  },
  eggcoin: {
    height: 28,
    width: 28,
    marginTop: 4,
    marginLeft: 3
  },
  eggcoinPrice: {
    flexDirection: 'row',
    // borderColor: 'white',
    // borderWidth: 2,
    flex: 1,
    margin: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dollarPrice: {
    flex: 1,
    margin: 25,
    borderColor: 'white',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    elevation: 2,
    borderRadius: 4
  },
  dealHolder: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'white',
    borderWidth: 2
  },
  modalHolder: {
    flex: 1,
    width: width/2,
    flexDirection: 'column'
  },
  contentHolder: {
    backgroundColor: 'blue',
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 5
  }
};

const mapStateToProps = state => {
  return {
    currentEggcoin: state.score.userEggcoin
  };
};

export default connect(mapStateToProps, { purchaseEggcoin })(EggcoinMarket);
