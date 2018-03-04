import React from 'react';
import { View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import InfoBar from './InfoBar';
import WordHolder from './WordHolder';
import EmptyHolder from './EmptyHolder';
// import IntroOverlay from './IntroOverlay';
import ModalWrapper from 'react-native-modal-wrapper';

class JumbleGame extends React.Component {
  constructor(){
    super();
    this.state = {
      introOneVisible: false
    };
    this.advance = this.advance.bind(this);
    this.introOne = this.introOne.bind(this);
  }

  advance(){
    this.setState({ introOneVisible: false});
  }

  introOne(){

    const styles = {
      modalStyle: {
        backgroundColor: 'transparent'
      },
      container: {
        // backgroundColor: 'grey',
        opacity: 0.1,
        // flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
        // width: 100,
        // height: 100
      },
      topBar: {
        height: 45,
        backgroundColor: 'transparent',
        alignSelf: 'stretch',
        // position: 'absolute',
        // top: 0
      },
      notTopBar: {
        height: 100,
        alignSelf: 'stretch',
        opacity: 0.5
      },
      below: {
        height: 300,
        alignSelf: 'stretch',
        opacity: 0.5

      }
    };

    return (
        <ModalWrapper
          isNative={false}
          onRequestClose={this.onRequestClose}
          position='left'
          shouldAnimateOnRequestClose={true}
          showOverlay={true}
          transparent={true}
          style={[styles.modalStyle, (() => {
            const { height, width } = Dimensions.get('window');
            const modalHeight = 100;
            const modalWidth = 280;
            return {
              alignSelf: 'stretch',
              top: 0,
              left: 0,
              height,
            };
          })()]}
          visible={this.state.introOneVisible}>
          <View style={styles.container}>
            <View style={styles.topBar}>
              <Text style={styles.modalText}>Modal without overlay</Text>
            </View>
            <View style={styles.notTopBar}>
              <Text>Not topbar</Text>
            </View>
            <View style={styles.below}>
              <Text>Below</Text>
            </View>
          </View>
        </ModalWrapper>

    );
  }

  render(){
    const empties = this.props.answers.map((scramble, idx) => {
      return (
        <EmptyHolder letters={this.props.activeLetters} answerIndex={idx} key={idx}/>
      );
    });

    return (
      <View style={styles.parent}>

        <InfoBar />


        <WordHolder />

        <View style={styles.messageContainer}>
          <Text style={styles.message}>{this.props.message}</Text>
        </View>

        <View style={styles.container}>
          {empties}
        </View>
        {this.state.introOneVisible ? this.introOne() : null}


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
