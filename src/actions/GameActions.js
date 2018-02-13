// import firebase from 'firebase';
// import { Actions } from 'react-native-router-flux';
import { TAP_LETTER, START_NEW_WORD } from './types';

export const startNewWord = ({ numWords, activeLetters }) => {
  return {
    type: START_NEW_WORD,
    numWords,
    activeLetters
  };
};

export const tapLetter = (letter, letterIndex) => {
  return {
    type: TAP_LETTER,
    letter,
    letterIndex
  };
};
