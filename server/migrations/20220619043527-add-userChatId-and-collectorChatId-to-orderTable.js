'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Orders', 'userChatId', { type: Sequelize.STRING });
    await queryInterface.addColumn('Orders', 'collectorChatId', { type: Sequelize.STRING });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Orders', 'collectorChatId');
    await queryInterface.removeColumn('Orders', 'userChatId');
  },
};
