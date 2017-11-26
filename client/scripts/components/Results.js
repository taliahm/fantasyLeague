import React from 'react';

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.getPointTotal = this.getPointTotal.bind(this);
  }
  getPointTotal(rules) {
    let points = 0;
    const pointTotal = rules.map((rule) => {
      console.log(rule.instances, 'this is a rule');
      points += (Number(rule.instances) * Number(rule.rule.points));
    })
    return points;
  }
  render() {
    const { data } = this.props;
    // eventually add a way to view created episodes
    return (
      <div className="results"> 
        {data.people.map((person) => {
          {/* console.log(person); */}
          return (
            <div>
              {person.personName}
              <p>Episode point total: {this.getPointTotal(person.rules)}</p>
              {person.rules.map((rule) => {
                return (<div>
                  {rule.rule.ruleName} for {rule.rule.points} points {rule.instances} times.
                  </div>)
              })}
            </div>
          )
        })}
      </div>
    )
  }
}
