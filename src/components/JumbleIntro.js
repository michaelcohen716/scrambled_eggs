import React from 'react';
import { View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';



class JumbleIntro extends React.Component {
  constructor(props){
    super(props);
  }

  introModal3(){
    const styles = {
      topFiller: {
        flex: 11,
        backgroundColor: 'black',
        opacity: 0.9
      },
      topBar: {
        flex: 21,
        borderColor: 'yellow',
        borderWidth: 3,
        backgroundColor: 'transparent'
      },
      messageHolder: {
        flex: 4,
        flexDirection: 'column',
        backgroundColor: 'black',
        alignItems: 'center'
      },
      advanceHolder: {
        flex: 3,
        backgroundColor: 'black',
        opacity: 0.9,
        justifyContent: 'center',
        alignItems: 'flex-end'
      },
      bottomFiller: {
        flex: 4,
        backgroundColor: 'black',
        opacity: 0.9
      },
      messageText: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: 16,
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
          <View style={styles.topBar} />

          <View style={styles.messageHolder}>
            <Text style={styles.messageText}>
              The faster you find the words, the more eggcoin you earn.
            </Text>
            <Text style={styles.messageText}>
              But you only keep your winnings if you finish the puzzle.
            </Text>
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

  introModal2(){
    const styles = {
      topFiller: {
        flex: 3,
        backgroundColor: 'black',
        opacity: 0.9
      },
      topBar: {
        flex: 5,
        borderColor: 'yellow',
        borderWidth: 3,
        backgroundColor: 'transparent'
      },
      messageHolder: {
        flex: 5,
        flexDirection: 'column',
        backgroundColor: 'black',
        alignItems: 'center'
      },
      bottomFiller: {
        flex: 24,
        backgroundColor: 'black',
        opacity: 0.9
      },
      advanceHolder: {
        flex: 3,
        backgroundColor: 'black',
        opacity: 0.9,
        justifyContent: 'center',
        alignItems: 'flex-end'
      },
      messageText: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold'
      },
      smallMessage: {
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

          <View style={styles.topBar} />

          <View style={styles.messageHolder}>
            <Text style={styles.messageText}>
              Your first puzzle is a 'Jumble'
            </Text>
            <Text style={styles.smallMessage}>
              Find <Text style={{fontFamily: 'RobotoCondensed-Italic'}}>
                      all
                   </Text> the words with<Text> </Text>
                   <Text style={{fontFamily: 'RobotoCondensed-Italic'}}>
                      all
                   </Text> the letters
            </Text>
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

  introModal1(){
    const styles = {
      topBarHolder: {
        flex: 3,
        borderColor: 'yellow',
        borderWidth: 3,
        backgroundColor: 'transparent'
      },
      messageHolder: {
        flex: 3,
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 3
      },
      advanceHolder: {
        flex: 3,
        backgroundColor: 'black',
        opacity: 0.9,
        justifyContent: 'center',
        alignItems: 'flex-end'
      },
      filler: {
        flex: 31,
        backgroundColor: 'black',
        opacity: 0.9
      },
      message: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
      },
      undo: {
        marginLeft: 9
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

    //1
    // 4
    // 3
    // 3
    // 3
    // 31

    return (
      <Modal animationType="slide" transparent={true} visible={this.state.introVisible}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flex: 4}} />
          <View style={styles.topBarHolder} />

          <View style={styles.messageHolder}>
            <Text style={styles.message}>
              Eggcoin
            </Text>
            <Text style={styles.message}>
              Undo button
            </Text>
            <Text style={styles.message}>
              Puzzle Clock
            </Text>
          </View>

          <View style={styles.advanceHolder}>
            <TouchableOpacity style={styles.advance} onPress={this.advance}>
              <Text style={styles.advanceText}>Got it</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.filler} />

        </View>
      </Modal>
    );
  }

}
