import * as types from '../types/types';

const initialState = {
  currentUser: null,
};

export default function(state = initialState, action) {
  switch(action.type){
      case types.USER_RECIEVED: {
        return {
          ...state,
          currentUser: action.payload,
        }
      }
      default:
          return state;
  }
}
