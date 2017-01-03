import Chance from 'chance';
import crypto from  'crypto';

const TICK_RATE = 150; // ping the client every X milliseconds
const COUNTDOWN_TIME = 5000; // how many seconds do we countdown the timer.
import { GAME_COUNTDOWN_SEC, GAME_TICK_INTERVAL, GAME_STATES } from '../config/constants';

const BEGIN_GAME = 'server/BEGIN_GAME';
const GAME_LOBBY_TICK = 'GAME_LOBBY_TICK';

// Server Seed should be composed of a
const serverSecret = 'aspdf87j12l3kjnbjh1ta8sdfaklsdbfli8y71923nman,sdfhals';

var serverSeed = hash256(serverSecret);

let rolls = 0;

// Incrementing the roll count must happen server side.
function hash256(toBeHashed) {
  var sha256 = crypto.createHash("sha256");
  return sha256.update(toBeHashed).digest("hex");
}

export default class GameEngine {
  // Will take an instance of the Game Model and extract the data it needs.
  constructor(socket, Game) {
    this.game = Game;
    this.gameId = Game.id; // ID is from the DB.
    this.players = Game.GamePlays; // { userId: 100000 } - Key will be the users ID and their bet.
    // this.serverSeed = hash256(serverSecret);
    this.serverSeed = hash256(Chance().guid());
    this.socket = socket;
    this.state = GAME_STATES.WAITING;
    this.remainingWaitTime = GAME_COUNTDOWN_SEC;
    this.interval = null;
  }

  /**
   * gameHash is 'serverSeed|playerSeed:playerRollCount|playerTwoSeed:playerTwoRollCount'
   * @param clientSeed - Seed provided by client.
   * @param rollCount - How many rolls have been performs with this clientSeed
   */

  appendServerSeed(clientSeed, rollCount) {
    this.serverSeed +=  `|${clientSeed}:${rollCount}`;
  }

  handlePayouts(game, winningUserId) {

  }

  getServerSeedForGame() {
    return hash256(this.serverSeed);
  }

  runGame() {
    // check balances & record bets of each joined player to the game_plays
    const weights = [];
    let totalBets = 0;

    const playerWeights = {};

    this.players.forEach((player) => {
      totalBets += player.betAmount;
    });

    const players = this.players.map((player) => {
      const weight = player.betAmount / totalBets;
      weights.push(player.betAmount / totalBets);
      playerWeights[player.userId] = weight;
      console.log('playerWeights: ', playerWeights);
      // TODO - Get Client Seed from Users GampePlay.
      const clientSeed = `${Chance().guid()}:${player.userId}`;
      this.appendServerSeed(clientSeed, 1);
      return player.userId;
    });
    
    const rollSeed = hash256(this.serverSeed);
    console.log('chance: ', this.getServerSeedForGame());
    const chance = Chance(this.getServerSeedForGame());
    const outcome = chance.weighted(players, weights);
    this.interval = setInterval(() => {
      this.remainingWaitTime = this.remainingWaitTime - GAME_TICK_INTERVAL;
      if (this.remainingWaitTime < 0) {
        clearInterval(this.interval);
        this.game.status = GAME_STATES.COMPLETE;
        this.game.hash = outcome;
        this.game.save();
        const randFlips = chance.integer({min: 1, max: 10});
        this.socket.emit('action', {
          type: BEGIN_GAME,
          gameId: this.gameId,
          status: GAME_STATES.COMPLETE,
          outcome,
          randFlips
        });
      } else {
        this.socket.emit('action', {
          type: GAME_LOBBY_TICK,
          gameId: this.gameId,
          status: GAME_STATES.IN_PROGRESS,
          remainingWaitTime: this.remainingWaitTime
        });
      }
    }, GAME_TICK_INTERVAL);
    // record outcome in DB
    // emit result to players
  }

  placeBet(user, betAmount, gameId, clientSeed) {
    // Validate User

    // Validate Bet

    // Create Play in DB
    this.appendServerSeed(clientSeed, rolls++);

    // Add player to game singleton
    this.players.push({ userId: user.id, betAmount, gameId, clientSeed });

    // emit player joined
  }
}