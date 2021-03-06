import {
  START_NEW_LADDER, TAP_LADDER_LETTER,
  VERIFY_LADDER_WORD
} from './types';

export const startNewLadder = ({ answers, numWords, roundTime, activeLetters }) => {
  return {
    type: START_NEW_LADDER,
    answers,
    numWords,
    roundTime,
    activeLetters
  };
};

export const tapLadderLetter = (letter, letterIndex) => {
  return {
    type: TAP_LADDER_LETTER,
    letter,
    letterIndex
  };
};

export const verifyLadderWord = (letter, letterIndex) => {
  return {
    type: VERIFY_LADDER_WORD,
    letter,
    letterIndex
  }
}
