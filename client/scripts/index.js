import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux'
import {
  Router,
  Route,
  browserHistory,
} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux';

// import App from './components/app';
import Home from './components/Home.js';
import League from './components/League.jsx';
import Episode from './components/Episode.js';
import CreateLeague from './components/CreateLeague.js';
import CreatePeople from './components/CreatePeople.js';
import Draft from './components/Draft.js';

import { getLeagues } from './operations/league-operations';

const composeEnhancers =
typeof window === 'object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  }) : compose;

const customMiddleWare = store => next => action => {
  const state = store.getState();
  if(!state.data.leagues.length) {
    store.dispatch(getLeagues());
  }
  next(action);
}

const enhancer = composeEnhancers(
applyMiddleware(
  thunk,
  customMiddleWare,
  routerMiddleware(browserHistory),
),
);
const store = createStore(reducers, enhancer);
const history = syncHistoryWithStore(browserHistory, store);
render(
<Provider store={store}>
  <Router history={history}>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/create" component={CreateLeague} />
        <Route exact path="/create/people" component={CreatePeople} />
        <Route path="/league/:id" component={League} />
        <Route path="/episode/create" component={Episode} />
        <Route path="/draft/league" component={Draft} />
      </div>
    </Router>
</Provider>, document.getElementById('app'));

