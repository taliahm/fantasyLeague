import * as types from '../types/types';

const initialState = {
  leagues: [],
  activeLeague: {},
  activeLeaguePeople: [],
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
          activeLeague: state.activeLeague,
          activeLeaguePeople: state.activeLeaguePeople,
        };
      }
      case types.LEAGUE_FETCHING: {
        return {
          isFetching: action.payload,
          leagues: state.leagues,
          leagueCreated: false,
          activeLeague: state.activeLeague,
          activeLeaguePeople: state.activeLeaguePeople,
        }
      }
      case types.LEAGUE_RECIEVED: {
        return {
          activeLeague: action.payload,
          leagueCreated: false,
          leagues: state.leagues,
          isFetching: false,
          activeLeaguePeople: state.activeLeaguePeople,
        }
      }
      case types.LEAGUE_CREATED: {
        const newState = Object.assign({}, state, { activeLeague: action.payload }, { leagueCreated: true});
        return newState;
          // ...state,
          // activeLeague: action.payload,
          // leagueCreated: true,
          // leagues: state.leagues,
          // activeLeaguePeople: state.activeLeaguePeople,
      }
      case types.PEOPLE_RECIEVED: {
        return {
          ...state,
          leaguesCreated: true,
          isFetching: false,
          // leagues: state.leagues,
          // activeLeague: state.activeLeague,
          activeLeaguePeople: action.payload,
        }
      }
      default: {
        return state;
      }
  }
}
