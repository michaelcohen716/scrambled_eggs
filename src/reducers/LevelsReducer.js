import merge from 'lodash/merge';
import { ASSIGN_LEVEL, END_ROUND } from '../actions/types';

const INITIAL_STATE = {
  activeLevel: null,
  nextUnsolvedLevel: 1
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
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
