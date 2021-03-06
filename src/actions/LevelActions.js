import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { ASSIGN_LEVEL, ADVANCE_STAGE, PURCHASE_EGGCOIN } from './types';

export const assignLevel = (nextLevel, levelType) => {
  Actions.game();

  return {
    type: ASSIGN_LEVEL,
    nextLevel,
    levelType
  };
};

export const advanceStage = (activeLevel) => {
  const { currentUser } = firebase.auth();
  firebase.database().ref(`/gameInfo/${currentUser.uid}`)
    .update({ activeLevel: activeLevel + 1 });

  return {
    type: ADVANCE_STAGE,
    activeLevel
  };
};

export const purchaseEggcoin = (eggcoinPurchase, currentEggcoin) => {
  const { currentUser } = firebase.auth();
  firebase.database().ref(`/gameInfo/${currentUser.uid}`)
    .update({ eggcoin: eggcoinPurchase + currentEggcoin});

  return {
    type: PURCHASE_EGGCOIN,
    eggcoinPurchase
  };
};
