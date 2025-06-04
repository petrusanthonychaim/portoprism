"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      profile.hasOne(models.user,{});
      profile.hasMany(models.stock,{});
    }
  }
  profile.init(
    {
      profileName: DataTypes.STRING,
      address: DataTypes.STRING,
      mobile: DataTypes.STRING,
      email: DataTypes.STRING,
      rdn: DataTypes.STRING,
      currency: DataTypes.STRING,
      npwp: DataTypes.STRING,
      capital: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "profile",
    }
  );
  return profile;
};
