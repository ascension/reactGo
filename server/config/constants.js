/* Use this old export style until sequelize cli supports es6 syntax */
function defaultExport() {}

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
  HOUSE_CUT: 'HOUSE_CUT'
};

defaultExport.CURRENCY = {
  BTC: 'BTC',
  ETH: 'ETH',
  LTC: 'LTC'
};

module.exports = defaultExport;
