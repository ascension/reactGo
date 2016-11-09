'use strict';

import { GAME_TYPES } from '../../../config/constants';

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
      }
    }
  });
  return Game;
};