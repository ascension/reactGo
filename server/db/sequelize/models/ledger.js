'use strict';

var LEDGER_TXN_TYPES = require('../../../config/constants').LEDGER_TXN_TYPES;
var CURRENCY = require('../../../config/constants').CURRENCY;

module.exports = function(sequelize, DataTypes) {
  var Ledger = sequelize.define('Ledger', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    gameId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Games',
        key: 'id'
      },
      allowNull: true
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    balanceBefore: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    balanceAfter: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    currency: {
      type: DataTypes.ENUM(CURRENCY.BTC, CURRENCY.ETH, CURRENCY.LTC),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM(
        LEDGER_TXN_TYPES.BET_PLACED,
        LEDGER_TXN_TYPES.BET_CANCELED,
        LEDGER_TXN_TYPES.DEPOSIT,
        LEDGER_TXN_TYPES.TRANSFER,
        LEDGER_TXN_TYPES.WITHDRAWAL,
        LEDGER_TXN_TYPES.HOUSE_CUT
      ),
      allowNull: false
    },
    txnId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false,
    paranoid: true,
    tableName: 'Ledger',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Ledger.belongsTo(models.User, {
          foreignKey: 'userId'
        });
        Ledger.belongsTo(models.Game, {
          foreignKey: 'gameId'
        });
      }
    }
  });
  return Ledger;
};