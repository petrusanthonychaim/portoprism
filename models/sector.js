'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sector extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    sector.hasMany(models.stock, {});

    }
  }
  sector.init({
    sectorName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sector',
  });
  return sector;
};