'use strict';
const { Model } = require('sequelize');
const { hashedPassword } = require('../helpers/jwt-bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Order, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Username already taken',
        },
        validate: {
          notEmpty: {
            msg: 'Username required',
          },
          notNull: {
            msg: 'Username required',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Email already used',
        },
        validate: {
          notEmpty: {
            msg: 'Email required',
          },
          notNull: {
            msg: 'Email required',
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
            msg: 'Password required',
          },
          notNull: {
            msg: 'Password required',
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Address required',
          },
          notNull: {
            msg: 'Address required',
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Address required',
          },
          notNull: {
            msg: 'Address required',
          },
        },
      },
      location: {
        type: DataTypes.GEOMETRY('POINT'),
      },
      balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          notEmpty: {
            msg: 'balance required',
          },
          notNull: {
            msg: 'balance required',
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  User.beforeCreate((instance, options) => {
    instance.password = hashedPassword(instance.password);
  });
  return User;
};
