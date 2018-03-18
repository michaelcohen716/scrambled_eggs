import React from 'react';
import { View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';

class LadderIntro extends React.Component {
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

    };

    return (
      <Modal animationType="slide" transparent={true} visible={this.state.introVisible}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flex: 4}} />
          
        </View>
      </Modal>
    );
  }

  render(){
    return (
      <View>
      </View>
    );
  }
}

export default LadderIntro;
