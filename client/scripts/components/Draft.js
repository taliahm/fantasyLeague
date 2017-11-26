import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router';
import PeopleWithRules from './PeopleWithRules.js';
import { getSingleLeague } from '../operations/league-operations';
import { createEpisode, updateEpisode } from '../operations/episode-operations';

export class Draft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    console.log(e.target.checked)
    this.setState({
      [e.target.name] : e.target.checked,
    })
  }
  render() {
    const { activeLeague } = this.props;
    const {rules, people } = activeLeague;
    return (
      <div className="episode"> 
        {people.map((person, i) => {
          console.log(person)
          const id = person._id;
          return (
            <div>
              {person.personName}
              <input type="checkbox" onChange={this.handleChange} name={person._id} checked={this.state.id}/>
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
      createEpisode,
      updateEpisode,
     }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Draft);