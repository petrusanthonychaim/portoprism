'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      profileName: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      rdn: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },
      npwp: {
        type: Sequelize.STRING
      },
      capital: {
        type: Sequelize.BIGINT
      },
      UserId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('profiles');
  }
};