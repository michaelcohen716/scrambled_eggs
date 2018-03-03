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
export const endRound = (boolean, activeLevel) => {
  const newLevel = activeLevel+1;
  const { currentUser } = firebase.auth();
  if(boolean){
    firebase.database().ref(`/gameInfo/${currentUser.uid}`)
      .update({ activeLevel: newLevel, activeLevelAttempted: false });
  } else {
    firebase.database().ref(`/gameInfo/${currentUser.uid}`)
      .update({ activeLevelAttempted: true});
  }

  if(Levels[newLevel].stage !== Levels[activeLevel].stage){ //advance stage
    Actions.advanceStage({ type: 'reset' });
  } else {
    Actions.roundReview({ type: 'reset' });
  }


  return {
    type: END_ROUND,
    boolean,
    activeLevel
  }
}
