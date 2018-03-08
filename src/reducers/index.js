import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import JumbleReducer from './JumbleReducer';
import ScrambleReducer from './ScrambleReducer';
import LevelsReducer from './LevelsReducer';
import ScoreReducer from './ScoreReducer';
import ItemsReducer from './ItemsReducer';
import LadderReducer from './LadderReducer';

export default combineReducers({
  auth: AuthReducer,
  jumble: JumbleReducer,
  scramble: ScrambleReducer,
  levels: LevelsReducer,
  score: ScoreReducer,
  items: ItemsReducer,
  ladder: LadderReducer
});
