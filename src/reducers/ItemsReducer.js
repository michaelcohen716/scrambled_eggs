import {
  MAKE_PURCHASE, LOGIN_USER_SUCCESS,
  SHOW_ITEM_DESCRIPTION, SHAKE_IT_UP,
  SEE_A_LETTER, START_NEW_SCRAMBLE,
  FIRE_UP, UNLOCK_A_WORD
}
from '../actions/types';
import merge from 'lodash/merge';

const INITIAL_STATE = {
  itemsToggle: {
    'seeALetter': false,
    'unlockAWord': false,
    'shakeItUp': false,
    'fireUp': false
  },
  message: ''
};

export default(state = INITIAL_STATE, action) => {
  const newState = merge({}, state);
  const newAction = merge({}, action);
  state = newState;
  action = newAction;
  switch(action.type) {
    case MAKE_PURCHASE:
      const purchaseState = merge({}, state);
      const item = action.item;
      purchaseState.itemsToggle[item] = true;

      return purchaseState;

    case LOGIN_USER_SUCCESS:
      const loginState = merge({}, state);
      loginState.itemsToggle = action.itemsToggle;
      return loginState;

    case SHAKE_IT_UP:
    case SEE_A_LETTER:
    case UNLOCK_A_WORD:
    case FIRE_UP:
      const itemState = merge({}, state);
      itemState.itemsToggle[action.item] = false;
      return itemState;

    case SHOW_ITEM_DESCRIPTION:
      const descriptionState = merge({}, state);
      descriptionState.message = action.message;
      return descriptionState;

    case START_NEW_SCRAMBLE:
      const sState = merge({}, state);
      sState.message = '';
      return sState;

    default:
      return state;

  }
};

function deepCopy(o) {
  let output, v, key;
  output = Array.isArray(o) ? [] : {};
  for (key in o) {
    v = o[key];
    output[key] = (typeof v === "object") ? deepCopy(v) : v;
  }
  return output;
}
