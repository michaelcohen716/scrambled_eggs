import merge from 'lodash/merge';
import { AWARD_WORD_COMPLETION } from '../actions/types';

const INITIAL_STATE = {
  roundScore: 0
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case AWARD_WORD_COMPLETION:
      const newState = merge({}, state);
      newState.roundScore += 1;
      return newState;
    default:
      return state;
  }
};
