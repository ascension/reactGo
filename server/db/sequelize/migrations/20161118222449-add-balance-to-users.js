module.exports = {
  up(queryInterface, DataTypes) {
    queryInterface.addColumn('Users', 'balance', DataTypes.BIGINT);
  },

  down(queryInterface) {
    queryInterface.removeColumn('Users', 'balance');
  }
};
