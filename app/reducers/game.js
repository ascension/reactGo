import { combineReducers } from 'redux';
import * as types from '../types';

const game = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.CREATE_GAME:
      return {
        id: action.game_id,
        bet_amount: action.bet_amount,
        user_id: action.user_id
      };
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
    default:
      return state;
  }
};

const newGame = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.TYPING:
      return action.newTopic;
    case types.CREATE_GAME:
      return '';
    default:
      return state;
  }
};

const gameReducer = combineReducers({
  games,
  newGame
});

export default gameReducer;
