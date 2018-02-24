import merge from 'lodash/merge';
import firebase from 'firebase';
import {
  AWARD_WORD_COMPLETION, END_ROUND,
  REDUCE_SCORE_MULTIPLIER,
  LOGIN_USER_SUCCESS, SIGNUP_USER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  userEggcoin: 1000,
  roundScore: 0,
  scoreMultiplier: 100
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case AWARD_WORD_COMPLETION:
      const newState = merge({}, state);

      newState.userEggcoin += action.scoreIncrement;
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

    case SIGNUP_USER_SUCCESS:
      const newUser = firebase.auth().currentUser;
      firebase.database().ref(`/users/${newUser.uid}`)
        .set({ eggcoin: 1000, activeLevel: 1});
      return state;

    case LOGIN_USER_SUCCESS:
      const eggState = merge({}, state);

      const { currentUser } = firebase.auth();
      firebase.database().ref(`/users/${currentUser.uid}/eggcoin`)
        .on('value', (data) => {
          eggState.userEggcoin = data.node_.value_;
        });
      return eggState;
    default:
      return state;
  }
};
