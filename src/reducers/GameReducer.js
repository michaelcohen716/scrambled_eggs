import { TAP_LETTER, START_NEW_WORD } from '../actions/types';
import merge from 'lodash/merge';

const INITIAL_STATE = {
  scrambles: [[]],
  activeIndex: 0
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case START_NEW_WORD:
      const newState = merge({}, state);
      const scramblesArray = new Array(action.numWords);
      for (var i = 0; i < scramblesArray.length; i++) {
         scramblesArray[i]= [];
      }
      newState.scrambles = scramblesArray;
      return newState;
    case TAP_LETTER:
      const updatedState = merge({}, state);
      updatedState.scrambles[state.activeIndex].push(action.letter);
      return updatedState;
    default:
      return state;
  }
};
