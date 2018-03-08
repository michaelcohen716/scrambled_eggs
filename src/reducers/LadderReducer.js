import {
  START_NEW_LADDER
} from '../actions/types';
import merge from 'lodash/merge';

const INITIAL_STATE = {
  activeLetters: [],
  attempts: [[]],
  wordIndex: 0,
  attemptLength: 0,
  usedLetters: [],
  message: '',
  roundCompleted: false,
  roundTime: 0
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case START_NEW_LADDER:
      const ladderState = merge({}, state);

      const attemptsArray = new Array(action.numWords);
      for (var i = 0; i < attemptsArray.length; i++) {
         attemptsArray[i] = [];
      }
      ladderState.attempts = attemptsArray;

      const activeLetters = action.firstAnswer.split("");
      ladderState.activeLetters = activeLetters;

      var usedLetters = new Array(activeLetters.length);
      for (var j = 0; j < usedLetters.length; j++) {
        usedLetters[j] = false;
      }
      ladderState.usedLetters = usedLetters;

      ladderState.wordIndex = 0;
      ladderState.answers = action.answers;
      ladderState.roundCompleted = false;
      ladderState.message = '';
      ladderState.roundTime = action.roundTime;

      return ladderState;

    default:
     return state;
  }
};
