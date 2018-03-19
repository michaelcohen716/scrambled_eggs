import {
  MAKE_PURCHASE, LOGIN_USER_SUCCESS,
  SHOW_ITEM_DESCRIPTION, SHAKE_IT_UP,
  SEE_A_LETTER, START_NEW_SCRAMBLE,
  FIRE_UP, UNLOCK_A_WORD, ASSIGN_LEVEL,
  ADD_TIME, END_ROUND,
}
from '../actions/types';
import merge from 'lodash/merge';

const INITIAL_STATE = {
  itemsToggle: {
    'seeALetter': false,
    'unlockAWord': false,
    'shakeItUp': false,
    'fireUp': false,
    'addTime': false
  },
  message: '',
  addTimeToggle: false,
};

export default(state = INITIAL_STATE, action) => {
  switch(action.type) {
    case ASSIGN_LEVEL:
      const assignState = merge({}, state);
      assignState.message = '';
      return assignState;

    case MAKE_PURCHASE:
      const purchaseState = merge({}, state);
      const item = action.item;
      purchaseState.itemsToggle[item] = true;

      return purchaseState;

    case LOGIN_USER_SUCCESS:
      const loginState = merge({}, state);
      loginState.itemsToggle = action.itemsToggle;
      return loginState;

    case END_ROUND:
      const roundState = merge({}, state);
      roundState.addTimeToggle = false;
      return roundState;

    case ADD_TIME:
      const timeState = merge({}, state);
      timeState.itemsToggle = action.itemsToggle;
      timeState.addTimeToggle = true;
      return timeState;

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
