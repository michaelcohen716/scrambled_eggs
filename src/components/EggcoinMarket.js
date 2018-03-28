import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity,
        Image, Modal, Dimensions, TouchableWithoutFeedback
} from 'react-native';
import goldCoin from '../assets/goldCoin.png';
import { purchaseEggcoin } from '../actions';
import { NativeModules } from 'react-native';
import CommaNumber from 'comma-number';
const { InAppUtils } = NativeModules;


class EggcoinMarket extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: this.props.visible
    };
    this.buyEggcoin = this.buyEggcoin.bind(this);
  }

  buyEggcoin(eggcoin, price){

    // var products = [
    //    'com.scrambledeggs.scrambledeggs.eggcoin',
    //    'com.scrambledeggs.scrambledeggs.eggcoin20000',
    //    'com.scrambledeggs.scrambledeggs.eggcoin30000',
    // ];
    // InAppUtils.loadProducts(products, (error, products) => {
    //
    //    //update store here.
    // });
    //
    // InAppUtils.canMakePayments((canMakePayments) => {
    //   if(!canMakePayments) {
    //     Alert.alert('Not Allowed', 'This device is not allowed to make purchases. Please check restrictions on device');
    //   }
    // });
    //
    // var productIdentifier = 'com.xyz.abc';
    //   InAppUtils.purchaseProduct(productIdentifier, (error, response) => {
    //     // NOTE for v3.0: User can cancel the payment which will be available as error object here.
    //   if(response && response.productIdentifier) {
    //     Alert.alert('Purchase Successful', 'Your Transaction ID is ' + response.transactionIdentifier);
    //   //unlock store here.
    //   }
    // });
    this.props.purchaseEggcoin(eggcoin, this.props.currentEggcoin);
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
