import * as types from '../types/types';

export function userRecieved(user) {
  console.log(user, 'in action');
  return {
    type: types.USER_RECIEVED,
    payload: user,
  }
}