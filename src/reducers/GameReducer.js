import { IMPORT_NEW_WORD } from '../actions/types';

const INITIAL_STATE = {
  word: ''
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    // case IMPORT_NEW_WORD:
    //   return { ...state, ...INITIAL_STATE, word: action.payload };
    default:
      return state;
  }
};
