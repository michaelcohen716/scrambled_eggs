import React from 'react';
import { View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';


class ScrambleIntro extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      introModal: 1,
      introVisible: true
    };
    this.introModal1 = this.introModal1.bind(this);
  }

  introModal1(){
    const styles = {
        topBarHolder: {
          flex: 16,
          flexDirection: 'column',
          backgroundColor: 'black',
          opacity: 0.5,
          alignItems: 'center',
          justifyContent: 'center'
        }
    };

    return (
      <Modal animationType="slide" transparent={true} visible={this.state.introVisible}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flex: 4}}/>
          <View style={{flex: 4, backgroundColor: 'black', opacity: 0.9}}/>
          <View style={styles.topBarHolder}>

          </View>
          <View style={{flex: 18, backgroundColor: 'black', opacity: 0.9}} />

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

export default ScrambleIntro;
