'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING
      },
      stockName: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      shares: {
        type: Sequelize.INTEGER
      },
      ProfileId: {
       type: Sequelize.INTEGER,
      references: {
        model: 'Profiles',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
      },
      SectorId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Sectors',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
      },
      transaction_date: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Stocks');
  }
};