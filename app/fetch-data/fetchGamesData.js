import { gameService } from '../services';

const fetchGameData = () => {
  return gameService.getGames()
    .then(res => res.data);
};

export default fetchGameData;

