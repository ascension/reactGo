import {
  WITHDRAWAL_REQUEST_BEGIN,
  WITHDRAWAL_REQUEST_FAILURE,
  WITHDRAWAL_REQUEST_SUCCESS
} from '../types';

import request from 'axios';

export function makeTopicRequest(method, id, data, api = '/topic') {
  return request[method](api + (id ? ('/' + id) : ''), data);
}

export function withdrawalRequestBegin() {
  return {
    type: WITHDRAWAL_REQUEST_BEGIN
  }
}

export function withdrawalRequest(amount, password) {

}