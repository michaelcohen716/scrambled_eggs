import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class MenuPage extends React.Component {
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
        <View style={styles.item}></View>
        <View style={styles.item}>
          <TouchableOpacity style={styles.optionButton}>
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

export default connect(null, null)(MenuPage);
