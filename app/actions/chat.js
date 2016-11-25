// NOTE:Chat actions
import { ADD_MESSAGE, RECEIVE_MESSAGE, RECEIVE_CHANNEL, ADD_CHANNEL, TYPING, STOP_TYPING, CHANGE_CHANNEL} from '../types';
import request from 'axios';

/*
 * Utility function to make AJAX requests using isomorphic fetch.
 * You can also use jquery's $.ajax({}) if you do not want to use the
 * /fetch API.
 * Note: this function relies on an external variable `API_ENDPOINT`
 *        and isn't a pure function
 * @param Object Data you wish to pass to the server
 * @param String HTTP method, e.g. post, get, put, delete
 * @param String endpoint
 * @return Promise
 */
export function makeMessageRequest(method, id, data, api = '/message') {
  return request[method](api + (id ? ('/' + id) : ''), data);
}

function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    message,
    channelId: 1
  };
}

export function receiveRawMessage(message) {
  return {
    type: RECEIVE_MESSAGE,
    message
  };
}

export function receiveRawChannel(channel) {
  return {
    type: RECEIVE_CHANNEL,
    channel
  };
}

function addChannel(channel) {
  return {
    type: ADD_CHANNEL,
    channel
  };
}

export function typing(username) {
  return {
    type: TYPING,
    username
  };
}

export function stopTyping(username) {
  return {
    type: STOP_TYPING,
    username
  };
}

export function changeChannel(channel) {
  return {
    type: CHANGE_CHANNEL,
    channel
  };
}

export function createMessage(message) {
  return dispatch => {
    return dispatch(addMessage(message));
  }
}

export function createChannel(channel) {
  return dispatch => {
    dispatch(addChannel(channel));
    return fetch ('/api/channels/new_channel', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(channel)})
      .catch(error => {throw error});
  }
}