import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import JumbleReducer from './JumbleReducer';
import LevelsReducer from './LevelsReducer';
import ScoreReducer from './ScoreReducer';

export default combineReducers({
  auth: AuthReducer,
  jumble: JumbleReducer,
  levels: LevelsReducer,
  score: ScoreReducer
});
