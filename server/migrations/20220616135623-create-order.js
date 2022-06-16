"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      orderDate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pickupDate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      collectorId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Collectors",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      orderStatus: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Not Completed",
      },
      approvalStatus: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Not Approved",
      },
      paymentStatus: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Not Paid",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
