import React from 'react';

const RenderPerson = ({ person }) => {
  console.log(person);
  let points = 0;
  const episodes = person.episodes.map((episode) => {
    episode.rules.map((rule) => {
      points += (Number(rule.instances) * Number(rule.rule.points));
    })
  })
  console.log(points);
  return (
    <div className="personBlock">
      <p>{person.personName}</p>
      <div className="personBlock__img">
        <img src="../../../assets/person.png" />
      </div>
      <p>{person.description || 'no description provided'}</p>
      <p> Current Points! {points}</p>
    </div>
  )
}

export default RenderPerson;