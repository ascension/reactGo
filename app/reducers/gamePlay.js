import { combineReducers } from 'redux';
import * as types from '../types';

const gamePlays = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data) {
        const { gamePlays } = action.data.entities;
        return { ...state, ...gamePlays }
      }
      return state;
    default:
      return state;
  }
};

const gameReducer = combineReducers({
  gamePlays
});

export default gameReducer;
