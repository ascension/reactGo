import { combineReducers } from 'redux';
import * as types from '../types';
import { normalize, arrayOf } from 'normalizr';
import gameSchema from '../schemas/gameSchema';

const game = (
  state = { GamePlays: [] },
  action
) => {
  switch (action.type) {
    case types.CREATE_GAME:
      return { ...action, status: 'WAITING', remainingWaitTime: 5000 };
    case types.GAME_LOBBY_TICK:
      const game = state[action.gameId];
      if (game) {
        const newGame = { ...game, remainingWaitTime: action.remainingWaitTime, status: action.status };
        return newGame;
      }
      return state;
    case types.BEGIN_GAME:
      if (state.id === action.gameId) {
        return { ...state, status: action.status, hash: action.outcome };
      }
      return state;
    case types.JOIN_GAME_SUCCESS:
      return state;
    default:
      return state;
  }
};

const games = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.entities) {
        const { games } = action.data.entities;
        return { ...state, ...games }
      }
      return state;
    case types.CREATE_GAME:
      return {...state, [action.id]: game(undefined, action)};
    case types.GAME_LOBBY_TICK:
      if (state[action.gameId]) {
        return { ...state, [action.gameId]: game(state, action) };
      }
      return state;
    case types.BEGIN_GAME:
      if (state[action.gameId]) {
        return { ...state, [action.gameId]: game(state[action.gameId], action) };
      }
      return state;
    case types.JOIN_GAME_SUCCESS:
      const normalized = normalize(action.game, gameSchema);
      const { games } = normalized.entities;
      const newState = { ...state, ...games };
      return newState;
    default:
      return state;
  }
};

const gameReducer = combineReducers({
  games
});

export default gameReducer;
