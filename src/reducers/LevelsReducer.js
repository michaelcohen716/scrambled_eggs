import merge from 'lodash/merge';
import { ASSIGN_LEVEL } from '../actions/types';

const INITIAL_STATE = {
  activeLevel: null
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case ASSIGN_LEVEL:
      const newState = merge({}, state);
      newState.activeLevel = action.nextLevel;
      return newState;
    default:
      return state;
  }
};
