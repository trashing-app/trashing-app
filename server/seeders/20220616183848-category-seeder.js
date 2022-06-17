"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data.json");
    const categories = data.categories;
    categories.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Categories", categories, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
