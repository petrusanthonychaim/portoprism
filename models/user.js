'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    User.hasOne(models.Profile, { foreignKey : "UserId"});
    }
  }
  User.init({
    email: {
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
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance, option){ // hooks untuk mendapatkan login detail
        const salt = bcrypt.genSaltSync(8); 
        const hash = bcrypt.hashSync(instance.password, salt);

        instance.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};