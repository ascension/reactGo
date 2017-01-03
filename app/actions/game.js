/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
// import md5 from 'spark-md5';
import { browserHistory } from 'react-router';
import { push } from 'react-router-redux';
// import { normalize, arrayOf } from 'normalizr';

import * as types from '../types';
// import gameSchema from '../schemas/gameSchema';
/* eslint consistent-return: 0, no-else-return: 0*/

polyfill();

export function makeGameRequest(method, id, data, api = '/api/game') {
  return request[method](api + (id ? ('/' + id) : ''), data);
}

// Games Action Creators
export function beginGame(user_id, amount) {
  return {
    type: types.BEGIN_GAME,
    user_id,
    amount
  };
}

export function joinGameFailure(error) {
  const { msg } = error;

  return {
    type: types.JOIN_GAME_ERROR,
    msg
  };
}

export function navigateToGame(gameId) {
  browserHistory.push('/game/' + gameId);
}

export function createGameRequest(newGame) {
  const { id, userId, hash, createdAt, startedAt, updatedAt, GamePlays, maxPlayers } = newGame;
  return {
    type: types.CREATE_GAME,
    id,
    userId,
    hash,
    createdAt,
    startedAt,
    updatedAt,
    GamePlays,
    maxPlayers
  };
}

function joinGameRequest(gameId, betAmount) {
  return {
    type: types.JOIN_GAME,
    gameId,
    betAmount
  };
}

export function joinGame(gameId) {
  return (dispatch, getState) => {
    const user = getState().user;

    if (!user.authenticated) {
      return dispatch(push('/login'));
    }

    // browserHistory.push('/game/' + gameId);
    const betAmount = 100000;
    return dispatch(joinGameRequest(gameId, betAmount));
  };
}

// export function joinGame(gameId) {
//   return (dispatch, getState) => {
//
//     return makeGameRequest('post', gameId, requestPayload)
//       .then((res) => {
//         if (res.status === 200) {
//           return dispatch(joinGameRequest(res.data));
//         }
//       })
//       .catch((error) => {
//         console.log('Join Game Error - ', error);
//         return dispatch(joinGameFailure(error))
//       });
//   }
// }

export function createGame(minBetAmount, allowLowerBet = false) {
  return (dispatch) => {
    const data = {
      minBetAmount,
      allowLowerBet
    };

    return makeGameRequest('post', false, data)
      .then(res => {
        if (res.status === 200) {
          // We can actually dispatch a CREATE_TOPIC_SUCCESS
          // on success, but I've opted to leave that out
          // since we already did an optimistic update
          // We could return res.json();
          return dispatch(createGameRequest(res.data));
        }
      })
      .catch(() => {
        // return dispatch(createTopicFailure({ id, error: 'Oops! Something went wrong and we couldn\'t create your topic'}));
      });
  };
}
