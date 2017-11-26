import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router';
import Results from './Results.js';

import createLeagues, { getSingleLeague } from '../operations/league-operations';
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
  }
  renderPeople() {
    if (this.props.activeLeague.length === 0) return;
    const { people } = this.props.activeLeague[0];
    if (!people || !people.length) return;
    return people.map((person) => {
      return (
        <div className="personBlock">
          <p>{person.personName}</p>
          <div className="personBlock__img">
            <img src="../../../assets/person.png" />
          </div>
          <p>{person.description || 'no description provided'}</p>
        </div>
      )
    })
  }
  renderRules() {
    if (this.props.activeLeague === 0) return;
    const { rules } = this.props.activeLeague[0];
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
      console.log(episode)
      const rules = episode.person;
      return (
        <div>
          <span>{episode.name}</span>
          <Results data={episode}/>
        </div>
      )
    })
  }
  render() {
    const { activeLeague, isFetching } = this.props;
    // eventually add a way to view created episodes
    return (
      <div className="league"> 
        {isFetching ? <p>loading... </p> :
        <div>
          <div className="league__centerTitle">
            <div className="league__title">
              <h2>{activeLeague[0].name}</h2>
              <h1>League</h1>
            </div>
          </div>
          <div className="league__details">
          <div className="league__people">
            <h3>Contestants in {activeLeague[0].name}</h3>
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
  const leagues = state.data.leagues;
  const activeLeague = leagues.filter(league => {
    return league._id === id;
  });
  return {
    leagues: state.data.leagues,
    episodes: state.episodes.data,
    id,
    activeLeague,
    isFetching: state.data.isFetching,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ 
      createLeagues,
      getSingleLeague,
      getEpisodes
     }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(League);