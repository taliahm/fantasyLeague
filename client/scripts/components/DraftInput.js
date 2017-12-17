import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


export default class DraftInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.active,
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    e.persist();
    const { checked } = this.state;
    if(e.target.value === 'add') {
      this.setState({
        checked: !checked,
      });
      this.props.handleChange(e)
    } else {
      this.setState({
        checked: !checked,
      });
      this.props.handleRemove(e);
    }
  }
  render() {
    const { personId } = this.props;
    return (
      <div className="draftCheckbox">
        <div className="draftCheckbox__block">
          <label htmlFor={`drafted-${personId}`}>Draft To Team</label>
          <input id={`drafted-${personId}`} type="radio" onChange={this.handleChange} name={personId} value="add" checked={this.state.checked}/>
        </div>
        <div className="draftCheckbox__block">
          <label htmlFor={`removed-${personId}`}>Remove Team</label>
          <input id={`removed-${personId}`} type="radio" onChange={this.handleChange} name={personId} value="remove" checked={!this.state.checked}/>
        </div>
      </div>
    )
  }
}