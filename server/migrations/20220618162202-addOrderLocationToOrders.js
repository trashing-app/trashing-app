'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Orders', 'orderLocation', Sequelize.GEOMETRY('POINT'));
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Orders', 'orderLocation');
  },
};
