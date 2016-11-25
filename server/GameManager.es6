import _ from 'lodash';
import { BET_STATES } from './config/constants';
import Models from './db/sequelize/models';
const { Game, GamePlay } = Models;

export default class GameManager {
  constructor() {
    this.games = [];
  }

  getGame(gameId) {
    return Game.find({ where: { id: gameId }, include: [{ model: GamePlay }]});
  }

  userJoinGame(user, betAmount, gameId) {
    // Does user have enough balance?
    console.log('User Balance', user.balance);
    if (user.balance < betAmount) {
      return Promise.resolve(new Error('User Balance is not enough.'));
    }

    const gamePlayToCreate = {
      userId: user.id,
      betAmount,
      status: BET_STATES.PLACED,
      gameId
    };

    return this.getGame(gameId).then((game) => {
      console.log('got game', game.maxPlayers, game.GamePlays.length);
      if ((game.GamePlays.length) >= game.maxPlayers) {
        console.log('MAX NUM PLAYERS REACHED');
        throw new Error('Max number of players.')
      }

      return this.createGamePlay(gamePlayToCreate);
    });
  }

  createGamePlay(gamePlayToCreate) {
    // Since user has enough balance, create an entry in game plays / ledger.
    return GamePlay.create(gamePlayToCreate).then((newGamePlay) => {
      console.log('new gameplay', newGamePlay);
      return newGamePlay;
    }).catch((error) => {
      console.log('gameplay error', error);
      throw new Error(error)
    });
  }

  addGame(game) {
    this.games.push(game);
  }

  getPendingGames() {
    // Make Call yo DB to get pending games and load them.

  }
}