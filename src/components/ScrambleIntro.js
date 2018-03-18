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
          flex: 13,
          flexDirection: 'column',
          backgroundColor: 'black',
          opacity: 0.3,
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
          fontSize: 16,
          fontFamily: 'RobotoCondensed-Regular',
          color: 'white'
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
              <View style={{marginRight: 8, marginBottom: 8}}>
                <Text style={styles.messageText}>
                  to define this word
                </Text>
              </View>
            </View>

          </View>
          <View style={{flex: 22, backgroundColor: 'black', opacity: 0.9}} />

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
