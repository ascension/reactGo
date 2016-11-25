/* eslint consistent-return: 0, no-else-return: 0*/
import * as types from 'types';
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

export function dismissMessage() {
  return { type: types.DISMISS_MESSAGE };
}

/*
 * @param data
 * @return a simple JS object
 */
export function createMessageRequest(data) {
  return {
    type: types.CREATE_MESSAGE_REQUEST,
    id: data.id,
    count: data.count,
    text: data.text
  };
}

export function createMessageSuccess() {
  return {
    type: types.CREATE_MESSAGE_SUCCESS
  };
}

export function createMessageFailure(data) {
  return {
    type: types.CREATE_MESSAGE_FAILURE,
    id: data.id,
    error: data.error
  };
}

// This action creator returns a function,
// which will get executed by Redux-Thunk middleware
// This function does not need to be pure, and thus allowed
// to have side effects, including executing asynchronous API calls.
export function createMessage(text) {
  return (dispatch, getState) => {
    // If the text box is empty
    if (text.trim().length <= 0) return;

    const id = md5.hash(text);
    // Redux thunk's middleware receives the store methods `dispatch`
    // and `getState` as parameters
    const { topic } = getState();
    const data = {
      id,
      text
    };

    // First dispatch an optimistic update
    dispatch(createMessageRequest(data));

    return makeMessageRequest('post', id, data)
      .then(res => {
        if (res.status === 200) {
          // We can actually dispatch a CREATE_TOPIC_SUCCESS
          // on success, but I've opted to leave that out
          // since we already did an optimistic update
          // We could return res.json();
          return dispatch(createMessageSuccess());
        }
      })
      .catch(() => {
        return dispatch(createMessageFailure({ id, error: 'Oops! Something went wrong and we couldn\'t create your topic'}));
      });
  };
}
