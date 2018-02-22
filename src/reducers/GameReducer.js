import {
  TAP_LETTER, START_NEW_WORD,
  VERIFY_WORD, END_ROUND }
from '../actions/types';
import merge from 'lodash/merge';

const INITIAL_STATE = {
  activeLetters: [], //available letters
  attempts: [[]], //user-inputed scramble answers
  wordIndex: 0, //index into attempts
  answers: [], //solutions
  attemptLength: 0, // if ["a", "", ""] => 1
  usedLetters: [], // ^ has letter been tapped for this scramble yet?
  message: '', // "Nice!" or "Not word"
  roundCompleted: false
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

      var usedLetters = new Array(action.activeLetters.length);
      for (var j = 0; j < usedLetters.length; j++) {
        usedLetters[j] = false;
      }
      newState.usedLetters = usedLetters;

      newState.activeLetters = action.activeLetters;
      newState.answers = action.answers;
      return newState;

    case TAP_LETTER:
      const updatedState = merge({}, state);
      if(updatedState.message){
        updatedState.message = "";
      }

      updatedState.attempts[state.wordIndex].push(action.letter);
      updatedState.usedLetters[action.letterIndex] = true;
      updatedState.attemptLength +=1;
      return updatedState;

    case VERIFY_WORD:
      const futureState = merge({}, state);
      futureState.attempts[state.wordIndex].push(action.letter);
      const wordAttempt = futureState.attempts[state.wordIndex].join("");

      const usedLetters1 = new Array(state.activeLetters.length);
      for (var k = 0; k < usedLetters1.length; k++) {
        usedLetters1[k] = false;
      }

      if(futureState.answers.includes(wordAttempt)){
        futureState.wordIndex +=1;
        futureState.message = "Nice!";

        const found = futureState.answers.indexOf(wordAttempt);
        futureState.answers[found] = true;
      } else {
        futureState.message = "Not a word. Try again.";
        futureState.attempts[state.wordIndex] = [];
      }

      const activeLetters = state.activeLetters;
      futureState.activeLetters = activeLetters;

      futureState.attemptLength = 0;
      futureState.usedLetters = usedLetters1;
      return futureState;

      case END_ROUND:
        let endState = merge({}, state);
        endState.roundCompleted = action.boolean;
        return endState;

    default:
      return state;
  }
};
