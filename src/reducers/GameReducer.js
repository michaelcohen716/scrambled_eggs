import { TAP_LETTER, START_NEW_WORD, VERIFY_WORD } from '../actions/types';
import merge from 'lodash/merge';

const INITIAL_STATE = {
  activeLetters: [], //available letters
  attempts: [[]], //user-inputed scramble answers
  wordIndex: 0, //index into attempts
  answers: [], //solutions
  attemptLength: 0, // if ["a", "", ""] => 1
  usedLetters: [], // ^ has letter been tapped for this scramble yet?
  message: ''
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case START_NEW_WORD:
      const newState = merge({}, state);

      const attemptsArray = new Array(action.numWords);
      for (var i = 0; i < attemptsArray.length; i++) {
         attemptsArray[i] = [];
      }
      newState.attempts = attemptsArray;

      const usedLetters = new Array(action.activeLetters.length);
      for (var j = 0; j < usedLetters.length; j++) {
        usedLetters[j] = false;
      }
      newState.usedLetters = usedLetters;

      newState.activeLetters = action.activeLetters;
      newState.answers = action.answers;
      return newState;

    case TAP_LETTER:
      const updatedState = merge({}, state);
      updatedState.attempts[state.wordIndex].push(action.letter);
      updatedState.usedLetters[action.letterIndex] = true;
      updatedState.attemptLength +=1;
      return updatedState;

    case VERIFY_WORD:
      const futureState = merge({}, state);
      futureState.attempts[state.wordIndex].push(action.letter);
      const wordAttempt = futureState.attempts[state.wordIndex].join("");

      state.answers.forEach(answer => {
        if(wordAttempt === answer){
          const usedLetters = new Array(state.activeLetters.length);
          for (var j = 0; j < usedLetters.length; j++) {
            usedLetters[j] = false;
          }
          futureState.usedLetters = usedLetters;

          const activeLetters = state.activeLetters;
          futureState.activeLetters = activeLetters;

          futureState.wordIndex +=1;
          futureState.attemptLength = 0;
        }
      });
      return futureState;
    default:
      return state;
  }
};
