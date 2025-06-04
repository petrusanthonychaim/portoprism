'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User,{ foreignKey : "UserId"}); // INI HARUSNYA BELONGS TO BUKAN HAS MANY
      Profile.hasMany(models.Stock,{});
    }
  }
  Profile.init({
    profileName: DataTypes.STRING,
    address: DataTypes.STRING,
    mobile: DataTypes.STRING,
    email: DataTypes.STRING,
    rdn: DataTypes.STRING,
    currency: DataTypes.STRING,
    npwp: DataTypes.STRING,
    capital: DataTypes.BIGINT,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};