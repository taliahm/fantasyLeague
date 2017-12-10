import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router';
import PeopleWithRules from './PeopleWithRules.js';
// import { getSingleLeague } from '../operations/league-operations';
// import { createEpisode, updateEpisode } from '../operations/episode-operations';
import { saveDraft } from '../operations/draft-operations';

import RenderPerson from './RenderPeopleWithPoints';

export class Draft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  handleChange(e) {
    console.log(e.target.checked)
    this.setState({
      [e.target.name] : e.target.checked,
    })
  }
  handleSave(e) {
    e.preventDefault();
    const leagueId = this.props.activeLeague._id;
    let draftSelection = Object.assign({}, this.state);
    const toSave = [];
    for (let item in draftSelection) {
      console.log('are you running?');
      if (item) {
        toSave.push(item);
      }
    }
    console.log(toSave, 'this is what we are saving');
    this.props.actions.saveDraft(toSave, leagueId);
  }
  render() {
    const { activeLeaguePeople } = this.props;
    return (
      <div className="episode"> 
        {activeLeaguePeople.map((person, i) => {
          console.log(person)
          const id = person._id;
          return (
            <div>
              <RenderPerson person={person} />
              <input type="checkbox" onChange={this.handleChange} name={person._id} checked={this.state.id}/>
            </div>
          )
        })}
        <button onClick={this.handleSave}>Save My Selection!</button>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    leagues: state.data.leagues,
    activeLeague: state.data.activeLeague,
    activeLeaguePeople: state.data.activeLeaguePeople,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ 
      saveDraft
     }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Draft);