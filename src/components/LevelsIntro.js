import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Logo from './Logo';

class LevelsIntro extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      introModal: 1,
      introVisible: true
    };
    this.advance = this.advance.bind(this);
    this.introModal1 = this.introModal1.bind(this);
  }

  advance(){
    this.setState({ introModal: this.state.introModal + 1 });
  }

  introModal1(){
    const styles = {
      messageHolder: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      },
      message: {
        backgroundColor: 'blue',
        width: 300,
        height: 100,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center'
      },
      messageText: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: 25,
        color: 'white'
      },
      tourButton: {
        backgroundColor: 'blue',

      },
      tourText: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: 20,
        color: 'white'
      }
    };
    // <View style={styles.message}>
    //   <Text style={styles.messageText}>Welcome to Scrambled Eggs!</Text>
    // </View>
    // <TouchableOpacity style={styles.tourButton} onPress={this.advance}>
    //   <Text style={styles.tourText}>Take a tour</Text>
    // </TouchableOpacity>

    return (
      <Modal animationType="slide" transparent={true} visible={this.state.introVisible}>
        <View style={{flexDirection: 'column', flex: 1}}>
          <View style={{flex: 4}} />
            <View style={{flex: 4}}>
              <Logo />

            </View>
            <View style={styles.messageHolder}>
            </View>
          <View style={{flex: 6}} />
        </View>
      </Modal>

    );
  }

  render(){
    return (
      <View>
        {this.state.introModal === 1 ? this.introModal1() : null}
      </View>
    );
  }
}

export default LevelsIntro;
