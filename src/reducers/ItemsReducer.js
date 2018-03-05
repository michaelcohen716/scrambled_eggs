import {
  MAKE_PURCHASE
}
from '../actions/types';
import merge from 'lodash/merge';

const INITIAL_STATE = {
  seeALetter: false,
  fireUp: false,
  shakeItUp: false
};

export default(state = INITIAL_STATE, action) => {
  switch(action.type) {
    case MAKE_PURCHASE:
      const purchaseState = merge({}, state);
      const item = action.item;
      purchaseState[item] = true;

      return purchaseState;

    default:
      return state;

  }
};
