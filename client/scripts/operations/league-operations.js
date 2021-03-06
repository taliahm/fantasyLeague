import { personAddedToLeague, ruleAddedToLeague, leaguesRecieved, fetching, leagueRecieved, leagueCreated, peopleRecieved  } from '../actions/league-actions';
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
      // dispatch(push(`league/${id}`))
    })
    .catch(err => console.log(err, 'this is an error'));
  }
}

// get people in one of the leagues
export function getPeopleInLeague(id) {
  return (dispatch) => {
    dispatch(fetching(true))
    return fetch(`/api/person/${id}`, { method: 'GET' })
    .then(res => res.json())
    .then(json => {
      dispatch(peopleRecieved(json))
    })
    .catch((err) => console.log(err))
  }
}

//save a league
export function saveLeague(league) {
  return (dispatch) => {
    return fetch('/api/league', { 
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

//add rule to league
export function updateLeague(person, id, key) {
  return (dispatch) => {
    return fetch(`api/league/${id}/${key}`, {
      method: 'PUT',
      body: JSON.stringify(person),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      dispatch(ruleAddedToLeague(json.rules));
    })
    .catch(err => console.log(err))
  }
}

// add a person to a league
export function addPerson(person) {
  return (dispatch) => {
    return fetch(`api/person/`, {
      method: 'POST',
      body: JSON.stringify(person),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => {
      dispatch(personAddedToLeague(json));
    })
    .catch(err => console.log(err))
  }
}

export function joinLeague(leagueId) {
  console.log('trying to joing league');
  return (dispatch) => {
    return fetch(`/api/draft/${leagueId}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
    .then(res => res.json())
    .then(json => {
      // push to new route
      dispatch(push(`/draft/league`));
    })
    .catch(err => console.log(err))
  }
}