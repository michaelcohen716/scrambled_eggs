import { TAP_LETTER, START_NEW_WORD } from '../actions/types';
import merge from 'lodash/merge';

const INITIAL_STATE = {
  activeLetters: [],
  scrambles: [[]],
  wordIndex: 0,
  usedLetters: []
  // ^ has letter been tapped for this scramble yet?
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case START_NEW_WORD:
      const newState = merge({}, state);

      const scramblesArray = new Array(action.numWords);
      for (var i = 0; i < scramblesArray.length; i++) {
         scramblesArray[i] = [];
      }
      newState.scrambles = scramblesArray;

      const usedLetters = new Array(action.activeLetters.length);
      for (var j = 0; j < usedLetters.length; j++) {
        usedLetters[j] = false;
      }
      newState.usedLetters = usedLetters;

      newState.activeLetters = action.activeLetters;
      return newState;

    case TAP_LETTER:
      const updatedState = merge({}, state);
      updatedState.scrambles[state.wordIndex].push(action.letter);
      updatedState.usedLetters[action.letterIndex] = true;
      return updatedState;

    default:
      return state;
  }
};
