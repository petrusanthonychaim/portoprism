'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    stock.belongsTo(models.profile, {});
    stock.belongsTo(models.sector, {});
    }
  }
  stock.init({
    code: DataTypes.STRING,
    stockName: DataTypes.STRING,
    price: DataTypes.INTEGER,
    shares: DataTypes.INTEGER,
    ProfileId: DataTypes.INTEGER,
    SectorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'stock',
  });
  return stock;
};