import { push } from 'react-router-redux';
import { userRecieved } from '../actions/user-actions';
export function saveDraft(toSave, leagueId) {
  const body = {
    people: toSave,
    leagueId,
  }
  console.log(body);
  return (dispatch) => {
    return fetch('/api/draft', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
    .then(res => res.json())
    .then((json) => {
      // this doesn't work.
      dispatch(userRecieved(json))
      dispatch(push(`league/${leagueId}`));
    })
  }
}
