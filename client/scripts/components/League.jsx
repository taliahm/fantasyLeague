import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router';
import Results from './Results.js';
import User from './User.js';
import RenderPerson from './RenderPeopleWithPoints.js';

import createLeagues, { getSingleLeague, joinLeague, getPeopleInLeague } from '../operations/league-operations';
import { getEpisodes } from '../operations/episode-operations';


export class League extends React.Component {
  constructor(props) {
    super(props);
    this.renderPeople = this.renderPeople.bind(this);
    this.renderRules = this.renderRules.bind(this);
    this.renderEpisodes = this.renderEpisodes.bind(this);
  }
  componentWillMount() {
    this.props.actions.getEpisodes(this.props.params.id);
    this.props.actions.getSingleLeague(this.props.params.id);
    this.props.actions.getPeopleInLeague(this.props.params.id);
  }
  renderPeople(array) {
    this.getPeopleData();
    const { activeLeaguePeople } = this.props;
    if (!activeLeaguePeople.length) return;
    return activeLeaguePeople.map((person) => {
      return (
        <div className="league__personSquare">
          <RenderPerson person={person} />
        </div>
      )
    })
  }
  renderUsers() {
    const { activeLeague, currentUser } = this.props;
    const normalizedPeople = this.getPeopleData();
    const users = activeLeague.users;
    return users.map((item) => {
      if(item._id === currentUser._id) return;
      return (
      <div className="league__userInfo">
        <h4>{item.name}</h4>
        <User data={item} leagueId={activeLeague._id} peopleDate={normalizedPeople} />
      </div>
      )
    })
  }
  renderRules() {
    if (!this.props.activeLeague) return;
    const { rules } = this.props.activeLeague;
    if (!rules|| !rules.length) return;
    return rules.map((rule) => {
      return (
        <div>
          {rule.ruleName} {`${rule.points} points` || 'no points provided'}
        </div>
      )
    })
  }
  renderEpisodes() {
    const { episodes } = this.props;
    // if (!episodes.length) return;
    return episodes.map((episode) => {
      const rules = episode.person;
      return (
        <div>
          <span>{episode.name}</span>
          {/* <Results data={episode}/> */}
        </div>
      )
    })
  }
  getPeopleData() {
    const { activeLeaguePeople } = this.props;
     return activeLeaguePeople.reduce((prev, item) => {
      return {
        ...prev,
        [item._id]: {
          ...item,
        }
      }
    }, {});
  }
  render() {
    const { activeLeague, isFetched, activeLeaguePeople, currentUser, joinedLeagues, inLeague, hasTeam } = this.props;
    const normalizedPeople = this.getPeopleData();
    // eventually add a way to view created episodes
    return (
      <div className="league"> 
        {!isFetched ? <p>loading... </p> :
        <div>
          <div className="league__centerTitle">
            <div className="league__title">
              <h2>{activeLeague.name}</h2>
              <h1>League</h1>
            </div>
          </div>
          <div className="league__details">
          {inLeague.length === 0 ? null :
          <div className="league__people">
            <h3> Your Info! </h3>
            <User data={currentUser} leagueId={activeLeague._id} peopleDate={normalizedPeople} isMe/>
          </div>
          }
          <div className="league__people">
            <h3>Contestants in {activeLeague.name}</h3>
            <div className="holdPeople">
              {this.renderPeople()}
            </div>
          </div>
          <div className="league__users">
            <h3>Other Users In This League.</h3>
            <div className="league__holdUsers">
              {this.renderUsers()}
            </div>
          </div>
        </div>
        <section className="league__infoBlock">
          <h3> League Information </h3>
          <div className="league__holdInfoBlock">
            <div className="league__rules">
              <h3>Rules</h3>
              {this.renderRules()}
            </div>
            <div className="league__episodes">
              <h3>Episodes</h3>
              <Link to="/episode/create">Add Episode</Link>
              {this.renderEpisodes()}
            </div>
          </div>
        </section>
        <div className="league__formControls">
          <div>
          {inLeague.length === 0 ?
          <button className="league__draftButton" onClick={() => this.props.actions.joinLeague(activeLeague._id)}>Join League</button>
          : <Link className="league__draftButton" to="/draft/league">Draft Peeps.</Link>
          }
          </div>
          <div>
            <Link className="league__draftButton" to="/">Go Home.</Link>
          </div>
        </div>
        </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.params.id;
  const { leagues, activeLeaguePeople } = state.data;

  const activeLeague = leagues.filter(league => {
    return league._id === id;
  });

  const joinedLeagues = state.user.currentUser.leagues;
  const { teams } = state.user.currentUser;

  const inLeague = joinedLeagues.filter(league => {
    return league === id;
  });

  const hasTeam = teams.filter(team => {
    return team.leagueId === id;
  })
  const isFetched = activeLeague && activeLeaguePeople.length > 0 ? true : false;
  const userLeagues = state.user.currentUser.leagues;

  return {
    leagues,
    episodes: state.episodes.data,
    id,
    activeLeague: activeLeague[0] || state.activeLeague,
    activeLeaguePeople,
    isFetched,
    joinedLeagues: state.user.currentUser.leagues,
    inLeague,
    hasTeam: hasTeam[0],
    currentUser: state.user.currentUser,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ 
      createLeagues,
      getSingleLeague,
      getEpisodes,
      getPeopleInLeague,
      joinLeague,
     }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(League);