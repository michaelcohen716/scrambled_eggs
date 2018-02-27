import merge from 'lodash/merge';
import {
  START_NEW_SCRAMBLE, TAP_SCRAMBLE_LETTER,
  VERIFY_SCRAMBLE
} from '../actions/types';
// import Scrambles from '../games/scrambles.json';

const INITIAL_STATE = {
  activeLetters: [],
  roundTime: null,
  usedLetters: [],
  attempts: [[]],
  attemptLength: 0,
  answers: [],
  answerLength: null,
  clueIndex: 0,
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
      let answers = [];

      Object.keys(action.steps).forEach(step => {
        if(parseInt(step) % 2 != 0){
          let odd = action.steps[step];
          inputWords.push(odd);
          answers.push(odd.answer);

          if(parseInt(step) === 1){
            newState.activeLetters = odd.letters;
          }

        } else {
          const even = action.steps[step];
          inputChanges.push(even);
        }
      });

      const attempts = answers.map(() => {
        return (
          []
        );
      });

      newState.inputWords = inputWords;
      newState.inputChanges = inputChanges;
      newState.answers = answers;
      newState.attempts = attempts;

      var usedLetters = new Array(action.steps[state.clueIndex + 1].letters.length);
      for (var j = 0; j < usedLetters.length; j++) {
        usedLetters[j] = false;
      }
      newState.usedLetters = usedLetters;

      return newState;

    case TAP_SCRAMBLE_LETTER:
      const tapState = merge({}, state);
      tapState.attempts[state.clueIndex].push(action.letter);
      tapState.attemptLength += 1;
      tapState.usedLetters[action.letterIndex] = true;

      return tapState;

    case VERIFY_SCRAMBLE:
      const verifyState = merge({}, state);
      const clueIndex = state.clueIndex;

      verifyState.attempts[clueIndex].push(action.letter);
      const wordAttempt = verifyState.attempts[clueIndex].join("");

      if(verifyState.answers[clueIndex] === wordAttempt){
        verifyState.clueIndex += 1;
      } else {
        verifyState.attempts[clueIndex] = [];
      }

      const usedLetters1 = new Array(state.activeLetters.length);
      for (var k = 0; k < usedLetters1.length; k++) {
        usedLetters1[k] = false;
      }

      verifyState.usedLetters = usedLetters1;

      return verifyState;
    default:
      return state;
  }
};
