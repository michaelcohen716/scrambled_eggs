import React from 'react';
import Words from '../games/scrambled.json';
import { View } from 'react-native';
import WordHolder from './WordHolder';
import { connect } from 'react-redux';
// import { importNewWord } from '../actions';
// var startPuzzle = "1";

class Game extends React.Component {
  constructor(props){
    super(props);
    this.queue = Object.keys(Words);
    this.breakDown();
  }

  breakDown(){
    this.activeWord = this.queue[0];
    this.letters = this.activeWord.split("");
    this.scrambles = Words[this.activeWord];
  }

  // componentDidMount(){
  //   let activeWord = this.queue[0];
  //   // console.log(this.props.activeWord);
  //   // this.props.importNewWord(activeWord);
  //   console.log(this.props.activeWord);
  // }

  render(){
    const currentWord = {
      word: this.activeWord,
      letters: this.letters,
      scrambles: this.scrambles
    };

    return (
      <View>
        <WordHolder active={currentWord}/>
      </View>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     activeWord: state.game.activeWord
//   };
// };

// export default Game;
export default connect(null, null)(Game);
