'use strict';

var BET_STATES = require('../../../config/constants').BET_STATES;

module.exports = function(sequelize, DataTypes) {
  var GamePlay = sequelize.define('GamePlay', {
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
      }
    },
    betAmount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(BET_STATES.PLACED, BET_STATES.CANCELLED),
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
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
        GamePlay.belongsTo(models.User, {
          foreignKey: 'userId'
        });
      }
    }
  });
  return GamePlay;
};