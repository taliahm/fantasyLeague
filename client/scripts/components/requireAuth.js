import React from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';

const AuthRequired = ({component: Component, isAuthenticated, ...rest }) => {
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
  return {
    isAuthenticated: state.user.currentUser,
  }
}

export default connect(mapStateToProps)(AuthRequired);
