import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  TAP_LETTER, START_NEW_WORD,
  VERIFY_WORD, END_ROUND,
  UNDO_WORD }
from './types';
import Levels from '../games/levels.json';

export const startNewWord = ({ numWords, activeLetters, answers, roundTime, levelType }) => {
  return {
    type: START_NEW_WORD,
    numWords,
    activeLetters,
    answers,
    roundTime,
    levelType
  };
};

export const tapLetter = (letter, letterIndex) => {
  return {
    type: TAP_LETTER,
    letter,
    letterIndex
  };
};

export const verifyWord = (letter, letterIndex) => {
  return {
    type: VERIFY_WORD,
    letter,
    letterIndex
  }
}

export const undoWord = () => {
  return {
    type: UNDO_WORD
  }
}

// this action does this for both types of game
export const endRound = ({ roundCompleted, activeLevel, itemsToggle}) => {
  const newLevel = activeLevel + 1;
  const { currentUser } = firebase.auth();

  if(roundCompleted){
    firebase.database().ref(`/gameInfo/${currentUser.uid}`)
      .update({ activeLevel: newLevel,
                activeLevelAttempted: false,
                itemsToggle
      });
  } else {
    firebase.database().ref(`/gameInfo/${currentUser.uid}`)
      .update({ activeLevelAttempted: true, itemsToggle });
  }

  let advanceStagePage = false;
  if(Levels[newLevel].stage !== Levels[activeLevel].stage && roundCompleted){ //advance stage
    Actions.advanceStage({ type: 'reset' });
    advanceStagePage = true;
  } else {
    Actions.roundReview({ type: 'reset' });
  }


  return {
    type: END_ROUND,
    roundCompleted,
    activeLevel,
    advanceStagePage
  }
}
