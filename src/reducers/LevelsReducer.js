import merge from 'lodash/merge';
import {
  ASSIGN_LEVEL, END_ROUND,
  LOGIN_USER_SUCCESS,
} from '../actions/types';

import Levels from '../games/levels.json';

var STAGES = {
  "Sunny Side Up": 1,
  "Over Easy": 2,
  "Hard Boiled": 3,
};

const INITIAL_STATE = {
  activeLevel: 1,
  nextUnsolvedLevel: 1,
  levelType: null,
  stage: "Sunny Side Up",
  lastStage: "Sunny Side Up",
  stageNum: 1,
  stages: STAGES,
  advanceStagePage: false //whether next round is next stage (different RoundReview component)
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
      newState.levelType = action.levelType;
      newState.advanceStagePage = false;
      return newState;

    case END_ROUND:
      const updatedState = merge({}, state);
      if(action.roundCompleted){
        const nextUpdated = Math.max(updatedState.nextUnsolvedLevel, action.activeLevel + 1);
        updatedState.nextUnsolvedLevel = nextUpdated;

        // advance stage
        const stage = Levels[updatedState.nextUnsolvedLevel].stage;
        if(stage !== state.stage){
          updatedState.lastStage = state.stage;
          updatedState.stage = stage;
          updatedState.stageNum += 1;
        }
      }
      updatedState.advanceStagePage = action.advanceStagePage;

      return updatedState;

    default:
      return state;
  }
};
