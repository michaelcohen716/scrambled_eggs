import merge from 'lodash/merge';
import {
  AWARD_WORD_COMPLETION, END_ROUND,
  REDUCE_SCORE_MULTIPLIER
} from '../actions/types';

const INITIAL_STATE = {
  roundScore: 0,
  scoreMultiplier: 100
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case AWARD_WORD_COMPLETION:
      const newState = merge({}, state);
      newState.roundScore += action.scoreIncrement;
      return newState;

    case END_ROUND:
      const updatedState = merge({}, state);
      updatedState.roundScore = 0;
      return updatedState;

    case REDUCE_SCORE_MULTIPLIER:
      const futureState = merge({}, state);
      futureState.scoreMultiplier -= action.decrement;
      return futureState;
    default:
      return state;
  }
};
