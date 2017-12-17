import * as types from '../types/types';

export function userRecieved(user) {
  return {
    type: types.USER_RECIEVED,
    payload: user,
  }
}