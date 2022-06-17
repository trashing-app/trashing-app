"use strict";
const { Model } = require("sequelize");
const { hashedPassword } = require("../helpers/jwt-bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Collector extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Collector.hasMany(models.Order, { foreignKey: "collectorId" });
    }
  }
  Collector.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Username required",
          },
          notNull: {
            msg: "Username required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Email required",
          },
          notNull: {
            msg: "Email required",
          },
          isEmail: {
            msg: "Invalid email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password required",
          },
          notNull: {
            msg: "Password required",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Address required",
          },
          notNull: {
            msg: "Address required",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Phone Number required",
          },
          notNull: {
            msg: "Phone Number required",
          },
        },
      },
      latitudeLongitude: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Collector",
    }
  );
  Collector.beforeCreate((instance, options) => {
    instance.password = hashedPassword(instance.password);
  });
  return Collector;
};
