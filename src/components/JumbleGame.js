import React from 'react';
import { View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { pauseTimer, unpauseTimer } from '../actions';
import InfoBar from './InfoBar';
import WordHolder from './WordHolder';
import EmptyHolder from './EmptyHolder';
import FryingPan from './FryingPan';
import JumbleIntro from './JumbleIntro';

class JumbleGame extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      introVisible: false,
    };

  }

  componentDidMount(){
    if(this.props.activeLevel === 1 && !this.props.activeLevelAttempted){
      this.props.pauseTimer();
      this.setState({ introVisible: true});
    }
    // else {
    //   this.setState({ introVisible: false});
    // }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.activeLevel === 1 && !nextProps.activeLevelAttempted){
      this.setState({ introVisible: true});
    }
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

        {this.state.introVisible ? <JumbleIntro /> : null}
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
    answers: state.jumble.answers,
    activeLevel: state.levels.activeLevel,
    activeLevelAttempted: state.score.activeLevelAttempted
  };
};

export default connect(mapStateToProps, { pauseTimer, unpauseTimer })(JumbleGame);
