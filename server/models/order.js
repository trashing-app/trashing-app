'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'userId' });
      Order.belongsTo(models.Collector, { foreignKey: 'collectorId' });
      Order.hasMany(models.OrderItem, { foreignKey: 'orderId' });
    }
  }
  Order.init(
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      orderDate: {
        type: DataTypes.STRING,
      },
      pickupDate: {
        type: DataTypes.STRING,
      },
      collectorId: {
        type: DataTypes.INTEGER,
      },
      orderStatus: {
        type: DataTypes.STRING,
        defaultValue: 'Not Completed',
      },
      approvalStatus: {
        type: DataTypes.STRING,
        defaultValue: 'Not Approved',
      },
      paymentStatus: {
        type: DataTypes.STRING,
        defaultValue: 'Not Paid',
      },
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
