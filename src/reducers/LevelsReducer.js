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
    case SIGNUP_USER_SUCCESS:
      const newUser = firebase.auth().currentUser;
      firebase.database().ref(`/users/${newUser.uid}`)
        .set({ activeLevel: 1});
      return state;

    case LOGIN_USER_SUCCESS:
      const unsolvedState = merge({}, state);
      const { currentUser } = firebase.auth();
      firebase.database().ref(`/users/${currentUser.uid}/activeLevel`)
      .once('value', (data) => {
        console.log(data);
        unsolvedState.nextUnsolvedLevel = data.node_.value_;
      });
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
