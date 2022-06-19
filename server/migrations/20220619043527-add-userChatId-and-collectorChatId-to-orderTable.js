'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Orders', 'userChatId', {type:Sequelize.STRING})
    await queryInterface.addColumn('Orders', 'collectorChatId', {type:Sequelize.STRING})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Orders', 'collectorChatId')
    await queryInterface.removeColumn('Orders', 'userChatId')
  }
};
