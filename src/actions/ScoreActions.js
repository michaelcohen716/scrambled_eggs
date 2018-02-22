import firebase from 'firebase';
import {
  AWARD_WORD_COMPLETION, RECORD_SCORE,
  REDUCE_SCORE_MULTIPLIER
} from './types';

export const awardWordCompletion = (scoreIncrement) => {
  return {
    type: AWARD_WORD_COMPLETION,
    scoreIncrement
  };
};

export const recordScore = (score, eggcoin) => {
  const { currentUser } = firebase.auth();

  return(dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/scores`)
    .push({ roundScore: score })
    .then(() => {
      firebase.database().ref(`/users/${currentUser.uid}/eggcoin`)
        .set({ eggcoin });
      dispatch({
        type: RECORD_SCORE, //right now, this is non-op
        score
      });
    });
  };
};

export const reduceScoreMultiplier = (decrement) => {
  return {
    type: REDUCE_SCORE_MULTIPLIER,
    decrement
  };
};
