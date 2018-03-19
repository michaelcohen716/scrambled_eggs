import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { logout } from '../actions';
import { Actions } from 'react-native-router-flux';

class MenuPage extends React.Component {
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
  }
  
  logout(){
    this.props.logout();
    Actions.login();
  }

  render(){
    return (
      <View style={styles.parent}>

        <View style={styles.item}>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.buttonText}>Instructions</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.item}></View>
        <View style={styles.item}></View>
        <View style={styles.item}></View>
        <View style={styles.item}></View>

        <View style={styles.item}>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.buttonText}>Credits</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.item}>
          <TouchableOpacity style={styles.optionButton} onPress={this.logout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>

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

export default connect(null, { logout })(MenuPage);
