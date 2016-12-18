import { combineReducers } from 'redux';
import * as types from '../types';
import { normalize, arrayOf } from 'normalizr';
import gamePlaySchema from '../schemas/gamePlaySchema';


const gamePlays = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.entities) {
        const { gamePlays } = action.data.entities;
        return { ...state, ...gamePlays }
      }
      return state;
    case types.JOIN_GAME_SUCCESS:
      const normalized = normalize(action.game.GamePlays, arrayOf(gamePlaySchema));
      const { gamePlays } = normalized.entities;
      return { ...state, ...gamePlays };
    default:
      return state;
  }
};

const gameReducer = combineReducers({
  gamePlays
});

export default gameReducer;
