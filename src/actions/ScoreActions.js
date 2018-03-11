import firebase from 'firebase';
import {
  AWARD_WORD_COMPLETION, RECORD_SCORE,
  REDUCE_SCORE_MULTIPLIER, SPEND_EGGCOIN
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
    firebase.database().ref(`/gameInfo/${currentUser.uid}`)
    .set({ eggcoin })
    .then(() => {
      dispatch({
        type: RECORD_SCORE,
        score,
        eggcoin
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

export const spendEggcoin = (cost, eggcoin) => {
  const { currentUser } = firebase.auth();
  const newEggcoin = eggcoin - cost;
  firebase.database().ref(`/gameInfo/${currentUser.uid}`)
    .update({eggcoin: newEggcoin});

  return {
    type: SPEND_EGGCOIN,
    cost
  };
};
