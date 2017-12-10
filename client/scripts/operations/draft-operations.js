import { push } from 'react-router-redux';

export function saveDraft(people, leagueId) {
  const body = {
    people,
  }
  return (dispatch) => {
    return fetch('/api/draft', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
    .then(res => res.json())
    .then((json) => {
      console.log(json, 'this is JSON');
      // this doesn't work.
      dispatch(push(`league/${leagueId}`));
    })
  }
}
