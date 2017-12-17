import React from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';

const AuthRequired = ({component: Component, isAuthenticated, ...rest }) => {
  console.log(isAuthenticated, 'hello??');
  <Route
    {...rest}
    render={props => {
    return isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location }
        }}
      />
    )
    }}
  />
}

const mapStateToProps = (state) => {
  console.log('hellooosss');
  return {
    isAuthenticated: state.user.currentUser,
  }
}

export default connect(mapStateToProps)(AuthRequired);
