import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  TAP_LETTER, START_NEW_WORD,
  VERIFY_WORD, END_ROUND,
  UNDO_WORD }
from './types';

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

  Actions.roundReview({ type: 'reset' });

  return {
    type: END_ROUND,
    boolean,
    activeLevel
  }
}
