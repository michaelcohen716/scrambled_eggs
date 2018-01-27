import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { BEGIN_GAME } from './types';

export const beginGame = () => {
  const { currentUser } = firebase.auth();

  return(dispatch) => {
    dispatch({ type: BEGIN_GAME,
               payload: currentUser });
    Actions.game();

  };
};
