'use strict';

var LEDGER_TXN_TYPES = require('../../../config/constants').LEDGER_TXN_TYPES;
var CURRENCY = require('../../../config/constants').CURRENCY;

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Ledger', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      gameId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Games',
          key: 'id'
        },
        allowNull: true
      },
      amount: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      balanceBefore: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      balanceAfter: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      currency: {
        type: Sequelize.ENUM(CURRENCY.BTC),
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM(
          LEDGER_TXN_TYPES.BET_PLACED,
          LEDGER_TXN_TYPES.BET_CANCELED,
          LEDGER_TXN_TYPES.DEPOSIT,
          LEDGER_TXN_TYPES.TRANSFER,
          LEDGER_TXN_TYPES.WITHDRAWAL,
          LEDGER_TXN_TYPES.WINNINGS,
          LEDGER_TXN_TYPES.HOUSE_CUT
        ),
        allowNull: false
      },
      txnId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Ledger');
  }
};