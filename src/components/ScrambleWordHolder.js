import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import ScrambleTile from './ScrambleTile';

class ScrambleWordHolder extends React.Component {
  constructor(){
    super();
    this.scrambleLetters = this.scrambleLetters.bind(this);
  }

  scrambleLetters(word){
    var shuffledWord = '';
    word = word.split('');
    while (word.length > 0) {
      shuffledWord +=  word.splice(word.length * Math.random() << 0, 1);
    }

    return shuffledWord.split("");
  }

  render(){
    const { activeLetters } = this.props;
    const letters = this.scrambleLetters(activeLetters);

    const tiles = letters.map((letter, idx) => {
      return (
        <ScrambleTile letter={letter} letterIndex={idx} key={idx} />
      );
    });

    return (
      <View>
        <View style={styles.container}>
          {tiles}
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
   borderBottomWidth: 1,
   padding: 5,
   backgroundColor: 'blue',
   justifyContent: 'center',
   flexDirection: 'row',
   borderColor: '#ddd',
   position: 'relative'
  }
};

// const mapStateToProps = state => {
//   return {
//     activeLetters: state.scramble.activeLetters
//   };
// };

export default connect(null, null)(ScrambleWordHolder);
