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
    this.introModal2 = this.introModal2.bind(this);
    this.introModal3 = this.introModal3.bind(this);
    this.advance = this.advance.bind(this);

  }

  advance(){
    if(this.state === 3){
      this.setState({ modalVisible: false});
      // this.props.unpauseTimer();
    }
    this.setState({ introModal: this.state.introModal + 1});
  }

  introModal3(){
    const styles = {
      topFiller: {
        flex: 15,
        backgroundColor: 'black',
        opacity: 0.9
      },
      messageHolder: {
        flex: 4,
        flexDirection: 'column',
        backgroundColor: 'black',
        opacity: 0.9,
        alignItems: 'center',
        justifyContent: 'center'
      },
      barHolder: {
        flex: 10,
        borderColor: 'yellow',
        borderWidth: 3,
        backgroundColor: 'transparent'
      },
      smallText: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
      },
      advanceHolder: {
        flex: 4,
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
          <View style={{flex: 4 }} />
          <View style={styles.topFiller} />
          
          <View style={styles.messageHolder}>
            <Text style={styles.smallText}>
              And then find a word one letter shorter
              <Text style={{fontStyle: 'italic'}}> again </Text>
            </Text>
          </View>

          <View style={styles.barHolder} />

          <View style={styles.advanceHolder}>
            <TouchableOpacity style={styles.advance} onPress={this.advance}>
              <Text style={styles.advanceText}>Got it</Text>
            </TouchableOpacity>
          </View>

          <View style={{flex: 10, backgroundColor: 'black', opacity: 0.9}} />

        </View>
      </Modal>
    );
  }

  introModal2(){
    const styles = {
      topFiller: {
        flex: 8,
        backgroundColor: 'black',
        opacity: 0.9
      },
      messageHolder: {
        flex: 4,
        flexDirection: 'column',
        backgroundColor: 'black',
        opacity: 0.9,
        alignItems: 'center',
        justifyContent: 'center'
      },
      barHolder: {
        flex: 10,
        borderColor: 'yellow',
        borderWidth: 3,
        backgroundColor: 'transparent'
      },
      advanceHolder: {
        flex: 3,
        backgroundColor: 'black',
        opacity: 0.9,
        justifyContent: 'center',
        alignItems: 'flex-end'
      },
      smallText: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
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
          <View style={{flex: 4 }} />
          <View style={styles.topFiller} />
          <View style={styles.messageHolder}>
            <Text style={styles.smallText}>
              Use
              <Text style={{fontStyle: 'italic'}}> those </Text>
              letters to find a word one letter shorter
            </Text>
          </View>
          <View style={styles.barHolder} />

          <View style={styles.advanceHolder}>
            <TouchableOpacity style={styles.advance} onPress={this.advance}>
              <Text style={styles.advanceText}>Got it</Text>
            </TouchableOpacity>
          </View>

          <View style={{flex: 15, backgroundColor: 'black', opacity: 0.9}} />
        </View>
      </Modal>
    );
  }

  introModal1(){
    // 4, 3, 4, 4, 4, 23 = 42
    const styles = {
      topBarHolder: {
        flex: 4,
        borderColor: 'yellow',
        borderWidth: 3,
        backgroundColor: 'transparent'
      },
      topFiller: {
        flex: 3,
        backgroundColor: 'black',
        opacity: 0.9
      },
      messageHolder: {
        flex: 4,
        flexDirection: 'column',
        backgroundColor: 'black',
        opacity: 0.9,
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      advanceHolder: {
        flex: 4,
        backgroundColor: 'black',
        opacity: 0.9,
        justifyContent: 'center',
        alignItems: 'flex-end'
      },
      bottomFiller: {
        flex: 23,
        backgroundColor: 'black',
        opacity: 0.9
      },
      ladderText: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold'
      },
      smallText: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
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
          <View style={{flex: 4}} />
          <View style={styles.topFiller} />
          <View style={styles.topBarHolder} />

          <View style={styles.messageHolder}>
            <Text style={styles.ladderText}>Finally, try a 'Ladder' puzzle</Text>

            <Text style={styles.smallText}>First, find a word using all letters</Text>
          </View>

          <View style={styles.advanceHolder}>
            <TouchableOpacity style={styles.advance} onPress={this.advance}>
              <Text style={styles.advanceText}>Got it</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomFiller} />
        </View>
      </Modal>
    );
  }

  render(){
    return (
      <View>
        {this.state.introModal === 1 ? this.introModal1() : null}
        {this.state.introModal === 2 ? this.introModal2() : null}
        {this.state.introModal === 3 ? this.introModal3() : null}
      </View>
    );
  }
}

export default LadderIntro;
