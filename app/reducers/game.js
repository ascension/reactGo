import { combineReducers } from 'redux';
import * as types from '../types';

const game = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.CREATE_GAME:
      return {
        id: action.id,
        userId: action.userId,
        hash: action.hash,
        GamePlays: action.GamePlays,
        maxPlayers: action.maxPlayers,
        createdAt: action.createdAt,
        startedAt: action.startedAt,
        updatedAt: action.updatedAt,
        remainingWaitTime: 5000
      };
    case types.GAME_LOBBY_TICK:
      if (state.id === action.gameId) {
        return { ...state, remainingWaitTime: action.remainingWaitTime };
      }
      return state;
    case types.JOIN_GAME_SUCCESS:
      return state;
    default:
      return state;
  }
};

const games = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data) {
        if (Array.isArray(action.data)) {
          debugger;
          return [...state.filter(game => game.id !== action.data.id), ...action.data];
        }
      }
      return state;
    case types.CREATE_GAME:
      return [...state, game(undefined, action)];
    case types.GAME_LOBBY_TICK:
      debugger;
      return state.map(g => game(g, action));
    case types.JOIN_GAME_SUCCESS:
      const findGame = state.find((game) => {
        return game.id === action.game.id;
      });
      if (findGame) {
        return [...state.filter(game => game.id !== action.game.id), action.game]
      } else {
        return state
      }
    default:
      return state;
  }
};

const gameReducer = combineReducers({
  games
});

export default gameReducer;
