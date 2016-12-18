import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { fetchGameData, fetchGame } from './fetch-data';
import App from 'containers/App';
import Games from 'containers/Games';
import Game from 'containers/GameContainer';
import LoginOrRegister from 'containers/LoginOrRegister';
import Account from 'components/Account/Account';
import Withdraw from 'components/Account/Withdraw';
import Dashboard from 'components/Account/Dashboard';
import Deposit from 'components/Account/Deposit';

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
        <IndexRoute component={Dashboard}/>
        <Route path="withdraw" component={Withdraw}/>
        <Route path="deposit" component={Deposit}/>
      </Route>
    </Route>
  );
};