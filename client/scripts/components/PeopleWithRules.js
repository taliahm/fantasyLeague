import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router';

import { getSingleLeague } from '../operations/league-operations';

export class PeopleWithRules extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { rules, person, league, id, value, handleChange } = this.props;
    return (
      <div className="peopleWithRules"> 
        {person.personName}
        {rules.map((rule, i) => {
          const ruleId = rule._id; 
          const personId = person._id;
          return (
            <div>
              <span>{rule.ruleName}</span>
              <span>Number of Points: {rule.points}</span>
              <label htmlFor={i}>How many times did this happen?</label>
              <input
                id={i}
                name={ruleId}
                value={value}
                onChange={(e) => handleChange(e, person)}
              />
            </div>
          )
        })}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    leagues: state.data.leagues,
    activeLeague: state.data.activeLeague,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ 
      getSingleLeague,
     }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleWithRules);