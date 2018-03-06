import {
  TAP_LETTER, START_NEW_WORD,
  VERIFY_WORD, END_ROUND,
  UNDO_WORD, SHAKE_IT_UP,
  SEE_A_LETTER
} from '../actions/types';
import merge from 'lodash/merge';

const INITIAL_STATE = {
  activeLetters: [], //available letters
  attempts: [[]], //user-inputed scramble answers
  wordIndex: 0, //index into attempts
  answers: [], //solutions
  attemptLength: 0, // if ["a", "", ""] => 1
  usedLetters: [], // ^ has letter been tapped for this scramble yet? t/f
  message: '', // "Nice!" or "Not word"
  roundCompleted: false,
  roundTime: 0 //time allotted for round
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

      newState.wordIndex = 0;
      newState.activeLetters = action.activeLetters;
      newState.answers = action.answers;
      newState.roundCompleted = false;
      newState.message = '';
      newState.roundTime = action.roundTime;
      return newState;

    case SHAKE_IT_UP:
      const shakeState = merge({}, state);
      let newActiveLetters = "";
      const oldActiveLetters = state.activeLetters;

      //shuffle
      while(oldActiveLetters.length > 0){
        newActiveLetters += oldActiveLetters.splice(oldActiveLetters.length * Math.random() << 0, 1);
      }

      newActiveLetters = newActiveLetters.split("");
      shakeState.activeLetters = newActiveLetters;
      shakeState.attemptLength = 0;
      shakeState.attempts[state.wordIndex] = [];
      shakeState.message = 'Shake it up!';

      const usedLettersShake = new Array(state.activeLetters.length);
      for (var a = 0; a < usedLettersShake.length; a++) {
        usedLettersShake[a] = false;
      }
      shakeState.usedLetters = usedLettersShake;

      return shakeState;

    case TAP_LETTER:
      const updatedState = merge({}, state);
      if(updatedState.message){
        updatedState.message = '';
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

      case SEE_A_LETTER:
        const seeState = merge({}, state);
        if(action.levelType === "jumble"){
          seeState.attempts[state.wordIndex] = [];
          // debugger
          let answerToGive;
          for(var b = 0; b < state.answers.length; b++){
            if(typeof state.answers[b] === "string"){
              answerToGive = state.answers[b];
              break;
            }
          }

          const letterInsert = answerToGive.split("")[0];
          seeState.attempts[state.wordIndex].push(letterInsert);

          seeState.attemptLength = 1;

          seeState.usedLetters.forEach((el, idx) => {
            seeState.usedLetters[idx] = false;
          });

          const letterIndex = state.activeLetters.indexOf(letterInsert);
          seeState.usedLetters[letterIndex] = true;
        }

        return seeState;

      case END_ROUND:
        const endState = merge({}, state);
        endState.roundCompleted = action.roundCompleted;
        return endState;

      case UNDO_WORD:
        const undoState = merge({}, state);
        const currentWordIndex = state.wordIndex;
        undoState.attempts[currentWordIndex] = [];
        undoState.attemptLength = 0;

        const usedLetters2 = new Array(state.activeLetters.length);
        for (var m = 0; m < usedLetters2.length; m++) {
          usedLetters2[m] = false;
        }
        undoState.usedLetters = usedLetters2; //from START_NEW_WORD

        return undoState;

    default:
      return state;
  }
};
