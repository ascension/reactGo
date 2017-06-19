'use strict';

var CURRENCY = require('../../../config/constants').CURRENCY;

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Blocks', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      currency: {
        type: Sequelize.ENUM(CURRENCY.BTC, CURRENCY.ETH, CURRENCY.LTC),
        allowNull: false
      },
      blockId: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('GamePlays');
  }
};