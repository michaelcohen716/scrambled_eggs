import firebase from 'firebase';
import merge from 'lodash/merge';
import {
  ASSIGN_LEVEL, END_ROUND,
  LOGIN_USER_SUCCESS, SIGNUP_USER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  activeLevel: 1,
  nextUnsolvedLevel: 1
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case LOGIN_USER_SUCCESS:
      const unsolvedState = merge({}, state);
      unsolvedState.activeLevel = action.activeLevel;
      unsolvedState.nextUnsolvedLevel = action.activeLevel;
      return unsolvedState;

    case ASSIGN_LEVEL:
      const newState = merge({}, state);
      newState.activeLevel = action.nextLevel;
      return newState;

    case END_ROUND:
      const updatedState = merge({}, state);
      if(action.boolean){
        updatedState.nextUnsolvedLevel = action.activeLevel + 1;
      }
      return updatedState;

    default:
      return state;
  }
};
