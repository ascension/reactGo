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
      type: DataTypes.BIGINT,
      allowNull: false
    },
    balanceBefore: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    balanceAfter: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    currency: {
      type: DataTypes.ENUM(CURRENCY.BTC),
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
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    timestamps: false,
    paranoid: true,
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