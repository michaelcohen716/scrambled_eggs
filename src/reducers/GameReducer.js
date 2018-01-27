import { BEGIN_GAME } from '../actions/types';

const INITIAL_STATE = {
  player: '',

};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case BEGIN_GAME:
      return { ...state, ...INITIAL_STATE, player: action.payload };
    default:
      return state;
  }
};
