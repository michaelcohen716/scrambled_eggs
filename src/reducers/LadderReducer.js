import {
  START_NEW_LADDER, TAP_LADDER_LETTER,
  UNDO_WORD, VERIFY_LADDER_WORD,

} from '../actions/types';
import merge from 'lodash/merge';

const INITIAL_STATE = {
  activeLetters: [],
  attempts: [[]],
  wordIndex: 0,
  attemptLength: 0,
  currentWordIndex: 0,
  usedLetters: [],
  answers: [[]], // [["..."], ["..", "..."], ["..", "...", "..."]]
  message: '',
  roundCompleted: false,
  roundTime: 0
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case UNDO_WORD:
      const undoState = merge({}, state);
      undoState.attempts[state.wordIndex] = [];
      undoState.attemptLength = 0;

      const usedLetters2 = new Array(state.activeLetters.length);
      for (var m = 0; m < usedLetters2.length; m++) {
        usedLetters2[m] = false;
      }
      undoState.usedLetters = usedLetters2; //from START_NEW_WORD

      return undoState;

    case TAP_LADDER_LETTER:
      const tapState = merge({}, state);
      tapState.message = '';

      tapState.attempts[state.wordIndex].push(action.letter);

      tapState.usedLetters[action.letterIndex] = true;
      tapState.attemptLength +=1;

      return tapState;

    case VERIFY_LADDER_WORD:
      const verifyState = merge({}, state);

      verifyState.attempts[state.wordIndex].push(action.letter);
      const possibleAnswers = state.answers[state.wordIndex];
      const attempt = verifyState.attempts[state.wordIndex].join("");
      // debugger
      if(possibleAnswers.includes(attempt)){
        verifyState.answers[state.wordIndex] = true;
        verifyState.message = "Nice!";
        const nextUsedLetters = new Array(state.answers[verifyState.wordIndex].length);
        for (var n = 0; n < nextUsedLetters.length; n++) {
          nextUsedLetters[n] = false;
        }
        verifyState.usedLetters = nextUsedLetters;

        if(verifyState.wordIndex < state.answers.length){
          verifyState.usedLetters = nextUsedLetters;
          verifyState.currentWordLength -=1;
        }
        verifyState.wordIndex +=1;

      } else {
        verifyState.message = "Not a word. Try again.";
        verifyState.attempts[state.wordIndex] = [];

        const usedLetters1 = new Array(state.activeLetters.length);
        for (var k = 0; k < usedLetters1.length; k++) {
          usedLetters1[k] = false;
        }

        verifyState.usedLetters = usedLetters1;
      }


      verifyState.attemptLength = 0;

      return verifyState;

    case START_NEW_LADDER:
      const ladderState = merge({}, state);

      const attemptsArray = new Array(action.numWords);
      for (var i = 0; i < attemptsArray.length; i++) {
         attemptsArray[i] = [];
      }
      ladderState.attempts = attemptsArray;

      ladderState.activeLetters = action.activeLetters;
      ladderState.currentWordLength = action.activeLetters.length;

      var usedLetters = new Array(action.activeLetters.length);
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
