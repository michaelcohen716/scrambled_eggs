import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity,
        Image, Modal, Dimensions
} from 'react-native';
import goldCoin from '../assets/goldCoin.png';

class EggcoinMarket extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: this.props.visible
    };
    this.buyEggcoin = this.buyEggcoin.bind(this);
  }

  buyEggcoin(eggcoin, price){

  }

  render(){

    return (
      <Modal animationType="slide" transparent={true}
        visible={this.state.modalVisible}>
        <View style={styles.modalHolder}>
          <View style={{flex: 1}}/>

          <View style={styles.contentHolder}>

            <View style={styles.dealHolder}>
              <View style={styles.eggcoinPrice}>
                <Text style={styles.eggcoinNumber}>10,000</Text>
                <Image source={goldCoin} style={styles.eggcoin} />
              </View>
              <View style={styles.dollarPrice}>
                <TouchableOpacity style={styles.buyButton} onPress={() => this.buyEggcoin(10000, 1.99)}>
                  <Text style={styles.dollarNumber}>$1.99</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.dealHolder}>
              <View style={styles.eggcoinPrice}>
                <Text style={styles.eggcoinNumber}>10,000</Text>
                <Image source={goldCoin} style={styles.eggcoin} />
              </View>
              <View style={styles.dollarPrice}>
                <TouchableOpacity style={styles.buyButton} onPress={() => this.buyEggcoin(10000, 1.99)}>
                  <Text style={styles.dollarNumber}>$1.99</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.dealHolder}>
              <View style={styles.eggcoinPrice}>
                <Text style={styles.eggcoinNumber}>10,000</Text>
                <Image source={goldCoin} style={styles.eggcoin} />
              </View>
              <View style={styles.dollarPrice}>
                <TouchableOpacity style={styles.buyButton} onPress={() => this.buyEggcoin(10000, 1.99)}>
                  <Text style={styles.dollarNumber}>$1.99</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{flex: 1}}/>

        </View>
      </Modal>
    );
  }

}

var { width } = Dimensions;

const styles = {
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
    marginTop: 5,
    marginLeft: 3
  },
  eggcoinPrice: {
    flexDirection: 'row',
    borderColor: 'white',
    borderWidth: 2,
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
    alignItems: 'center'
  },
  dealHolder: {
    flex: 1,
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

export default connect(null, null)(EggcoinMarket);
