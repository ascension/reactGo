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

// Game Action Creators
export function beginGame(user_id, amount) {
  return {
    type: types.BEGIN_GAME,
    user_id,
    amount
  };
}

export function createGameRequest(user_id, bet_amount, game_id) {
  return {
    type: types.CREATE_GAME,
    user_id,
    bet_amount,
    game_id
  }
}

export function createGame(bet_amount) {
  return (dispatch, getState) => {
    const data = {
      bet_amount
    };

    return makeGameRequest('post', false, data)
      .then(res => {
        if (res.status === 200) {
          // We can actually dispatch a CREATE_TOPIC_SUCCESS
          // on success, but I've opted to leave that out
          // since we already did an optimistic update
          // We could return res.json();
          const { user_id, bet_amount, game_id } = res.json();
          return dispatch(createGameRequest(user_id, bet_amount, game_id));
        }
      })
      .catch(() => {
        return dispatch(createTopicFailure({ id, error: 'Oops! Something went wrong and we couldn\'t create your topic'}));
      });
  };
}

export function manualLogin(data) {
  return dispatch => {
    dispatch(beginLogin());

    return makeUserRequest('post', data, '/login')
      .then(response => {
        if (response.status === 200) {
          dispatch(loginSuccess(response.data.message));
          dispatch(push('/'));
        } else {
          dispatch(loginError('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(loginError(getMessage(err)));
      });
  };
}