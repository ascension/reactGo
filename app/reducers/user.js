import * as types from 'types';
import { combineReducers } from 'redux';

const isLogin = (
  state = true,
  action
) => {
  switch (action.type) {
    case types.TOGGLE_LOGIN_MODE:
      return !state;
    default:
      return state;
  }
};

const games = (state = [], action) => {
  switch (action.type) {
    case types.CREATE_GAME:
      if (state) return [...state, action.gameId];
      else return state;
    default:
      return state;
  }
};

const withdrawals = (state = {}, action) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.entities) {
        const { ledgerTxns } = action.data.entities;
        return { ...state, ...ledgerTxns }
      }
      return state;
    default:
      return state;
  }

};

const username = (state = '', action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const message = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.TOGGLE_LOGIN_MODE:
    case types.MANUAL_LOGIN_USER:
    case types.SIGNUP_USER:
    case types.LOGOUT_USER:
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
      return '';
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
      if (action.message) return action.message;
      return state;
    default:
      return state;
  }
};

const isWaiting = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.MANUAL_LOGIN_USER:
    case types.SIGNUP_USER:
    case types.LOGOUT_USER:
      return true;
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.LOGOUT_SUCCESS_USER:
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
    case types.LOGOUT_ERROR_USER:
      return false;
    default:
      return state;
  }
};

const authenticated = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.LOGOUT_ERROR_USER:
      return true;
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
    case types.LOGOUT_SUCCESS_USER:
      return false;
    default:
      return state;
  }
};

const isAdmin = (state = false, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const isMod = (state = false, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const id = (state = null, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
      return action.user.id;
    default:
      return state;
  }
};

const bitcoinAddress = (state = null, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
      if (action.user.bitcoinAddress) return action.user.bitcoinAddress;
      return state;
    default:
      return state;
  }
};

const balance = (state = 0, action) => {
  switch (action.type) {
    case types.UPDATE_USER_BALANCE:
      return action.user.balance;
    case types.LOGIN_SUCCESS_USER:
      if (action.user.balance) return action.user.balance;
      return state;
    default:
      return state;
  }
};

const userReducer = combineReducers({
  isLogin,
  isWaiting,
  authenticated,
  bitcoinAddress,
  balance,
  message,
  username,
  isAdmin,
  isMod,
  withdrawals,
  id
});

export default userReducer;
