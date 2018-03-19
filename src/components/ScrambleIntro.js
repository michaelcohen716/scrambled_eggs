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
    this.introModal2 = this.introModal2.bind(this);
    this.advance = this.advance.bind(this);

  }

  advance(){
    if(this.state === 3){
      this.setState({ modalVisible: false});
      this.props.unpauseTimer();
    }
    this.setState({ introModal: this.state.introModal + 1});
  }

  introModal2(){

  }

  introModal1(){
    const styles = {
        topBarHolder: {
          flex: 14,
          flexDirection: 'column',
          backgroundColor: 'transparent',
          // opacity: 0.3,
          // alignItems: 'center',
          // justifyContent: 'center'
        },
        topHalf: {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end'
        },
        bottomHalf: {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-end'
        },
        messageText: {
          fontSize: 19,
          fontFamily: 'RobotoCondensed-Regular',
          color: 'white'
        },
        advanceHolder: {
          flex: 3,
          backgroundColor: 'black',
          opacity: 0.9,
          justifyContent: 'center',
          alignItems: 'flex-end'
        },
        advance: {
          width: 80,
          height: 35,
          borderColor: 'white',
          borderWidth: 2,
          borderRadius: 4,
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center'
        },
        advanceText: {
          color: 'white',
          fontFamily: 'RobotoCondensed-Regular',
          fontSize: 18,
        }
    };

    return (
      <Modal animationType="slide" transparent={true} visible={this.state.introVisible}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flex: 4}}/>
          <View style={{flex: 3, backgroundColor: 'black', opacity: 0.9}}/>

          <View style={styles.topBarHolder}>
            <View style={styles.topHalf}>
              <View style={{marginLeft: 8, marginBottom: 8}}>
                <Text style={styles.messageText}>
                  Use some of these letters
                </Text>
              </View>
            </View>

            <View style={styles.bottomHalf}>
              <View style={{marginRight: 8, marginBottom: 12, flexDirection: 'column'}}>
                <Text style={styles.messageText}>
                  to define a word
                </Text>
                <Text style={styles.messageText}>
                  with this meaning
                </Text>
              </View>
            </View>


          </View>
          <View style={styles.advanceHolder}>
            <TouchableOpacity style={styles.advance} onPress={this.advance}>
              <Text style={styles.advanceText}>Got it</Text>
            </TouchableOpacity>
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
        {this.state.introModal === 2 ? this.introModal2() : null}
      </View>
    );
  }

}

export default ScrambleIntro;
