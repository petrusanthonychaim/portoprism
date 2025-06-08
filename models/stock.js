'use strict';
const { Dayjs } = require('dayjs');
const {
  Model
} = require('sequelize');
const dayjs = require ('dayjs');
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
    get formattedDate () {
      return dayjs(this.transaction_date).format('DD MMM YYYY')
    } 
    get chartDate () {
      return dayjs(this.transaction_date).format('MMM YY')
    } 

  }
  Stock.init({
    code: DataTypes.STRING,
    stockName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Title is Required!"
        },
        notEmpty: {
          args: true,
          msg: "Title is Required!"
        }
      }
    },
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