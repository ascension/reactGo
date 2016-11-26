// NOTE:Chat actions
import {
  ADD_MESSAGE,
  RECEIVE_MESSAGE,
  RECEIVE_CHANNEL,
  ADD_CHANNEL,
  TYPING,
  STOP_TYPING,
  CHANGE_CHANNEL,
  LOAD_MESSAGES_SUCCESS,
  LOAD_MESSAGES
} from '../types';
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

function loadMessages() {
  return {
    type: LOAD_MESSAGES,
    date: Date.now(),
    channel: state.activeChannel,

  }
}

function fetchMessages(messages, channel) {
  return {
    type: LOAD_MESSAGES_SUCCESS,
    date: Date.now(),
    channel,
    messages
  }
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

export function fetchMessagesRequest(channel) {
  return (dispatch) => {
    return makeMessageRequest('get', channel)
      .then((messages) => {
        dispatch(fetchMessages(messages.data, channel))
      })
      .catch((error) => {
        console.log('Fetch Messages Error: ', error);
      })
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