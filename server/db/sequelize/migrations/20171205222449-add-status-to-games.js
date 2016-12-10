
var GAME_STATES = require('../../../config/constants').GAME_STATES;

module.exports = {
  up(queryInterface, DataTypes) {
    queryInterface.addColumn('Games', 'status', {
      type: DataTypes.ENUM(
        GAME_STATES.NOT_STARTED,
        GAME_STATES.CANCELLED,
        GAME_STATES.WAITING,
        GAME_STATES.STARTING,
        GAME_STATES.IN_PROGRESS,
        GAME_STATES.COMPLETE
      ),
      allowNull: true,
      defaultValue: GAME_STATES.NOT_STARTED
    });
  },
  down(queryInterface) {
    queryInterface.removeColumn('Games', 'status');
  }
};
