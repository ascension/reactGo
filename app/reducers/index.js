import { combineReducers } from 'redux';
import user from 'reducers/user';
import topic from 'reducers/topic';
import message from 'reducers/message';
import messages from 'reducers/messages';
import channels from 'reducers/channels';
import activeChannel from 'reducers/activeChannel';
import game from 'reducers/game';
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
  topic,
  game,
  user,
  message,
  messages,
  channels,
  activeChannel,
  routing
});

export default rootReducer;
