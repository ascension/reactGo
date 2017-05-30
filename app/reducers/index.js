import { combineReducers } from 'redux';
import user from 'reducers/user';
import message from 'reducers/message';
import messages from 'reducers/messages';
import channels from 'reducers/channels';
import gamePlay from 'reducers/gamePlay';
import activeChannel from 'reducers/activeChannel';
import game from 'reducers/game';
import withdrawal from 'reducers/withdrawal';
import { routerReducer as routing } from 'react-router-redux';
import * as types from 'types';

const isFetching = ( state = false, action ) => {
  switch (action.type) {
    case types.CREATE_REQUEST:
      return true;
    case types.REQUEST_SUCCESS:
    case types.REQUEST_FAILURE:
      return false;
    default:
      return state;
  }
};

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  isFetching,
  game,
  withdrawal,
  user,
  message,
  messages,
  channels,
  activeChannel,
  routing,
  gamePlay
});

export default rootReducer;
