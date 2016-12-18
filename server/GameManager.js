import _ from 'lodash';
import { BET_STATES, CURRENCY } from './config/constants';
import Models from './db/sequelize/models';
const { Game, GamePlay, User } = Models;
import assert from 'assert';
import { BEGIN_GAME, GAME_STARTING } from '../app/types';
import { GAME_COUNTDOWN_SEC, GAME_STATES } from './config/constants';
import GameEngine from './GameEngine';
import TransactionService from './TransactionService';

const transactionService = new TransactionService();

export default class GameManager {
  constructor(socket) {
    this.games = [];
    this.socket = socket;
  }

  // Players aka GamePlays
  createGame(game) {
    console.log('Creating Game: ', game);
    game.status = GAME_STATES.STARTING;
    const gameSaveResult = game.save();
    return gameSaveResult.then((updateResult) => {
      console.log('Update Result: ', updateResult);
      // Create Game Engine Since all the players have joined.
      const gameEngine = new GameEngine(this.socket, game);
      // Pop the new game engine to the games array so we know about it later.
      this.games.push(gameEngine);
      this.socket.emit('action', { type: GAME_STARTING, gameId: game.id });
      setTimeout(() => {
        gameEngine.runGame();
      }, GAME_COUNTDOWN_SEC)
    })
    .catch((error) => {
      console.log('Update Result Error: ', error);
    });
  }

  getGame(gameId) {
    assert(typeof gameId === 'number');
    return Game.find({
      where: { id: gameId },
      include: [{ model: GamePlay, include: [{ model: User, attributes: ['username'] }]
    }]});
  }

  userJoinGame(user, betAmount, gameId, betCurrency = CURRENCY.BTC) {
    assert(typeof gameId === 'number');

    return this.getGame(gameId).then((game) => {
      const userHasAlreadyJoinedGame = game.GamePlays.find((gamePlay) => {
        return gamePlay.userId === user.id;
      });

      if (userHasAlreadyJoinedGame) {
        return Promise.resolve(userHasAlreadyJoinedGame);
      }

      assert(typeof game.GamePlays.length === 'number');
      assert(typeof game.maxPlayers === 'number');
      if ((game.GamePlays.length) >= game.maxPlayers) {
        console.log('MAX NUM PLAYERS REACHED');
        throw new Error('Max number of players.')
      }

      // Create Transaction to deduct Balance from User.
      return transactionService.placeBet(user.id, gameId, betAmount, betCurrency)
        .then((ledgerEntry) => {
          assert(typeof user.id === 'number');
          assert(typeof betAmount === 'number');
          const gamePlayToCreate = {
            userId: user.id,
            betAmount,
            status: BET_STATES.PLACED,
            gameId
          };

          return this.createGamePlay(gamePlayToCreate);
        });
    });
  }

  userCancelBet(gameId, userId) {
    // Set GamePlay to cancelled.
    return GamePlay.update({ status: BET_STATES.CANCELLED }, { where: { gameId, userId } })
      .then((success) => {
        // Cancel bet in Transactions and add back to users balance.
        transactionService.cancelBet();
      })
      .catch((error) => {
        this.logError(error);
        // Bubble the error back up the stack.
        throw error;
      });
  }

  createGamePlay(gamePlayToCreate) {
    // Since user has enough balance, create an entry in game plays / ledger.
    return GamePlay.create(gamePlayToCreate).then((newGamePlay) => {
      return this.getGame(gamePlayToCreate.gameId)
        .then((game) => {
          if (game.GamePlays.length === game.maxPlayers) {
            this.startGame(game);
          } else {
            game.status = GAME_STATES.STARTING;
            const gameSaveResult = game.save();
          }
          return newGamePlay;
        });

    }).catch((error) => {
      this.logError(error, 'createGamePlay');
      throw error;
    });
  }

  startGame(game) {
    // Create the game with users and bets.
    console.log('*** Starting GAME *** ', game);
    this.createGame(game);
  }

  updateGameStatus(game) {

  }

  addGame(game) {
    this.games.push(game);
  }

  getPendingGames() {
    // Make Call yo DB to get pending games and load them.

  }

  logError(error, method = null) {
    if (method) {
      console.log(`${method} Error: ${error}`)
    } else {
      console.log(`Error: ${error}`)
    }
  }
}