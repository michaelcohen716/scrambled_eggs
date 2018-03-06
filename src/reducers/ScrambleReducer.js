import merge from 'lodash/merge';
import {
  START_NEW_SCRAMBLE, TAP_SCRAMBLE_LETTER,
  VERIFY_SCRAMBLE, UNDO_WORD,
  END_ROUND, SHAKE_IT_UP,
  SEE_A_LETTER, UNLOCK_A_WORD
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
    case UNLOCK_A_WORD:
      const unlockState = merge({}, state);
      // const findWord = state.

      return unlockState;

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
      endState.roundCompleted = action.roundCompleted;
      return endState;

    case SHAKE_IT_UP:
      const shakeState = merge({}, state);

      if(action.levelType === "scramble"){
        let newActiveLetters = "";
        const oldActiveLetters = state.activeLetters.split("");

        //shuffle
        while(oldActiveLetters.length > 0){
          newActiveLetters += oldActiveLetters.splice(oldActiveLetters.length * Math.random() << 0, 1);
        }

        // newActiveLetters = newActiveLetters.split("");
        shakeState.activeLetters = newActiveLetters;
        const inputWordsNew = state.inputWords;
        inputWordsNew[state.wordIndex].letters = newActiveLetters;
        shakeState.inputWords = inputWordsNew;

        shakeState.attemptLength = 0;
        shakeState.attempts[state.wordIndex] = [];

        const usedLettersShake = new Array(state.activeLetters.length);
        for (var a = 0; a < usedLettersShake.length; a++) {
          usedLettersShake[a] = false;
        }
        shakeState.usedLetters = usedLettersShake;
      }

      return shakeState;

    case SEE_A_LETTER:
      const seeState = merge({}, state);
      if(action.levelType === "scramble"){
        seeState.attempts[state.wordIndex] = [];
        const letterInsert = state.answers[state.wordIndex].split("")[0];
        seeState.attempts[state.wordIndex].push(letterInsert);

        seeState.attemptLength = 1;

        seeState.usedLetters.forEach((el, idx) => {
          seeState.usedLetters[idx] = false;
        });

        const letterIndex = state.activeLetters.split("").indexOf(letterInsert);
        seeState.usedLetters[letterIndex] = true;
      }

      return seeState;

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
          verifyState.activeLetters = state.inputWords[verifyState.wordIndex].letters;
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
