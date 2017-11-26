import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router';

import createLeagues, { getLeagues, getSingleLeague } from '../operations/league-operations';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount() {
    this.props.actions.getLeagues();
  }
  handleClick(id) {
    actions.getSingleLeague(id);
    // this.props.router.push(`league/${id}`)
  }
  render() {
    return (
      <div className="main"> 
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
    )
  }
}

function mapStateToProps(state) {
  return {
    leagues: state.data.leagues,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ 
      createLeagues,
      getLeagues,
      getSingleLeague
    }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);