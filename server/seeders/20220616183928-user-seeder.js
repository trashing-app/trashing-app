'use strict';
const { hashedPassword } = require('../helpers/jwt-bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require('../data.json');
    const users = data.users;
    users.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
      el.password = hashedPassword(el.password);
    });
    await queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
