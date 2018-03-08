import {
  START_NEW_LADDER
} from './types';

export const startNewLadder = ({ answers, subtractions, numWords, firstAnswer, roundTime }) => {

  return {
    type: START_NEW_LADDER,
    answers,
    subtractions,
    numWords,
    firstAnswer,
    roundTime
  };
};
