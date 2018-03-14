import React from 'react';
import { View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import InfoBar from './InfoBar';
import WordHolder from './WordHolder';
import EmptyHolder from './EmptyHolder';
import FryingPan from './FryingPan';

class JumbleGame extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      introVisible: true,
      introModal: 1
    };
    this.introModal1 = this.introModal1.bind(this);
    this.introModal2 = this.introModal2.bind(this);
    this.introModal3 = this.introModal3.bind(this);
    this.advance = this.advance.bind(this);
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
              But you only keep the eggcoin if you finish the puzzle.
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

  advance(){
    if(this.state === 3){
      this.setState({ modalVisible: false});
    }
    this.setState({ introModal: this.state.introModal + 1});
  }

  render(){
    const empties = this.props.answers.map((scramble, idx) => {
      const numAnswers = this.props.answers.length;
      return (
        <EmptyHolder letters={this.props.activeLetters} answerIndex={idx}
                     numAnswers={numAnswers} key={idx}/>
      );
    });

    return (
      <View style={styles.parent}>

        <InfoBar />

        {this.state.introVisible && this.state.introModal === 1 ? this.introModal1() : null}
        {this.state.introVisible && this.state.introModal === 2 ? this.introModal2() : null}
        {this.state.introVisible && this.state.introModal === 3 ? this.introModal3() : null}

        <WordHolder />

        <View style={styles.messageContainer}>
          <Text style={styles.message}>{this.props.message}</Text>
        </View>

        <View style={styles.container}>
          {empties}
        </View>

        <FryingPan inGame={true} />

      </View>
    );
  }

}

const styles = {
  container: {
    paddingTop: 12,
    flex: 6
  },
  introOneAnchor: {
    position: 'absolute',
    top: 0,
    zIndex: 3,
    borderColor: 'black',
    borderWidth: 3,
    backgroundColor: 'black',
    // flex: 10,
    alignSelf: 'stretch'
  },
  message: {
    fontSize: 22,
    marginTop: 7
  },
  parent: {
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
    zIndex: 1
  },
  messageContainer: {
    minHeight: 32,
    maxHeight: 32,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1
  },

};

const mapStateToProps = state => {
  return {
    activeLetters: state.jumble.activeLetters,
    message: state.jumble.message,
    answers: state.jumble.answers
  };
};

export default connect(mapStateToProps, null)(JumbleGame);
