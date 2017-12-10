import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router';
import Login from './Login.js';
import { checkUserStatus } from '../operations/user-operations';
import createLeagues, { getLeagues, getSingleLeague } from '../operations/league-operations';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount() {
    this.props.actions.checkUserStatus();
  }
  handleClick(id) {
    actions.getSingleLeague(id);
  }
  render() {
    return (
      <div className="main">
        {this.props.user ?
        <div> 
        <h1>In a League of Your Own</h1>
        <div className="main__holdSections">
          <div className="main__half--green">
            <h4> Create your own Fantasy League! </h4>
             <Link className="main__createButton" to="/create">Begin the Process.</Link>
          </div>
          <div className="main__half--grey">
            <h4>Or join an existing league!</h4>
            {this.props.leagues.map(item => {
              return (
                <div
                  key={item._id}
                  className="main__holdLink"
                >
                  <Link className="main__leagueLink" to={`league/${item._id}`}>
                    <h4>{item.name}</h4>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
        </div>
        : <Login /> }
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
      createLeagues,
      getLeagues,
      getSingleLeague,
      checkUserStatus,
    }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);