import {
  START_NEW_SCRAMBLE, TAP_SCRAMBLE_LETTER,
  VERIFY_SCRAMBLE
} from './types';

export const startNewScramble = ({ firstAnswer, roundTime, steps }) => {
  return {
    type: START_NEW_SCRAMBLE,
    firstAnswer,
    roundTime,
    steps
  };
};

export const tapScrambleLetter = (letter, letterIndex) => {
  return {
    type: TAP_SCRAMBLE_LETTER,
    letter,
    letterIndex
  }
}

export const verifyScramble = (letter, letterIndex) => {
  return {
    type: VERIFY_SCRAMBLE,
    letter,
    letterIndex
  }
}
