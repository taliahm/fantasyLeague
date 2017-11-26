import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Participant from './Participant.js';
import Rule from './Rule.js';

import { addPerson } from '../operations/league-operations.js';

// TO DO: ADD image handling
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
    const peopleArray = [];
    const rulesArray = [];
    for (let i = 0; i < people; i++) {
      peopleArray.push(<Participant />);
    }
    for (let i = 0; i < rules; i++) {
      rulesArray.push(<Rule />);
    }
    return (
      <div>
       <h4>Your People! 🤓</h4>
       <div>
         <ul>
            <li>
              <button onClick={(e) => this.handleAdd(e, 'people')}>Add A Person!</button>
            </li>
            {peopleArray}
          <li>
          </li>
         </ul>
      </div>
      <div>
      <h4>Add Your Rules!</h4>
      {rulesArray}
      <button onClick={(e) => this.handleAdd(e, 'rules')}>Add A Rule!</button>
      </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    leagues: state.data.leagues,
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