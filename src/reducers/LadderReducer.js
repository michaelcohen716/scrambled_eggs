import {
  START_NEW_LADDER, TAP_LADDER_LETTER,
  VERIFY_LADDER_WORD
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
      const answer = state.answers[state.wordIndex];
      const attempt = state.attempts[state.wordIndex].join("");
      if(answer === attempt){
        verifyState.answers[state.wordIndex] = true;
        verifyState.wordIndex +=1;
        verifyState.message = "Nice!";

        const nextUsedLetters = new Array(state.answers[verifyState.wordIndex].length);
        for (var n = 0; n < nextUsedLetters.length; n++) {
          nextUsedLetters[n] = false;
        }
        futureState.usedLetters = nextUsedLetters;

      } else {
        futureState.message = "Not a word. Try again.";
        futureState.attempts[state.wordIndex] = [];

        const usedLetters1 = new Array(state.activeLetters.length);
        for (var k = 0; k < usedLetters1.length; k++) {
          usedLetters1[k] = false;
        }
        futureState.usedLetters = usedLetters1;
      }


      futureState.attemptLength = 0;

      return verifyState;

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
