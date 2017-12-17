import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router';
import PeopleWithRules from './PeopleWithRules.js';
import DraftInput from './DraftInput.js';
// import { getSingleLeague } from '../operations/league-operations';
// import { createEpisode, updateEpisode } from '../operations/episode-operations';
import { saveDraft } from '../operations/draft-operations';

import RenderPerson from './RenderPeopleWithPoints';

export class Draft extends React.Component {
  constructor(props) {
    super(props);
    const activePeeps = this.props.activeDraft.length === 0 ? [] : this.props.activeDraft[0].people;
    this.state = {
      save: activePeeps,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  handleChange(e) {
    const idToAdd = e.target.name;
    const saveState = this.state.save;
    const addArray = [idToAdd, ...saveState];
    // if idToAdd already exists
    this.setState({
      save: addArray,
    });
  }
  handleRemove(e) {
    const idToRemove = e.target.name;
    const saveState = this.state.save;
    const removeArray = saveState.filter((item) => {
      return item !== idToRemove;
    })
    this.setState({
      save: removeArray,
    });
  }
  handleSave(e) {
    e.preventDefault();
    const leagueId = this.props.activeLeague._id;
    this.props.actions.saveDraft(this.state.save, leagueId);
  }
  checkIfActive(activeDraft, id) {
    let active;
    if (this.props.activeDraft.length === 0) {
      active = false;
      return active;
    } else if (activeDraft[0].people.length === 0) {
      active = false;
      return active;
    } else {
      const map = activeDraft[0].people.filter((item) => {
        return item === id;
      })
      if (map.length === 0) {
        active = false;
        return active;
      } else {
        active = true;
        return active;
      }
    }
  }
  render() {
    const { activeLeaguePeople, activeDraft } = this.props;
    return (
      <div className="draftBlock"> 
        {activeDraft ? 
        <section>
          <h2> Who do you want on your team? </h2>
          <div className="draftBlock__peopleSection">
            {activeLeaguePeople.map((person, i) => {
              const id = person._id;
              const isActive = this.checkIfActive(activeDraft, id);
              return (
                <div className="draftBlock__holdPeople">
                  <RenderPerson person={person} />
                  <DraftInput
                    personId={id}
                    active={isActive}
                    handleChange={(e) => this.handleChange(e)}
                    handleRemove={(e) => this.handleRemove(e)}
                  />
                </div>
              )
            })}
          </div>
          <button className="draftBlock__saveButton" onClick={this.handleSave}>Save My Selection!</button>
        </section>
        :
        <div>
            {activeLeaguePeople.map((person, i) => {
              const id = person._id;
              return (
                <div>
                  <RenderPerson person={person} />
                  <input type="checkbox" onChange={this.handleChange} name={person._id} checked={this.state.id}/>
                </div>
              )
            })}
            <button onClick={this.handleSave}>Save My Selection!</button>
            <Link to={'/'}>Cancel!</Link>
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const activeLeague = state.data.activeLeague;
  const { currentUser } = state.user;
  const activeDraft = currentUser.teams ? currentUser.teams.filter((item) => {
    return item.leagueId === activeLeague._id;
  }) : false;
  return {
    activeDraft,
    leagues: state.data.leagues,
    activeLeague,
    activeLeaguePeople: state.data.activeLeaguePeople,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ 
      saveDraft,
     }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Draft);