/* eslint consistent-return: 0, no-else-return: 0*/
import * as types from '../types';
/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';

polyfill();


export function makeGameRequest(method, id, data, api = '/game') {
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

export function createGameRequest(newGame) {
  const { id, userId, hash, createdAt, startedAt, updatedAt } = newGame;
  return {
    type: types.CREATE_GAME,
    id,
    userId,
    hash,
    createdAt,
    startedAt,
    updatedAt
  }
}

export function createGame(betAmount) {
  return (dispatch, getState) => {
    const data = {
      betAmount
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