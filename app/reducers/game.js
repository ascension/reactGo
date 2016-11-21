import { combineReducers } from 'redux';
import * as types from '../types';

const game = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.CREATE_GAME:
      debugger;
      return {
        id: action.id,
        userId: action.userId,
        hash: action.hash,
        GamePlays: action.GamePlays,
        maxPlayers: action.maxPlayers,
        createdAt: action.createdAt,
        startedAt: action.startedAt,
        updatedAt: action.updatedAt
      };
    case types.GAME_LOBBY_TICK:
      if (state.id === action.id) {
        return { ...state, remainingLobbyTime: state.remainingLobbyTime - 1 };
      }
      return state;
      return state.map(t => game(t, action));
    case types.JOIN_GAME_SUCCESS:
      console.log('JOIN_GAME_SUCCESS', action);
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
      if (action.data) return action.data;
      return state;
    case types.CREATE_GAME:
      return [...state, game(undefined, action)];
    case types.GAME_LOBBY_TICK:
      return state.map(t => game(g, action));
    default:
      return state;
  }
};

const gameReducer = combineReducers({
  games
});

export default gameReducer;
