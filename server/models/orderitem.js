'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      OrderItem.belongsTo(models.Category, { foreignKey: 'categoryId' });
      OrderItem.belongsTo(models.Order, { foreignKey: 'orderId' });
    }
  }
  OrderItem.init(
    {
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Weight required',
          },
          notEmpty: {
            msg: 'Weight required',
          },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Description required',
          },
          notEmpty: {
            msg: 'Description required',
          },
        },
      },
      orderId: {
        type: DataTypes.INTEGER,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Price required',
          },
          notEmpty: {
            msg: 'Price required',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'OrderItem',
    }
  );
  return OrderItem;
};
