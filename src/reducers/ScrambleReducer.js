import merge from 'lodash/merge';
import {
  START_NEW_SCRAMBLE
} from '../actions/types';
import Scrambles from '../games/scrambles.json';

const INITIAL_STATE = {
  activeLetters: [],
  roundTime: null,
  usedLetters: [],
  attemptLength: 0,
  answerLength: null,
  clueIndex: 1,
  inputWords: [],
  inputChanges: []
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case START_NEW_SCRAMBLE:
      const newState = merge({}, state);
      newState.roundTime = action.roundTime;
      newState.answerLength = action.firstAnswer.length;

      let inputWords = [];
      let inputChanges = [];

      Object.keys(action.steps).forEach(step => {
        if(parseInt(step) % 2 != 0){
          let odd = action.steps[step];
          inputWords.push(odd);

          if(parseInt(step) === 1){
            newState.activeLetters = odd.letters;
          }

        } else {
          const even = action.steps[step];
          inputChanges.push(even);
        }
      });

      newState.inputWords = inputWords;
      newState.inputChanges = inputChanges;

      var usedLetters = new Array(action.steps[state.clueIndex].letters.length);
      for (var j = 0; j < usedLetters.length; j++) {
        usedLetters[j] = false;
      }
      newState.usedLetters = usedLetters;

      return newState;
    default:
      return state;
  }
};
