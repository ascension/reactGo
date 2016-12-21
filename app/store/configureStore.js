import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';
import promiseMiddleware from 'middlewares/promiseMiddleware';
import createLogger from 'redux-logger';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import { browserHistory } from 'react-router';

let socket = io('https://cryptoduel.com:8080');

socket.on('#navigate', function(path){
  browserHistory.push(path);
});

socket.on('chat', function(message){
  console.log('Chat Message: ', message);
});

let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

/*
 * @param {Object} initial state to bootstrap our stores with for server-side rendering
 * @param {History Object} a history object. We use `createMemoryHistory` for server-side rendering,
 *                          while using browserHistory for client-side
 *                          rendering.
 */

let createGameTestInterval = false;

export default function configureStore(initialState, history) {
  // Installs hooks that always keep react-router and redux store in sync
  const middleware = [thunk, promiseMiddleware, routerMiddleware(history), socketIoMiddleware];
  let store;

  if (__DEVCLIENT__) {
    middleware.push(createLogger());
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(...middleware),
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    ));
  } else {
    store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), f => f));
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers', () => {
      const nextReducer = require('reducers');
      store.replaceReducer(nextReducer);
    });
  }

  store.subscribe(()=>{
    console.log('new client state', store.getState());
  });

  if (createGameTestInterval === false) {
    createGameTestInterval = setInterval(() => {
      // store.dispatch({type:'server/hello', data:'Hello!'});
    }, 15000);
  }

  return store;
}
