import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { logout, showGeneralInfo } from '../actions';
import { Actions } from 'react-native-router-flux';
import EggcoinMarket from './EggcoinMarket';

class MenuPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      eggcoinMarket: false
    };
    this.renderMarket = this.renderMarket.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout(){
    this.props.logout();
    Actions.login();
  }

  renderMarket(){
    this.setState({ eggcoinMarket: true });
  }

  render(){
    return (
      <View style={styles.parent}>

        {this.state.eggcoinMarket ? <EggcoinMarket /> : null}

        <View style={styles.item}>
          <TouchableOpacity style={styles.optionButton} onPress={() => Actions.instructions()}>
            <Text style={styles.buttonText}>Instructions</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.item}>
          <TouchableOpacity style={styles.optionButton} onPress={() => Actions.aboutMe()}>
            <Text style={styles.buttonText}>About the Developer</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.item}>
          <TouchableOpacity style={styles.optionButton} onPress={this.renderMarket}>
            <Text style={styles.buttonText}>Eggcoin Market</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.item}>
          <TouchableOpacity style={styles.optionButton} onPress={() => Actions.credits()}>
            <Text style={styles.buttonText}>Credits</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.item}>
          <TouchableOpacity style={styles.optionButton} onPress={this.logout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.item}></View>
        <View style={styles.item}></View>
      </View>
    );
  }
}

const styles = {
  parent: {
    flex: 1
  },
  optionButton: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 2,
    backgroundColor: 'black'
  },
  buttonText: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 20
  },
  item: {
    flex: 1,
    margin: 15,
    borderColor: 'white',
    borderWidth: 2
  }
};

export default connect(null, { logout, showGeneralInfo })(MenuPage);
