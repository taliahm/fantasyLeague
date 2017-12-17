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
        <div className="login__half--green">
          <h2 className="login__title">Sign Up</h2>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            className="login__input--green"
            name="name"
            onChange={this.handleChange}
          />
          <label htmlFor="email">Email</label>
          <input className="login__input--green" id="email" name="email" type="email" onChange={this.handleChange} />
          <label htmlFor="password">Password</label>
          <input className="login__input--green" id="password" name="password" type="password" onChange={this.handleChange} />
          <button
            className="login__button--green"
            onClick={this.handleSubmit}
          >
            Let Me In!
          </button>
        </div>
        <div className="login__half--grey">
          <h2 className="login__title">Sign In</h2>
          <label htmlFor="email">Email</label>
          <input className="login__input--grey" id="email" name="email" type="email" onChange={this.handleChange} />
          <label htmlFor="password">Password</label>
          <input className="login__input--grey" id="password" name="password" type="password" onChange={this.handleChange} />
          <button
            onClick={this.handleSignIn}
            className="login__button--grey"
          >
            Welcome Back!
          </button>
        </div>
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