import * as types from '../types/types';

const initialState = {
  leagues: [],
  activeLeague: {},
  leagueCreated: false,
  isFetching: false,
};

export default function leagueReducer(state = initialState, action) {
  switch (action.type) {
      case types.LEAGUES_RECIEVED: {
        return {
          leagues: action.payload,
          leagueCreated: false,
          isFetching: false,
        };
      }
      case types.LEAGUE_FETCHING: {
        return {
          isFetching: action.payload,
          leagues: state.leagues,
          leagueCreated: false,
          activeLeague: {},
        }
      }
      case types.LEAGUE_RECIEVED: {
        return {
          activeLeague: action.payload,
          leagueCreated: false,
          leagues: state.leagues,
          isFetching: false,
        }
      }
      case types.LEAGUE_CREATED: {
        return {
          // ...state,
          activeLeague: action.payload,
          leagueCreated: true,
          leagues: state.leagues,
        }
      }
      default: {
        return state;
      }
  }
}
