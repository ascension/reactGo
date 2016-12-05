import { gameService } from '../services';

export const fetchGameData = () => {
  return gameService.getGames()
    .then(res => res.data);
};

export const fetchGame = (params) => {
  console.log('gameId: ', params.id);
  return gameService.getGame(params.id)
    .then(res => [res.data]);
};
