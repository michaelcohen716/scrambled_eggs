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
        <ScrambleTile letter={letter} letterIndex={idx} key={idx}
                      lettersHolder={true}  />
      );
    });

    return (
        <View style={styles.container}>
          {tiles}
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
   flexDirection: 'column',
   flexWrap: 'wrap',
   borderColor: '#ddd',
   position: 'relative',
   maxHeight: 80
  }
};

// const styles = {
//   container: {
//    borderBottomWidth: 1,
//    padding: 5,
//    backgroundColor: 'blue',
//    justifyContent: 'center',
//    flexDirection: 'row',
//    borderColor: '#ddd',
//    position: 'relative'
//   }
// };

export default connect(null, null)(ScrambleWordHolder);
