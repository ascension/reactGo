import { combineReducers } from 'redux';
import * as types from '../types';
import { normalize, arrayOf } from 'normalizr';
import gameSchema from '../schemas/gameSchema';

const withdrawal = (
  state = {},
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
};

const withdrawals = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.entities) {
        const { ledgers } = action.data.entities;
        return { ...state, ...ledgers }
      }
      return state;
    case types.CREATE_GAME:
      return {...state, [action.id]: withdrawal(undefined, action)};
    default:
      return state;
  }
};

const withdrawalReducer = combineReducers({
  withdrawals
});

export default withdrawalReducer;
