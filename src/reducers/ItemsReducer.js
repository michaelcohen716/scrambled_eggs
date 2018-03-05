import {
  MAKE_PURCHASE, LOGIN_USER_SUCCESS
}
from '../actions/types';
import merge from 'lodash/merge';

const INITIAL_STATE = {
  itemsToggle: {
    seeALetter: false,
    fireUp: false,
    shakeItUp: false
  },
  loginToggle: false
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
      loginState.loginToggle = !state.loginToggle;

      return loginState;

    default:
      return state;

  }
};
