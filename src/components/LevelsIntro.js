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
    this.introModal2 = this.introModal2.bind(this);
  }

  advance(){
    this.setState({ introModal: this.state.introModal + 1 });
  }

  introModal2(){
    const styles = {
      topBarHolder: {
        flex: 3,
        borderColor: 'yellow',
        borderWidth: 3,
        backgroundColor: 'transparent'
      }
    };

    return (
      <Modal animationType="slide" transparent={true} visible={this.state.introVisible}>
        <View style={{flexDirection: 'column', flex: 1}}>
          <View style={{flex: 4}} />
          <View style={styles.topBarHolder} />
          <View style={{flex: 39}} />
        </View>
      </Modal>
    );
  }

  introModal1(){
    const styles = {
      messageHolder: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'black',
        opacity: 0.8
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
        width: 150,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: 'red',
        borderWidth: 2
      },
      tourText: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: 24,
        color: 'white'
      }
    };

    return (
      <Modal animationType="slide" transparent={true} visible={this.state.introVisible}>
        <View style={{flexDirection: 'column', flex: 1}}>
          <View style={{flex: 4}} />
            <View style={{flex: 4}}>
              <Logo style={{backgroundColor: 'black', opacity: 0.8}}/>
            </View>
            <View style={styles.messageHolder}>
              <TouchableOpacity style={styles.tourButton} onPress={this.advance}>
                <Text style={styles.tourText}>Take a tour</Text>
              </TouchableOpacity>
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
        {this.state.introModal === 2 ? this.introModal2() : null}
      </View>
    );
  }
}

export default LevelsIntro;
