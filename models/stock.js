'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    Stock.belongsTo(models.Profile, {});
    Stock.belongsTo(models.Sector, {});
    }
  }
  Stock.init({
    code: DataTypes.STRING,
    stockName: DataTypes.STRING,
    price: DataTypes.INTEGER,
    shares: DataTypes.INTEGER,
    ProfileId: DataTypes.INTEGER,
    SectorId: DataTypes.INTEGER,
    transaction_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Stock',
  });
  return Stock;
};