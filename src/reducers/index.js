import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import GameReducer from './GameReducer';
import LevelsReducer from './LevelsReducer';

export default combineReducers({
  auth: AuthReducer,
  game: GameReducer,
  levels: LevelsReducer
});
