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
        <h4>How many times did <span className="peopleName">{person.personName}</span> do these things?</h4>
        {rules.map((rule, i) => {
          const ruleId = rule._id; 
          const personId = person._id;
          return (
            <div className="peopleWithRules__ruleBlock">
              <p className="peopleWithRules__ruleTitle">{rule.ruleName}:</p>
              <div className="peopleWithRules__formBlock">
                <label htmlFor={i}>Number of instances</label>
                <input
                  type="number"
                  id={i}
                  name={ruleId}
                  value={value}
                  onChange={(e) => handleChange(e, person)}
                /> <span> x {rule.points} points</span>
              </div>
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