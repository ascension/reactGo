import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { fetchGameData, fetchGame } from './fetch-data';
import App from 'containers/App';
import Games from 'containers/Games';
import Game from 'containers/GameContainer';
// import Game from 'containers/Game';
import About from 'containers/About';
import LoginOrRegister from 'containers/LoginOrRegister';
import Account from 'containers/Account';
import Withdraw from 'containers/Withdraw';

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
      <IndexRoute component={Games} fetchData={fetchGameData}/>
      <Route path="games" component={Games} fetchData={fetchGameData}/>
      <Route path="game/:id" component={Game} fetchData={fetchGame} onEnter={requireAuth}/>
      <Route path="login" component={LoginOrRegister} onEnter={redirectAuth} />
      <Route path="account" component={Account} onEnter={requireAuth}>
        <Route path="withdraw" component={Withdraw} onEnter={redirectAuth} />
      </Route>
    </Route>
  );
};