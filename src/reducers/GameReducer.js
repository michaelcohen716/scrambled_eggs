import { TAP_LETTER } from '../actions/types';
import merge from 'lodash/merge';
// const INITIAL_STATE = {
//   scramble: []
// };

export default (state = {scramble: []}, action) => {
  switch(action.type) {
    case TAP_LETTER:
      const newState = merge({}, state);
      newState.scramble.push(action.letter);
      return newState;
    default:
      return state;
  }
};
