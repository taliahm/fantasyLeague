import { userRecieved } from '../actions/user-actions';

export function signup(user) {
  return (dispatch) => {
    return fetch('/api/signup', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(user => user.json() )
    .then((json) => {
      dispatch(userRecieved(json))
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
    .then(user => user.json())
    .then((json) => {
      console.log(json, 'this is what is returned?');
      dispatch(userRecieved(json))
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
    .then(resp => {
      if(resp.status !== 200) {
        dispatch(userRecieved(null));
        throw new Error('You are not logged in');
      }
      return resp.json();
    })
    .then((json) => {
        dispatch(userRecieved(json))
      });
  }
}

export function userLogout() {
  return (dispatch) => {
    return fetch('/api/logout', {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
    .then((resp => {
      if(resp.status !== 200) {
        throw new Error('failure to logout client');
      }
      return resp.json();
    }))
    .then((json) => {
      dispatch(userRecieved(null));
    })
  }
}