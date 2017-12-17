import * as types from '../types/types';

const initialState = {
  leagues: [],
  activeLeague: {},
  activeLeaguePeople: [],
  leagueCreated: false,
  isFetching: false,
  personCreated: [],
  ruleCreated: [],
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
          personCreated: [],
          ruleCreated: [],
        };
      }
      case types.LEAGUE_FETCHING: {
        return {
          isFetching: action.payload,
          leagues: state.leagues,
          leagueCreated: false,
          activeLeague: state.activeLeague,
          activeLeaguePeople: state.activeLeaguePeople,
          personCreated: [],
          ruleCreated: [],
        }
      }
      case types.LEAGUE_RECIEVED: {
        return {
          activeLeague: action.payload,
          leagueCreated: false,
          leagues: state.leagues,
          isFetching: false,
          activeLeaguePeople: state.activeLeaguePeople,
          personCreated: [],
          ruleCreated: [],
        }
      }
      case types.LEAGUE_CREATED: {
        const newState = Object.assign({}, state, { activeLeague: action.payload }, { personCreated: [], ruleCreated: [] }, { leagueCreated: true});
        return newState;
      }
      case types.PEOPLE_RECIEVED: {
        return {
          ...state,
          leaguesCreated: true,
          isFetching: false,
          activeLeaguePeople: action.payload,
          personCreated: [],
          ruleCreated: [],
        }
      }
      case types.LEAGUE_EDITTED: {
        const lastPeople = state.personCreated;
        return {
          ...state,
          personCreated: [action.payload, ...lastPeople],
        }
      }
      case types.RULE_ADDED: {
        return {
          ...state,
          ruleCreated: action.payload,
        }
      }
      default: {
        return state;
      }
  }
}
