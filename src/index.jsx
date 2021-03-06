// This file is the app's entry point file.
// Set up the store here because it's the entry point.
// Wrap top level app component inside a react-redux Provider component to connect component tree to Redux store.
// Put Provider in around Router componenet so Provider is ancestor to all application components.
// Update routing table to use VotingContainer instead of Voting. That gets data from Redux store into UI.

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer.jsx';
import App from './components/App.jsx';
import { VotingContainer } from './components/Voting';
import Voting from './components/Voting.jsx';
import Results from './components/Results.jsx';

// Create store, pass it the reducer imported in.
const store = createStore(reducer);

// Temporarily kick the store off with some state by dispatching SET_STATE - until real data gets in.
store.dispatch({
  type: 'SET_STATE',
  state: {
    vote: {
      pair: ['Sunshine', '28 Days Later'],
      tally: {Sunshine: 2}  
    }
  }
});
const routes = <Route component={App}>
  <Route path="/results" component={Results} />
  <Route path="/" component={VotingContainer} />
</Route>;

// Supply the Router component from react-router package as root component of application, instaed of
// the Voting component.
// Instruct it to use the #hash based history mechanism (as opposed to the HTML5 history API).
// We plug our route table into it by passing it in as a child component.
// Now the app still renders the Voting component but now with React Router baked in, so it's
// eaiser to add more routes.

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
