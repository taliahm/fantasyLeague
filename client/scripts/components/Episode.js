import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router';
import PeopleWithRules from './PeopleWithRules.js';
import { getSingleLeague } from '../operations/league-operations';
import { createEpisode, updateEpisode } from '../operations/episode-operations';

export class Episode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPristine: true,
      episodeName: '',
      saved: [],
    }
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleName = this.handleName.bind(this);
  }
  handleChange(e, person) {
    this.setState({
      [e.target.name] : e.target.value,
      person: person
    });
  }
  handleName(e) {
    this.setState({
      [e.target.name] : e.target.value,
    });
  }
  handleSave(e) {
    const { activeLeague, activeEpisode } = this.props;
    const { rules, people } = activeLeague;
    const state = this.state;
    const rulesInstances = Object.assign({}, state);
    delete rulesInstances.person;
    delete rulesInstances.isPristine;
    const { person } = this.state;
    const rulesToSave = rules.map((rule) => {
      const ruleId = rule._id; 
      const ruleInstance = rulesInstances[ruleId];
      return Object.assign({}, 
        { instances: ruleInstance },
        { rule: rule },
      );
    })
    const personToSave = Object.assign({}, person, { rules:rulesToSave });
    const leagueId = activeLeague._id;
    const episodeName = this.state.episodeName;
    // if isPristine, save for the first time.
    // if NOT pristine, then UPDATE
    const initialState = { isPristine: true };
    if (Object.keys(activeEpisode).length === 0) {
      this.props.actions.createEpisode(personToSave, leagueId, episodeName);
    } else {
      const id = activeEpisode._id;
      this.props.actions.updateEpisode(personToSave, id, leagueId, episodeName);
    }
    const savedState = this.state.saved;
    const newSaved = [...savedState, this.state.person._id];
    console.log(newSaved);
    this.setState({
      saved: newSaved,
    })
  }
  render() {
    const { activeLeague, activeLeaguePeople } = this.props;
    const {rules } = activeLeague;
    return (
      <div className="episodeSection"> 
        <div className="episode">
        <h2>Create an Episode.</h2>
        <label>Name Your Episode</label>
        <input name="episodeName" value={this.state.episodeName} onChange={this.handleName}/>
        {activeLeaguePeople.map((person, i) => {
          const isSaved = this.state.saved.filter((item) => {
            return person._id === item;
          });
          if(isSaved.length === 1) {
            return (
              <div> Saved, we are doing mad calculations now! </div>
            )
          }
          return (
            <div className="episode__addBlock">
              <PeopleWithRules
                handleChange={(e, person) => this.handleChange(e, person)}
                id={i}
                person={person}
                rules={rules}
                league={activeLeague._id}
                value={this.state.ruleId}
              />
              <button className="episode__saveButton" onClick={this.handleSave}>Save</button>
            </div>
          )
        })}
        <Link
          to={`/league/${activeLeague._id}`}
          className="episode__backButton"
        >
          Done With This Episode
        </Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    leagues: state.data.leagues,
    episodes: state.episodes.data,
    activeLeague: state.data.activeLeague,
    activeEpisode: state.episodes.activeEpisode || null,
    activeLeaguePeople: state.data.activeLeaguePeople || [],
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

export default connect(mapStateToProps, mapDispatchToProps)(Episode);