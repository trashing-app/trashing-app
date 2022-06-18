'use strict';
const { hashedPassword } = require('../helpers/jwt-bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require('../data.json');
    const collectors = data.collectors;
    collectors.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
      el.password = hashedPassword(el.password);
    });
    await queryInterface.bulkInsert('Collectors', collectors, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Collectors', null, {});
  },
};
