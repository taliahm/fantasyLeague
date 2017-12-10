import { userRecieved } from '../actions/user-actions';

export function signup(user) {
  return (dispatch) => {
    return fetch('/api/signup', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    })
    .then((user) => {
      dispatch(userRecieved(user))
    })
    .catch((err) => {
      console.log('sign up error', err);
    })
  }
}

export function login(user) {
  return (dispatch) => {
    return fetch('/api/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    })
    .then((user) => {
      console.log(user, 'success signing in');
      dispatch(userRecieved(user))
    })
  }
}

export function checkUserStatus() {
  return (dispatch) => {
    return fetch('/api/me', {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
    .then((user) => {
      if(user.ok) {
      // console.log(user, 'success signing in');
        dispatch(userRecieved(user))
      }
    })
  }
}