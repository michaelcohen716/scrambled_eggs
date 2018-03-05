import firebase from 'firebase';
import {
  MAKE_PURCHASE, SHAKE_IT_UP
} from './types';

export const makePurchase = ({ item, cost, itemsToggle }) => {
  const { currentUser } = firebase.auth();
  itemsToggle[item] = true;
  
  firebase.database().ref(`/gameInfo/${currentUser.uid}`)
    .update({
      itemsToggle
    })

  return {
    type: MAKE_PURCHASE,
    item,
    cost
  }
}

export const shakeItUp = () => {
  return {
    type: SHAKE_IT_UP
  }
}
