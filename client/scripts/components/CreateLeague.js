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
      <div>
       <h4>Create a League 😱🤞🏻</h4>
       {leagueCreated ?
        <div>
          You are adding to:
          {activeLeague.name}
        </div>
       :
       <div>
         <ul>
           <li>
            <label htmlFor="leagueName">League Name!</label>
            <input type="text" id="leagueName" name="name" onChange={this.handleChange} />
          </li>
          <li>
            <button onClick={this.handleSave}>Save</button>
          </li>
         </ul>
      </div>
       }
      {leagueCreated ? <CreatePeople /> : null }
      <Link to="/">Done Creating League!</Link>
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