"use strict";
const { Model } = require("sequelize");
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
          notEmpty: {
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
          notEmpty: {
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
          notEmpty: {
            msg: "Password required",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description required",
          },
          notEmpty: {
            msg: "Description required",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Address required",
          },
          notEmpty: {
            msg: "Address required",
          },
        },
      },
      latitude: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Latitude required",
          },
          notEmpty: {
            msg: "Latitude required",
          },
        },
      },
      longitude: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Longitude required",
          },
          notEmpty: {
            msg: "Longitude required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Collector",
    }
  );
  return Collector;
};
