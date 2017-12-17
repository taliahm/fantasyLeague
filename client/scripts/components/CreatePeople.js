import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import Participant from './Participant.js';
import Rule from './Rule.js';

import { addPerson } from '../operations/league-operations.js';

class CreatePeople extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: 0,
      rules: 0,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }
  shouldComponentUpdate(props, nextProps) {
    if(nextProps.peopleCreated !== props.peopleCreated) {
      return true;
    }
  }
  handleChange(e) {
    this.setState({
      [e.target.name] : e.target.value,
    });
  }
  handleAdd(e, target) {
    const { people, rules } = this.state;
    let mutateNum = target === 'rules' ? rules : people;
    this.setState({
      [target]: mutateNum += 1,
    });
  }
  render() {
    const { rules, people } = this.state;
    const { peopleCreated, rulesCreated } = this.props;
    const peopleArray = [];
    const rulesArray = [];
    for (let i = 0; i < people; i++) {
      peopleArray.push(<Participant/>);
    }
    for (let i = 0; i < rules; i++) {
      rulesArray.push(<Rule />);
    }
    return (
      <div className="createPeopleSection">
        <div className="createPeople">
          <div className="createPeople__half">
            <h4>People In Your League</h4>
            <div>
                <button
                  onClick={(e) => this.handleAdd(e, 'people')}
                  className="createPeople__button"
                >
                  Add A Person!
                </button>
                {peopleArray}
              <ul className="createPeople__list">
                  {peopleCreated.length === 0 ? 'People in your league will appear here.' : peopleCreated.map((item) => {
                    return (
                      <li>
                      {item.personName}
                      </li>
                    )
                  })}
              </ul>
            </div>
          </div>
          <div className="createPeople__half">
            <h4>The Rules of Your League</h4>
            <div>
              <button
                onClick={(e) => this.handleAdd(e, 'rules')}
                className="createPeople__button"
              >
                Add A Rule!
              </button>
              {rulesArray}
              <ul className="createPeople__list">
              {rulesCreated.length === 0 ? 'The rules of your league will appear here' : rulesCreated.map((item) => {
                return (
                  <li>{item.ruleName} {item.points} points</li>
                )
              })}
              </ul>
            </div>
          </div>
        </div>
        <Link
          to="/"
          className="createPeople__link"
        >
          Done Creating League!
        </Link>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    leagues: state.data.leagues,
    peopleCreated: state.data.personCreated,
    rulesCreated: state.data.ruleCreated,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ 
      addPerson,
    }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePeople);