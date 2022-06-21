'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      History.belongsTo(models.Collector, {
        foreignKey: 'collectorId'
      })
      History.belongsTo(models.Order, {
        foreignKey: 'orderId'
      })
    }
  }
  History.init({
    userId: DataTypes.INTEGER,
    collectorId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};