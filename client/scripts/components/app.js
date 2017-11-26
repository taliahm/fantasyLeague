import React from 'react';
import {
  Router,
  Route,
  browserHistory,
} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Home from './Home.js';
import League from './League.jsx';
import CreateLeague from './CreateLeague.js';
import CreateParticipants from './CreatePeople.js';
import Draft from './Draft.js';

import { getLeagues } from '../operations/league-operations';


class App extends React.Component {
  componentWillMount() {
    this.props.actions.getLeagues();
  }
  render() {
    const history = syncHistoryWithStore(browserHistory, store);
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/people" component={CreateParticipants} />
          <Route path="/create" component={CreateLeague} />
          <Route path="/draft/league" component={Draft} />
          <Route path="/league/:id" component={League} />
        </div>
      </Router>
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
      getLeagues
    }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);