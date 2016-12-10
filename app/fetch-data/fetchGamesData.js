import { gameService } from '../services';
import { normalize, arrayOf } from 'normalizr';
import gameSchema from '../schemas/gameSchema';

export const fetchGameData = () => {
  return gameService.getGames()
    .then(res => {
      const normalized = normalize(res.data, arrayOf(gameSchema));
      return normalized;
    });
};

export const fetchGame = (params) => {
  console.log('gameId: ', params.id);
  return gameService.getGame(params.id)
    .then(res => [res.data]);
};
