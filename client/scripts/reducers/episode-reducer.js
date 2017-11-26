import * as types from '../types/types';

const initialState = {
  data: [],
  activeEpisode: {},
};

export default function(state = initialState, action) {
  switch(action.type){
      case types.EPISODE_RECIEVED: {
        return {
          activeEpisode: action.payload,
          data: state.data,
        }
      }
      case types.EPISODES_RECIEVED: {
        return {
          activeEpisode: state.activeEpisode,
          data: action.payload,
        }
      }
      default:
          return state;
  }
}
