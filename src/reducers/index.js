import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import GameReducer from './GameReducer';

export default combineReducers({
  auth: AuthReducer,
  game: GameReducer
});
