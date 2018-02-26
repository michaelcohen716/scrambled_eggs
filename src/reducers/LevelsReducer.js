import merge from 'lodash/merge';
import {
  ASSIGN_LEVEL, END_ROUND,
  LOGIN_USER_SUCCESS
} from '../actions/types';

import Levels from '../games/levels.json';

var STAGES = {
  "Breaking the Shell": 1,
  "Add Seasoning": 2
};

const INITIAL_STATE = {
  activeLevel: 1,
  nextUnsolvedLevel: 1,
  stage: "Breaking the Shell",
  stageNum: 1,
  stages: STAGES
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case LOGIN_USER_SUCCESS:
      const unsolvedState = merge({}, state);
      unsolvedState.activeLevel = action.activeLevel;
      unsolvedState.nextUnsolvedLevel = action.activeLevel;
      unsolvedState.stage = Levels[action.activeLevel].stage;
      unsolvedState.stageNum = STAGES[unsolvedState.stage];
      return unsolvedState;

    case ASSIGN_LEVEL:
      const newState = merge({}, state);
      newState.activeLevel = action.nextLevel;
      return newState;

    case END_ROUND:
      const updatedState = merge({}, state);
      if(action.boolean){
        updatedState.nextUnsolvedLevel = action.activeLevel + 1;

        // advance stage
        const stage = Levels[updatedState.nextUnsolvedLevel].stage;
        if(stage !== state.stage){
          updatedState.stage = stage;
          updatedState.stageNum += 1;
        }
      }
      return updatedState;

    default:
      return state;
  }
};
