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
        status: 'WAITING',
        GamePlays: action.GamePlays,
        maxPlayers: action.maxPlayers,
        createdAt: action.createdAt,
        startedAt: action.startedAt,
        updatedAt: action.updatedAt,
        remainingWaitTime: 5000
      };
    case types.GAME_LOBBY_TICK:
      if (state.id === action.gameId) {
        return { ...state, remainingWaitTime: action.remainingWaitTime, status: action.status };
      }
      return state;
    case types.BEGIN_GAME:
      if (state.id === action.gameId) {
        return { ...state, status: action.status };
      }
      return state;
    case types.JOIN_GAME_SUCCESS:
      return state;
    default:
      return state;
  }
};

const games = (
  state = { games: {} },
  action
) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data) {
        const { games } = action.data.entities;
        return { ...state, ...games }
      }
      return state;
    case types.CREATE_GAME:
      return [...state, game(undefined, action)];
    case types.GAME_LOBBY_TICK:
      return state.map(g => game(g, action));
    case types.BEGIN_GAME:
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
