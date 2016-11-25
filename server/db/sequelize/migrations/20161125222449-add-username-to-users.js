module.exports = {
  up(queryInterface, DataTypes) {
    queryInterface.addColumn('Users', 'username', DataTypes.STRING);
  },

  down(queryInterface) {
    queryInterface.removeColumn('Users', 'balance');
  }
};
