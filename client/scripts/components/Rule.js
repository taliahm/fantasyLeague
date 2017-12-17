import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateLeague } from '../operations/league-operations.js';

class Rule extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      ruleName: '',
      points: 0,
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
    const rule = Object.assign({}, this.state);
    delete rule.saved;
    // this is where we will handle save with the api
    actions.updateLeague(rule, activeLeague._id, 'rules');
    this.setState({
      saved: true,
    });
  }
  render() {
    const { saved } = this.state;
    return (
      <div className="createRule">
       <div>
         {saved ? null
         :
          <div className="createRule__form">
            <label htmlFor="ruleName">Describe Your Rule!</label>
            <input value={this.state.name} type="text" id="ruleName" name="ruleName" onChange={this.handleChange} />
            <label htmlFor="rulePoint">Number of Points!</label>
            <input value={this.state.points} type="number" id="rulePoint" name="points" onChange={this.handleChange} />
            <button onClick={this.handleSave}>Save</button>
          </div>
         }
      </div>
      <div>

      </div>
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
    }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rule);