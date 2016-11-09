import axios from 'axios';

const service = {
  getGames: () => axios.get('/game')
};

export default service;

