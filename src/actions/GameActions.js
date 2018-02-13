// import firebase from 'firebase';
// import { Actions } from 'react-native-router-flux';
import { TAP_LETTER } from './types';

export const tapLetter = (letter) => {
  return {
    type: TAP_LETTER,
    letter
  };
};
