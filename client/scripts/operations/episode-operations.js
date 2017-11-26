import { episodeRecieved, episodesRecieved } from '../actions/episode-actions';


export function createEpisode(episode, leagueId, episodeName) {
  const episodeToSend = Object.assign({}, {people: episode }, { league: leagueId }, { name: episodeName })
  return (dispatch) => {
    return fetch('/api/episode', {
       method: 'POST',
       body: JSON.stringify(episodeToSend),
       headers: { 'Content-Type': 'application/json' },
      })
    .then(res => res.json())
    .then((json) => {
      dispatch(episodeRecieved(json));
    })
    .catch(err => console.log(err));
  }
}

export function updateEpisode(episode, id, leagueId, episodeName) {
  const episodeToSend = Object.assign({}, {people: episode }, { league: leagueId }, { name: episodeName })
  return (dispatch) => {
    return fetch(`/api/episode/${id}`, {
      method: 'PUT',
      body: JSON.stringify(episodeToSend),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then((json) => {
    })
  }
}

export function getEpisodes(leagueId) {
  return (dispatch) => {
    return fetch(`/api/episode/${leagueId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then((json) => {
      dispatch(episodesRecieved(json));
    })
    .catch(err => console.log(err));
  }
}