import {
  START_NEW_LADDER, TAP_LADDER_LETTER,
  UNDO_WORD, VERIFY_LADDER_WORD,
  SHAKE_IT_UP, SEE_A_LETTER,
  UNLOCK_A_WORD, END_ROUND
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
    case END_ROUND:
      const endState = merge({}, state);
      endState.roundCompleted = action.roundCompleted;
      return endState;

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

      const usedLettersShake = new Array(shakeState.activeLetters.length);
      for (var a = 0; a < usedLettersShake.length; a++) {
        usedLettersShake[a] = false;
      }
      shakeState.usedLetters = usedLettersShake;

      return shakeState;

    case SEE_A_LETTER:
      const seeState = merge({}, state);
      if(action.levelType === "ladder"){
        seeState.message = "Here's a letter";
        seeState.attempts[state.wordIndex] = [];
        let answerToGive = state.answers[state.wordIndex][0];

        const letterInsert =  answerToGive.split("")[0];
        seeState.attempts[state.wordIndex].push(letterInsert);
        seeState.attemptLength = 1;

        seeState.usedLetters.forEach((el, idx) => {
          seeState.usedLetters[idx] = false;
        });

        const letterIndex = state.activeLetters.indexOf(letterInsert);
        seeState.usedLetters[letterIndex] = true;
      }

      return seeState;

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

    case UNLOCK_A_WORD:
      const unlockState = merge({}, state);
      if(action.levelType === "ladder"){
        unlockState.message = "Here's a word";
        let findWord = state.answers[state.wordIndex][0];
        unlockState.answers[state.wordIndex] = true;

        const insertWordArray = [];
        findWord = findWord.split("");
        findWord.forEach(letter => {
          insertWordArray.push(letter);
        });

        unlockState.attempts[state.wordIndex] = insertWordArray;
        unlockState.attemptLength = 0;
        unlockState.wordIndex += 1;
      }

      return unlockState;

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

      if(possibleAnswers.includes(attempt)){
        verifyState.answers[state.wordIndex] = true;
        verifyState.message = "Nice!";
        verifyState.activeLetters = verifyState.attempts[state.wordIndex];

        const nextUsedLetters = new Array(verifyState.activeLetters.length);
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
