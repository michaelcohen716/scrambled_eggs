import merge from 'lodash/merge';
import firebase from 'firebase';
import {
  AWARD_WORD_COMPLETION, END_ROUND,
  REDUCE_SCORE_MULTIPLIER,
  LOGIN_USER_SUCCESS,
  START_NEW_WORD, RECORD_SCORE
} from '../actions/types';

const INITIAL_STATE = {
  userEggcoin: 1000,
  roundScore: 0,
  scoreMultiplier: 100,
  activeLevelAttempted: false,
  unattemptedBaseScore: 5, //actions/reducers don't change these
  attemptedBaseScore: 1 //actions/reducers don't change these
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case AWARD_WORD_COMPLETION:
      const newState = merge({}, state);

      newState.roundScore += action.scoreIncrement;
      return newState;

    case START_NEW_WORD:
      const wordState = merge({}, state);
      wordState.scoreMultiplier = 100;
      return wordState;

    case END_ROUND:
      const updatedState = merge({}, state);
      updatedState.roundScore = 0;
      if(action.boolean){
        updatedState.activeLevelAttempted = false;
      } else {
        updatedState.activeLevelAttempted = true;
      }
      return updatedState;

    case REDUCE_SCORE_MULTIPLIER:
      const futureState = merge({}, state);
      futureState.scoreMultiplier -= action.decrement;
      return futureState;

    case RECORD_SCORE:
      const scoreState = merge({}, state);
      scoreState.userEggcoin = action.eggcoin;
      return scoreState;

    case LOGIN_USER_SUCCESS:
      const eggState = merge({}, state);
      eggState.userEggcoin = action.eggcoin;
      eggState.activeLevelAttempted = action.activeLevelAttempted;
      return eggState;

    default:
      return state;
  }
};
