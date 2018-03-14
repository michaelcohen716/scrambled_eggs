import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { ASSIGN_LEVEL, ADVANCE_STAGE } from './types';

export const assignLevel = (nextLevel, levelType) => {
  Actions.game();

  return {
    type: ASSIGN_LEVEL,
    nextLevel,
    levelType
  };
};

export const advanceStage = () => {
  const { currentUser } = firebase.auth();
  firebase.database().ref(`/gameInfo/${currentUser.uid}`)
    .update({ activeLevelAttempted: false,
              itemsToggle
    });
  return {
    type: ADVANCE_STAGE
  };
};
