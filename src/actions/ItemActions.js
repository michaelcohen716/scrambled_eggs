import firebase from 'firebase';
import {
  MAKE_PURCHASE, SHAKE_IT_UP,
  SHOW_ITEM_DESCRIPTION, SEE_A_LETTER,
  UNLOCK_A_WORD, FIRE_UP,
  ADD_TIME,
  SHOW_GENERAL_INFO //not related to powerups
} from './types';
import merge from 'lodash/merge';

export const makePurchase = ({ item, cost, itemsToggle, eggcoin }) => {
  const { currentUser } = firebase.auth();
  itemsToggle[item] = true;
  const newEggcoin = eggcoin - cost;

  firebase.database().ref(`/gameInfo/${currentUser.uid}`)
    .update({
      itemsToggle, eggcoin: newEggcoin
    })

  return {
    type: MAKE_PURCHASE,
    item,
    cost
  }
}

export const showItemDescription = (message) => {
  return {
    type: SHOW_ITEM_DESCRIPTION,
    message
  }
}

export const shakeItUp = ({ itemsToggle, levelType, item }) => {
  const { currentUser } = firebase.auth();
  const newToggle = merge({}, itemsToggle);
  newToggle[item] = false;

  firebase.database().ref(`/gameInfo/${currentUser.uid}`)
    .update({  itemsToggle: newToggle })

  return {
    type: SHAKE_IT_UP,
    itemsToggle,
    levelType,
    item
  }
}

export const seeALetter = ({ itemsToggle, levelType, item }) => {
  const { currentUser } = firebase.auth();
  itemsToggle[item] = false;

  firebase.database().ref(`/gameInfo/${currentUser.uid}`)
    .update({  itemsToggle })

  return {
    type: SEE_A_LETTER,
    itemsToggle,
    levelType,
    item
  }
}

export const unlockAWord = ({ itemsToggle, levelType, item }) => {
  const { currentUser } = firebase.auth();
  itemsToggle[item] = false;

  firebase.database().ref(`/gameInfo/${currentUser.uid}`)
    .update({  itemsToggle })

  return {
    type: UNLOCK_A_WORD,
    itemsToggle,
    levelType,
    item
  }
}

export const fireUp = ({ itemsToggle, item }) => {
  const { currentUser } = firebase.auth();
  itemsToggle[item] = false;

  firebase.database().ref(`/gameInfo/${currentUser.uid}`)
    .update({  itemsToggle })

  return {
    type: FIRE_UP,
    itemsToggle,
    item
  }
}

export const addTime = ({ itemsToggle, item }) => {
  const { currentUser } = firebase.auth();
  itemsToggle[item] = false;

  firebase.database().ref(`/gameInfo/${currentUser.uid}`)
    .update({  itemsToggle })

  return {
    type: ADD_TIME,
    itemsToggle,
    item
  }
}
