'use strict';

import { GAME_TYPES, GAME_STATES } from '../../../config/constants';

module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define('Game', {
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
    gameType: {
      type: DataTypes.ENUM(GAME_TYPES.COIN_FLIP, GAME_TYPES.PARTY, GAME_TYPES.BATTLE),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(
        GAME_STATES.NOT_STARTED,
        GAME_STATES.CANCELLED,
        GAME_STATES.WAITING,
        GAME_STATES.STARTING,
        GAME_STATES.IN_PROGRESS,
        GAME_STATES.COMPLETE),
      allowNull: true
    },
    minBetAmount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    allowLowerBet: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    hash: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    startedAt: {
      allowNull: true,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    maxPlayers: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false,
    paranoid: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Game.belongsTo(models.User, {
          foreignKey: 'userId'
        });
        Game.hasMany(models.GamePlay, {
          foreignKey: 'gameId'
        });
      }
    }
  });
  return Game;
};