module.exports = {
  up(queryInterface, DataTypes) {
    queryInterface.addColumn('Games', 'allowLowerBet', {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    });
    queryInterface.addColumn('Games', 'minBetAmount', {
      type: DataTypes.INTEGER,
      allowNull: false
    });
  },

  down(queryInterface) {
    queryInterface.removeColumn('Games', 'allowLowerBet');
    queryInterface.removeColumn('Games', 'minBetAmount');
  }
};
