// import firebase from 'firebase';
// import { Actions } from 'react-native-router-flux';
import {
  START_NEW_SCRAMBLE, TAP_SCRAMBLE_LETTER
} from './types';

export const startNewScramble = ({ firstAnswer, roundTime, steps }) => {
  return {
    type: START_NEW_SCRAMBLE,
    firstAnswer,
    roundTime,
    steps
  };
};

export const tapScrambleLetter = () => {
  return {
    type: TAP_SCRAMBLE_LETTER
  }
}
