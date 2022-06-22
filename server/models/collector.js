'use strict';
const { Model } = require('sequelize');
const { hashedPassword } = require('../helpers/jwt-bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Collector extends Model {
    static associate(models) {
      Collector.hasMany(models.Order, { foreignKey: 'collectorId' });
      Collector.hasMany(models.History, { foreignKey: 'collectorId' })
    }
  }
  Collector.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Username is already taken',
        },
        validate: {
          notEmpty: {
            msg: 'Username is required',
          },
          notNull: {
            msg: 'Username is required',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Email is already taken',
        },
        validate: {
          notEmpty: {
            msg: 'Email is required',
          },
          notNull: {
            msg: 'Email is required',
          },
          isEmail: {
            msg: 'Invalid email format',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Password is required',
          },
          notNull: {
            msg: 'Password is required',
          },
        },
      },
      address: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
      location: {
        type: DataTypes.GEOMETRY('POINT'),
      },
      device_token: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Collector',
    }
  );
  Collector.beforeCreate((instance, options) => {
    instance.password = hashedPassword(instance.password);
  });
  return Collector;
};
