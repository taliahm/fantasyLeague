import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateLeague, addPerson } from '../operations/league-operations.js';

class Participant extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      personName: '',
      description: '',
      saved: false,
    }
  }
  handleChange(e) {
    this.setState({
      [e.target.name] : e.target.value,
    });
  }
  handleSave() {
    const { activeLeague, actions } = this.props;
    const person = Object.assign({}, this.state, { leagueId: activeLeague._id });
    delete person.saved;
    // this is where we will handle save with the api
    actions.addPerson(person, activeLeague._id);
    this.setState({
      saved: true,
    });
  }
  render() {
    const { saved } = this.state;
    return (
      <div className="createRule">
        {saved ? null
        :
        <div className="createRule__form">
          <label htmlFor="name">Name Person!</label>
          <input type="text" id="name" name="personName" onChange={this.handleChange} />
          <label htmlFor="description">Description!</label>
          <textarea name="description" id="description" cols="30" rows="10" onChange={this.handleChange}></textarea>
          <button onClick={this.handleSave}>Save</button>
        </div>
        }
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeLeague: state.data.activeLeague,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ 
      updateLeague,
      addPerson
    }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Participant);
