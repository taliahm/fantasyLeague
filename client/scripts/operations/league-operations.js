import { leaguesRecieved, fetching, leagueRecieved, leagueCreated  } from '../actions/league-actions';
import { push } from 'react-router-redux';

export default function createLeagues() {
  return (dispatch) => {
    return fetch('/api/create/league', { method: 'POST'})
    .then(res => res.json())
    .then((json) => {
      const data = json;
      dispatch(leaguesRecieved(data))
    })
    .catch(err => console.log(err));
  }
}
// get all the leagues
export function getLeagues() {
  return (dispatch) => {
    return fetch('/api/leagues', { method: 'GET'})
    .then(res => {
      return res.json();
    })
    .then((json) => {
      const data = json;
      dispatch(leaguesRecieved(data))
    })
    .catch(err => console.log(err, 'this is an error'));
  }
}
// get one of the leagues
export function getSingleLeague(id) {
  return (dispatch) => {
    dispatch(fetching(true))
    return fetch(`/api/league/${id}`, { method: 'GET'})
    .then(res => {
      return res.json();
    })
    .then((json) => {
      const data = json;
      dispatch(leagueRecieved(data))
      dispatch(push(`league/${id}`))
    })
    .catch(err => console.log(err, 'this is an error'));
  }
}

//save a league
export function saveLeague(league) {
  return (dispatch) => {
    return fetch('api/league', { 
      method: 'POST',
      body: JSON.stringify(league),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => {
      dispatch(leagueCreated(json));
    })
  }
}

//add person to league
export function updateLeague(person, id, key) {
  return (dispatch) => {
    return fetch(`api/league/${id}/${key}`, {
      method: 'PUT',
      body: JSON.stringify(person),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => {
    })
    .catch(err => console.log(err))
  }
}
