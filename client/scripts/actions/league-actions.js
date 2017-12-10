
import * as types from '../types/types';

// get all the leagues
export function leaguesRecieved(data) {
  return {
    type: types.LEAGUES_RECIEVED,
    payload: data,
  }
}
// get one of the leagues
export function leagueRecieved(data) {
  return {
    type: types.LEAGUE_RECIEVED,
    payload: data,
  }
}

export function leagueCreated(data) {
  return {
    type: types.LEAGUE_CREATED,
    payload: data,
  }
}

export function fetching(bool) {
  return {
    type: types.LEAGUE_FETCHING,
    payload: bool,
  }
}

export function peopleRecieved(data) {
  return {
    type: types.PEOPLE_RECIEVED,
    payload: data,
  }
}