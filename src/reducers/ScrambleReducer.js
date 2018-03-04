import merge from 'lodash/merge';
import {
  START_NEW_SCRAMBLE, TAP_SCRAMBLE_LETTER,
  VERIFY_SCRAMBLE, UNDO_WORD, END_ROUND
} from '../actions/types';
// import Scrambles from '../games/scrambles.json';

const INITIAL_STATE = {
  activeLetters: [],
  roundTime: null,
  usedLetters: [],
  pastUsedLetters: [],
  attempts: [[]],
  attemptLength: 0,
  answers: [],
  answerLength: null,
  wordIndex: 0,
  inputWords: [],
  inputChanges: [],
  roundCompleted: false
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case START_NEW_SCRAMBLE:
      const newState = merge({}, state);
      newState.roundTime = action.roundTime;
      newState.answerLength = action.firstAnswer.length;
      newState.roundCompleted = false;

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
      newState.wordIndex = 0;
      newState.pastUsedLetters = [];

      var usedLetters = new Array(action.steps[newState.wordIndex + 1].letters.length);
      for (var j = 0; j < usedLetters.length; j++) {
        usedLetters[j] = false;
      }
      newState.usedLetters = usedLetters;

      return newState;

    case END_ROUND:
      const endState = merge({}, state);
      endState.roundCompleted = action.boolean;
      return endState;

    case TAP_SCRAMBLE_LETTER:
      const tapState = merge({}, state);
      tapState.attempts[state.wordIndex].push(action.letter);
      tapState.attemptLength += 1;
      tapState.usedLetters[action.letterIndex] = true;

      return tapState;

    case VERIFY_SCRAMBLE:
      const verifyState = merge({}, state);
      const wordIndex = state.wordIndex;

      verifyState.attempts[wordIndex].push(action.letter);
      const wordAttempt = verifyState.attempts[wordIndex].join("");

      if(verifyState.answers[wordIndex] === wordAttempt){
        verifyState.wordIndex += 1;
        verifyState.pastUsedLetters = state.usedLetters;
        if(state.wordIndex === 0){
          verifyState.pastUsedLetters[action.letterIndex] = true;
        }
      } else {
        verifyState.attempts[wordIndex] = [];
      }

      const usedLetters1 = new Array(state.activeLetters.length);
      for (var k = 0; k < usedLetters1.length; k++) {
        usedLetters1[k] = false;
      }

      verifyState.usedLetters = usedLetters1;
      verifyState.attemptLength = 0;

      return verifyState;

    case UNDO_WORD:
      const undoState = merge({}, state);
      undoState.attempts[state.wordIndex] = [];
      undoState.attemptLength = 0;

      const usedLetters2 = new Array(state.activeLetters.length);
      for (var z = 0; z < usedLetters2.length; z++) {
        usedLetters2[z] = false;
      }

      undoState.usedLetters = usedLetters2;

      return undoState;

    default:
      return state;
  }
};
