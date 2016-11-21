module.exports = {
  up(queryInterface, DataTypes) {
    queryInterface.addColumn('Games', 'maxPlayers', {
      type: DataTypes.INTEGER,
      allowNull: false
    });
  },

  down(queryInterface) {
    queryInterface.removeColumn('Games', 'maxPlayers');
  }
};
