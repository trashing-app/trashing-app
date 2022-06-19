"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: "userId" });
      Order.belongsTo(models.Collector, { foreignKey: "collectorId" });
      Order.hasMany(models.OrderItem, { foreignKey: "orderId" });
    }
  }
  Order.init(
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      orderDate: {
        type: DataTypes.DATE,
      },
      pickupDate: {
        type: DataTypes.DATE,
      },
      collectorId: {
        type: DataTypes.INTEGER,
      },
      orderStatus: {
        type: DataTypes.STRING,
        defaultValue: "Not Completed",
      },
      approvalStatus: {
        type: DataTypes.STRING,
        defaultValue: "Not Approved",
      },
      paymentStatus: {
        type: DataTypes.STRING,
        defaultValue: "Not Paid",
      },
      location: {
        type: DataTypes.GEOMETRY("POINT"),
      },
      collectorChatId: {
        type: DataTypes.STRING,
      },
      userChatId: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
