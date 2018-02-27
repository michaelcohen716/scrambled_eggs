import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import InfoBar from './InfoBar';
import WordHolder from './WordHolder';
import EmptyHolder from './EmptyHolder';

class JumbleGame extends React.Component {
  constructor(){
    super();
  }

  render(){
    const empties = this.props.answers.map((scramble, idx) => {
      return (
        <EmptyHolder letters={this.props.activeLetters} answerIndex={idx} key={idx}/>
      );
    });

    return (
      <View>
        <InfoBar />
        <WordHolder />

        <View style={styles.messageContainer}>
          <Text style={styles.message}>{this.props.message}</Text>
        </View>

        <View style={styles.container}>
          {empties}
        </View>
      </View>
    );
  }

}

const styles = {
  container: {
    marginTop: 30
  },
  message: {
    fontSize: 22,
    marginTop: 7
  },
  messageContainer: {
    minHeight: 32,
    maxHeight: 32,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
  }
};

const mapStateToProps = state => {
  return {
    activeLetters: state.jumble.activeLetters,
    message: state.jumble.message,
    answers: state.jumble.answers
  };
};

export default connect(mapStateToProps, null)(JumbleGame);
