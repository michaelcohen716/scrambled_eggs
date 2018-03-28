import merge from 'lodash/merge';
import firebase from 'firebase';
import {
  AWARD_WORD_COMPLETION, END_ROUND,
  REDUCE_SCORE_MULTIPLIER,
  LOGIN_USER_SUCCESS,
  START_NEW_WORD, RECORD_SCORE,
  START_NEW_SCRAMBLE, SPEND_EGGCOIN,
  MAKE_PURCHASE, FIRE_UP,
  PAUSE_TIMER, UNPAUSE_TIMER,
  PURCHASE_EGGCOIN
} from '../actions/types';

const INITIAL_STATE = {
  userEggcoin: 1000,
  roundScore: 0,
  eggcoinCost: 0,
  scoreMultiplier: 100,
  activeLevelAttempted: false,
  unattemptedBaseScore: 4, //actions/reducers don't change these
  attemptedBaseScore: 1, //actions/reducers don't change these
  fireUpToggle: false,
  timerActive: true
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case PURCHASE_EGGCOIN:
      const purchState = merge({}, state);
      purchState.userEggcoin += action.eggcoinPurchase;
      return purchState;
      
    case PAUSE_TIMER:
      const pauseState = merge({}, state);
      pauseState.timerActive = false;
      return pauseState;

    case UNPAUSE_TIMER:
      const unpauseState = merge({}, state);
      unpauseState.timerActive = true;
      return unpauseState;

    case FIRE_UP:
      const fireState = merge({}, state);
      fireState.fireUpToggle = true;
      return fireState;

    case AWARD_WORD_COMPLETION:
      const newState = merge({}, state);

      if(state.fireUpToggle){
        newState.roundScore += (2 * action.scoreIncrement);
      } else {
        newState.roundScore += action.scoreIncrement;
      }
      return newState;

    case START_NEW_WORD:
    case START_NEW_SCRAMBLE:
      const wordState = merge({}, state);
      wordState.roundScore = 0;
      wordState.scoreMultiplier = 100;
      return wordState;

    case END_ROUND:
      const updatedState = merge({}, state);
      if(action.roundCompleted){
        updatedState.activeLevelAttempted = false;
      } else {
        updatedState.activeLevelAttempted = true;
      }

      updatedState.fireUpToggle = false;
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

    case SPEND_EGGCOIN:
      const spendState = merge({}, state);
      spendState.eggcoinCost = action.cost;
      spendState.userEggcoin -= action.cost;
      return spendState;

    case MAKE_PURCHASE:
      const purchState = merge({}, state);
      purchState.userEggcoin -= action.cost;
      return purchState;

    default:
      return state;
  }
};
