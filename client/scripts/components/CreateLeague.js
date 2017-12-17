import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import { saveLeague } from '../operations/league-operations.js';

import CreatePeople from './CreatePeople.js';

class CreateLeague extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      numOfEpisodes: 0,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  handleSave() {
    // this is where we will handle save with the api
    // add activeLeague to the store
    const league = Object.assign({}, this.state);
    this.props.actions.saveLeague(league);
  }
  handleChange(e) {
    this.setState({
      [e.target.name] : e.target.value,
    });
  }
  render() {
    const { leagueCreated, activeLeague } = this.props;
    return (
      <div className="create">
        <div className="create__hold">
        <h4 className="create__title">Create a League</h4>
        {leagueCreated ?
          <div className="create__description">
            <p>You are adding to: {activeLeague.name}</p>
          </div>
        :
        <div className="create__form">
          <label
            htmlFor="leagueName"
            className="create__label"
          >
            Name your league!
          </label>
          <input
            className="create__input"
            type="text"
            id="leagueName"
            name="name"
            onChange={this.handleChange}
          />
          <div className="create__formControls">
            <button
              onClick={this.handleSave}
              className="create__saveButton"
            >
              Save
            </button>
            <Link
              to="/"
              className="create__cancel"
            >
              Cancel
            </Link>
          </div>
        </div>
        }
        {leagueCreated ? <CreatePeople /> : null }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    leagues: state.data.leagues,
    leagueCreated: state.data.leagueCreated,
    activeLeague: state.data.activeLeague
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ 
      saveLeague
    }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLeague);