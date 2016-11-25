import { CHANGE_CHANNEL } from '../types';

const initialState = {
  name: 'Lobby',
  id: 0
};

export default function activeChannel(state = initialState, action) {
  switch (action.type) {
    case CHANGE_CHANNEL:
      return {
        name: action.channel.name,
        id: action.channel.id
      };

    default:
      return state;
  }
}