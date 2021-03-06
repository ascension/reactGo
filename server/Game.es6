import Chance from 'chance';
import crypto from  'crypto';

const TICK_RATE = 150; // ping the client every X milliseconds
const COUNTDOWN_TIME = 5000; // how many seconds do we countdown the timer.

const GAME_STATES = {
  WAITING: 'WAITING', // We are waiting for more players.
  STARTING: 'STARTING', // .
};

// Server Seed should be composed of a

const serverSecret = 'aspdf87j12l3kjnbjh1ta8sdfaklsdbfli8y71923nman,sdfhals';

var serverSeed = hash256(serverSecret);

let rolls = 0;

// Incrementing the roll count must happen server side.
function hash256(toBeHashed) {
  var sha256 = crypto.createHash("sha256");
  return sha256.update(toBeHashed).digest("hex");
}

export default class Game {
  constructor() {
    this.players = []; // { userId: 100000 } - Key will be the users ID and their bet.
    this.serverSeed = hash256(serverSecret);
  }

  /**
   *
   * @param clientSeed - Seed provided by client.
   * @param rollCount - How many rolls have been performs with this clientSeed
   */

  appendServerSeed(clientSeed, rollCount) {
    this.serverSeed +=  `|${clientSeed}:${rollCount}`;
    console.log('clientSeed', clientSeed);
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
      return player.userId;
    });
    
    const rollSeed = hash256(this.serverSeed);
    const chance = Chance(rollSeed);
    const outsome = chance.weighted(players, weights);
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

const game = new Game();

game.placeBet({id: 1}, 200000, 1, new Chance().hash());
game.placeBet({id: 2}, 400000, 1, new Chance().hash());

game.runGame();
game.runGame();