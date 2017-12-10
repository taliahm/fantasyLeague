import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router';
import Results from './Results.js';
import RenderPerson from './RenderPeopleWithPoints.js';

import createLeagues, { getSingleLeague, getPeopleInLeague } from '../operations/league-operations';
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
  }
  componentDidMount() {
    this.props.actions.getSingleLeague(this.props.params.id);
    this.props.actions.getPeopleInLeague(this.props.params.id);
  }
  renderPeople() {
    const { activeLeaguePeople } = this.props;
    if (!activeLeaguePeople.length) return;
    return activeLeaguePeople.map((person) => {
      return (
        <div className="personBlock">
          <RenderPerson person={person} />
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
          {rule.ruleName}
          {rule.points || 'no points provided'}
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
  render() {
    const { activeLeague, isFetched, activeLeaguePeople } = this.props;
    console.log(activeLeaguePeople.length);
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
          <div className="league__people">
            <h3>Contestants in {activeLeague.name}</h3>
            <div className="holdPeople">
              {this.renderPeople()}
            </div>
          </div>
          <div className="league__episodes">
            <h3>Episodes</h3>
            <Link to="/episode/create">Add Episode</Link>
            {this.renderEpisodes()}
          </div>
          <div className="league__rules">
            <h3>Rules</h3>
            {this.renderRules()}
          </div>
        </div>
        <div>
          <Link to="/draft/league">Draft Your People.</Link>
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
  const isFetched = activeLeague && activeLeaguePeople.length > 0 ? true : false;
  return {
    leagues,
    episodes: state.episodes.data,
    id,
    activeLeague: activeLeague[0] || state.activeLeague,
    activeLeaguePeople,
    isFetched,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ 
      createLeagues,
      getSingleLeague,
      getEpisodes,
      getPeopleInLeague
     }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(League);