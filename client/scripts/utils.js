export function getUserTotalPoints(arrayOfPeople) {
  if(!arrayOfPeople.length) return;
  console.log(arrayOfPeople);
  let points = 0;
  for (let person in arrayOfPeople) {
    const personData = arrayOfPeople[person];
    personData.episodes.map((episode) => {
      console.log(episode, 'this is the episode');
      episode.rules.map((rule) => {
        points += (Number(rule.instances) * Number(rule.rule.points));
      })
    })
  }
  return points;
}

export function getPointsByEpisode(person) {
  let points;
  return person.episodes.map((episode) => {
    episode.rules.map((rule) => {
      points += (Number(rule.instances) * Number(rule.rule.points));
    })
  })
}