import { combineReducers } from 'redux';
import episodeReducer from './episode-reducer';
import leagueReducer from './league-reducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  data: leagueReducer,
  episodes: episodeReducer,
  routing: routerReducer,
});

export default rootReducer;