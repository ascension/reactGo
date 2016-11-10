import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { fetchVoteData, fetchGameData } from './fetch-data';
import App from 'containers/App';
import Vote from 'containers/Vote';
import Games from 'containers/Games';
// import Game from 'containers/Game';
import About from 'containers/About';
import LoginOrRegister from 'containers/LoginOrRegister';
import Dashboard from 'containers/Dashboard';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Vote} fetchData={fetchVoteData} />
      <Route path="games" component={Games} fetchData={fetchGameData} onEnter={requireAuth}/>
      <Route path="login" component={LoginOrRegister} onEnter={redirectAuth} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} >
        <Route path="about" component={About} onEnter={redirectAuth} />
      </Route>
    </Route>
  );
};

//       <Route path="games/:gameId" component={Game} fetchData={fetchGameData} />

