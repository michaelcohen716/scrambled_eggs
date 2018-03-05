import {
  MAKE_PURCHASE, LOGIN_USER_SUCCESS,
  SHOW_ITEM_DESCRIPTION
}
from '../actions/types';
import merge from 'lodash/merge';

const INITIAL_STATE = {
  itemsToggle: {
    seeALetter: false,
    fireUp: false,
    shakeItUp: false
  },
  message: ''
};

export default(state = INITIAL_STATE, action) => {
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

    case SHOW_ITEM_DESCRIPTION:
      const descriptionState = merge({}, state);
      descriptionState.message = action.message;
      return descriptionState;

    default:
      return state;

  }
};
