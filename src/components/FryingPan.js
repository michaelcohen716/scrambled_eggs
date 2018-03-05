import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import goldCoin from '../assets/goldCoin.png';
import CommaNumber from 'comma-number';


class FryingPan extends React.Component {
  render(){

    const panItem = (
      <View style={styles.itemCard}>

      </View>
    );

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
            <Text>items</Text>
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
    backgroundColor: 'grey',
    flexDirection: 'row'
  },
  itemCard: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'black'
  },
  fryingItems: {
    flex: 1,
    backgroundColor: 'grey',
    flexDirection: 'row'
  },
  fryingGallery: {
    flex: 2,
    borderColor: 'yellow',
    borderWidth: 1,
    flexDirection: 'row'
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
