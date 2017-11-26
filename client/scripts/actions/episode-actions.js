import * as types from '../types/types';

export function episodeRecieved(data) {
  return {
    type: types.EPISODE_RECIEVED,
    payload: data,
  }
}

export function episodesRecieved(data) {
  return {
    type: types.EPISODES_RECIEVED,
    payload: data,
  }
}