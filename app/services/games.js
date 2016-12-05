import axios from 'axios';

const service = {
    getGames: () => axios.get('/api/game'),
    getGame: (gameId) => axios.get('/api/game/' + gameId)
  };

export default service;

