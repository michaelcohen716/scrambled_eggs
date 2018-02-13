// import firebase from 'firebase';
// import { Actions } from 'react-native-router-flux';
import { TAP_LETTER, START_NEW_WORD } from './types';

export const startNewWord = (numWords, activeIndex) => {
  return {
    type: START_NEW_WORD,
    numWords,
    activeIndex
  };
};

export const tapLetter = (letter) => {
  return {
    type: TAP_LETTER,
    letter
  };
};
