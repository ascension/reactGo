'use strict';
module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define('Game', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    outcome: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    timestamps: true,
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