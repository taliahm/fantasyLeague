import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router';

// import createLeagues, { getLeagues, getSingleLeague } from '../operations/league-operations';
import { signup, login } from '../operations/user-operations';
export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.signup(this.state);
  }
  handleSignIn(e) {
    e.preventDefault();
    this.props.actions.login(this.state);
  }
  render() {
    return (
      <div className="login">
        <h2>Sign Up</h2>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" onChange={this.handleChange} />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" onChange={this.handleChange} />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>Sign Up For this mad amazing service</button>
        <h2>Sign In</h2>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" onChange={this.handleChange} />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" onChange={this.handleChange} />
        <button onClick={this.handleSignIn}>Sign in!</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    leagues: state.data.leagues,
    user: state.user.currentUser,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ 
      signup,
      login,
    }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);