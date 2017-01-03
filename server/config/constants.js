/* Use this old export style until sequelize cli supports es6 syntax */
function defaultExport() {}

defaultExport.GAME_COUNTDOWN_SEC = 5000;
defaultExport.GAME_TICK_INTERVAL = 100;

/**
 * NOT_STARTED: Game has been created. No GamePlays.
 * CANCELLED: User has cancelled the game.
 * WAITING: At least on player has joined.
 * STARTING: Countdown has begun.
 * IN_PROGRESS: Outcome is being calculated. GamePlays are finalized.
 * COMPLETE: Outcome has been recorded and winnings distributed.
 */
defaultExport.GAME_STATES = {
  NOT_STARTED: 'NOT_STARTED',
  CANCELLED: 'CANCELLED',
  WAITING: 'WAITING',
  STARTING: 'STARTING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETE: 'COMPLETE'
};

defaultExport.GAME_TYPES = {
  COIN_FLIP: 'COIN_FLIP',
  PARTY: 'PARTY',
  BATTLE: 'BATTLE'
};

defaultExport.DB_TYPES = {
  MONGO: 'MONGO',
  POSTGRES: 'POSTGRES',
  NONE: 'NONE'
};

defaultExport.BET_STATES = {
  PLACED: 'PLACED',
  CANCELLED: 'CANCELLED'
};

defaultExport.LEDGER_TXN_TYPES = {
  BET_PLACED: 'BET_PLACED',
  BET_CANCELED: 'BET_CANCELED',
  DEPOSIT: 'DEPOSIT',
  WITHDRAWAL: 'WITHDRAWAL',
  TRANSFER: 'TRANSFER',
  WINNINGS: 'WINNINGS',
  HOUSE_CUT: 'HOUSE_CUT'
};

defaultExport.CURRENCY = {
  BTC: 'BTC',
  ETH: 'ETH',
  LTC: 'LTC'
};

module.exports = defaultExport;